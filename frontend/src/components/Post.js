import React from "react";
import { Link } from "react-router-dom";
import SanitizedComponent from "./SanitizedComponent";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./Post.css";

function Post(props) {
  return (
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
          <Link to={`/article?id=${props.articleId}`}>
            Continue reading <KeyboardArrowRightIcon />
          </Link>
        </p>
      </div>
    </Paper>
  );
}

export default Post;
