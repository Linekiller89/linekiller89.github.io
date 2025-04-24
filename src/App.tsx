import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Home from "./pages/Home/index";
import Blog from "./pages/Blog/index";
import BlogPost from "./pages/BlogPost/index";
import NotFound from "./pages/NotFound/index";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
