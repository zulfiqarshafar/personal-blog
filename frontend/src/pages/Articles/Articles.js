import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminArticle from "../../components/AdminArticle";
import AdminSidebar from "../../components/AdminSidebar";
import "./Articles.css";
import AddIcon from "@mui/icons-material/Add";

function Articles() {
  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    await fetch("http://localhost:8080/api/articles")
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="articles">
      <AdminSidebar />
      <div className="articles__content">
        <div className="articles__content__header">
          <Link to="/admin/articles/create">
            <button className="articles__content__header__create">
              <span className="articles__content__header__create__icon">
                <AddIcon />
              </span>
              New Article
            </button>
          </Link>
          <div className="articles__content__header__search">
            Search Article
          </div>
        </div>
        <div className="articles__content__list">
          {articles.map((article) => (
            <AdminArticle
              key={article._id}
              articleId={article._id}
              createdAt={article.createdAt}
              updatedAt={article.updatedAt}
              publishedAt={article.publishedAt}
              status={article.status}
              title={article.title}
              body={article.body}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Articles;
