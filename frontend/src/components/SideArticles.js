import React from "react";
import dayjs from "dayjs";
import SideArticle from "./SideArticle";
import "./SideArticles.css";

function SideArticles(props) {
  const sideArticles = props.sideArticles;

  const formatDate = (date) => {
    return dayjs(date).format("DD MMMM YYYY");
  };

  return (
    <div className="side-articles">
      <h2>Top Articles</h2>
      {sideArticles.map((sideArticle) => (
        <SideArticle
          key={sideArticle._id}
          articleId={sideArticle._id}
          createdAt={formatDate(sideArticle.createdAt)}
          title={sideArticle.title}
        />
      ))}
    </div>
  );
}

export default SideArticles;
