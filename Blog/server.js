const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const CLIENT_ID = process.env.VITE_GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.VITE_GITHUB_CLIENT_SECRET;

app.post("/api/auth/callback", async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Authorization code is required" });
  }

  try {
    const tokenResponse = await axios({
      method: "post",
      url: GITHUB_TOKEN_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
      },
    });

    if (tokenResponse.data.error) {
      console.error("GitHub OAuth error:", tokenResponse.data);
      return res.status(400).json({ error: tokenResponse.data.error_description });
    }

    // GitHub API로 사용자 정보 가져오기
    const userResponse = await axios({
      method: "get",
      url: "https://api.github.com/user",
      headers: {
        Authorization: `token ${tokenResponse.data.access_token}`,
      },
    });

    res.json({
      access_token: tokenResponse.data.access_token,
      token_type: tokenResponse.data.token_type,
      user: userResponse.data,
    });
  } catch (error) {
    console.error("OAuth error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to authenticate with GitHub",
      details: error.response?.data || error.message,
    });
  }
});

// 서버 상태 확인용 엔드포인트
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auth server running on port ${PORT}`);
});
