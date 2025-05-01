import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Blog } from "./pages/Blog";
import GlobalStyle from "./styles/GlobalStyle";
import Home from "./pages/Home/index";
import NotFound from "./pages/NotFound/index";
import Layout from "./components/Layout";
import PostDetail from "./components/PostDetail";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Router>
        <GlobalStyle />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<PostDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
