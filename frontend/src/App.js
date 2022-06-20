import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Article from "./pages/Article/Article";
import Login from "./pages/Login/Login";
import Articles from "./pages/Articles/Articles";
import NotFound from "./pages/NotFound/NotFound";
import Create from "./pages/Articles/Create/Create";
import About from "./pages/About/About";
import Categories from "./pages/Categories/Categories";
import LoginLayout from "./components/LoginLayout";
import PrivateLayout from "./components/PrivateLayout";
import { AuthProvider } from "./utils/context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route element={<PrivateLayout />}>
              <Route path="/admin/articles/create" element={<Create />} />
              {/* <Route path="/admin/articles/edit" element={<Home />} /> */}
              <Route exact path="/admin/articles" element={<Articles />} />
              <Route exact path="/admin/categories" element={<Categories />} />
            </Route>

            <Route element={<LoginLayout />}>
              <Route path="/admin/login" element={<Login />} />
            </Route>

            <Route path="/article" element={<Article />} />
            <Route path="/about" element={<About />} />
            <Route exact path="/" element={<Home />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
