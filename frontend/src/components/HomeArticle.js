import React from "react";
import { Link } from "react-router-dom";
import { Chip } from "@mui/material";
import SanitizedComponent from "./SanitizedComponent";
import "./HomeArticle.css";

function HomeArticle(props) {
  return (
    <div className="article">
      <p className="article__date">{props.createdAt}</p>
      <h3 className="article__title">
        <Link to={`/article?id=${props.articleId}`}>{props.title}</Link>
      </h3>
      {props.categories.length > 0 && (
        <div className="article__categories">
          {props.categories.map((category, index) => (
            <Chip
              size="small"
              key={index}
              label={category.name}
              sx={{ marginRight: 1, marginBottom: 1 }}
            />
          ))}
        </div>
      )}
      <SanitizedComponent className="article__content" text={props.content} />
      <p className="article__continue">
        <Link to={`/article?id=${props.articleId}`}>Continue reading</Link>
      </p>
    </div>
  );
}

export default HomeArticle;
