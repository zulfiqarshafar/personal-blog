import React from "react";
import { Link } from "react-router-dom";
import "./SideArticle.css";

function SideArticle(props) {
  return (
    <div className="side-article">
      <p className="side-article__date">{props.createdAt}</p>
      <p className="side-article__title">
        <Link to={`/article?id=${props.articleId}`}>{props.title}</Link>
      </p>
    </div>
  );
}

export default SideArticle;
