import React from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import "./SideArticle.css";

function SideArticle(props) {
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          marginBottom: "1em",
          borderRadius: "10px",
          borderColor: "#E7EBF0",
          "&:hover": {
            borderColor: "#CDD2D7",
            boxShadow: "0px 4px 20px rgba(170, 180,190,0.3)",
          },
        }}
      >
        <div className="side-article">
          <p className="side-article__date">{props.createdAt}</p>
          <p className="side-article__title">
            <Link to={`/article?id=${props.articleId}`}>{props.title}</Link>
          </p>
        </div>
      </Paper>
    </>
  );
}

export default SideArticle;
