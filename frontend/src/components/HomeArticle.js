import React from "react";
import { Link } from "react-router-dom";
import "./HomeArticle.css";

function HomeArticle(props) {
  const shortDescription =
    props.body.length > 500 ? props.body.substring(0, 500) + "..." : props.body;

  return (
    <div className="article">
      <p className="article__date">{props.createdAt}</p>
      <h3 className="article__title">
        <Link to={`/article?id=${props.articleId}`}>{props.title}</Link>
      </h3>
      <p className="article__content">{shortDescription}</p>
      <p className="article__continue">
        <Link to={`/article?id=${props.articleId}`}>Continue reading</Link>
      </p>
    </div>
  );
}

export default HomeArticle;
