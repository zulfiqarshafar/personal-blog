import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Header from "../../components/Header";
import "./Article.css";

function Article() {
  const params = new URL(document.location).searchParams;

  const [articleId, setArticleId] = useState(params.get("id"));
  const [article, setArticle] = useState({});
  const [previousArticle, setPreviousArticle] = useState(null);
  const [nextArticle, setNextArticle] = useState(null);

  const formatDate = (date) => {
    return dayjs(date).format("DD MMMM YYYY");
  };

  useEffect(() => {
    async function getArticles() {
      await fetch("http://localhost:8080/api/articles?id=" + articleId)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setArticle(data.currentArticle);
          setPreviousArticle(data.previousArticle);
          setNextArticle(data.nextArticle);
        })
        .catch((error) => console.log(error));
    }

    getArticles();
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
          <div className="main-article__content">
            <p>{article.body}</p>
          </div>
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
