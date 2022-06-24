import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/helper/Helper";
import Header from "../../components/Header";
import SanitizedComponent from "../../components/SanitizedComponent";
import { Chip } from "@mui/material";
import "./Article.css";

function Article() {
  const params = new URL(document.location).searchParams;

  const [articleId, setArticleId] = useState(params.get("id"));
  const [article, setArticle] = useState({});
  const [previousArticle, setPreviousArticle] = useState(null);
  const [nextArticle, setNextArticle] = useState(null);

  useEffect(() => {
    async function getCurrentArticle() {
      await fetch("http://localhost:8080/api/articles/published/" + articleId)
        .then((response) => response.json())
        .then((data) => {
          setArticle(data);
        })
        .catch((error) => console.log(error));
    }

    async function getSibilngArticle() {
      await fetch(
        "http://localhost:8080/api/articles/published/sibling/" + articleId
      )
        .then((response) => response.json())
        .then((data) => {
          setPreviousArticle(data.previousArticle);
          setNextArticle(data.nextArticle);
        })
        .catch((error) => console.log(error));
    }

    getCurrentArticle();
    getSibilngArticle();
  }, [articleId]);

  return (
    <>
      <Header />
      <div className="article-content">
        <div className="main-article">
          <div className="main-article__date">
            {formatDate(article.createdAt)}
          </div>
          <div className="main-article__title">
            <h1>{article.title}</h1>
          </div>
          <div className="main-article__categories">
            {article.categories &&
              article.categories.map((category, index) => (
                <Chip
                  size="small"
                  key={index}
                  label={category.name}
                  sx={{ marginLeft: 0.5, marginRight: 0.5, marginBottom: 1 }}
                />
              ))}
          </div>
          <SanitizedComponent
            className="main-article__content"
            text={article.content}
          />
        </div>
        <div className="sibling-article">
          <div className="sibling-article__previous-article">
            {previousArticle != null && (
              <div>
                <div className="sibling-article__previous-article__nav">
                  <b>Previous Article</b>
                </div>
                <div className="sibling-article__previous-article__title">
                  <Link
                    to={`/article?id=${previousArticle._id}`}
                    onClick={() => setArticleId(previousArticle._id)}
                  >
                    <p>{previousArticle.title}</p>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="sibling-article__next-article">
            {nextArticle != null && (
              <div>
                <div className="sibling-article__next-article__nav">
                  <b>Next Article</b>
                </div>
                <div className="sibling-article__next-article__title">
                  <Link
                    to={`/article?id=${nextArticle._id}`}
                    onClick={() => setArticleId(nextArticle._id)}
                  >
                    <p>{nextArticle.title}</p>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Article;
