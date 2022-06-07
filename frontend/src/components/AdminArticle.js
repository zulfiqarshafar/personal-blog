import React from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip } from "@mui/material";
import SanitizedComponent from "./SanitizedComponent";
import "./AdminArticle.css";

function AdminArticle(props) {
  return (
    <div className="admin-article">
      <div className="admin-article__information">
        <div className="admin-article__information__date">
          <div className="admin-article__information__date__created">
            Created at: {props.createdAt}
          </div>
          <div className="admin-article__information__date__updated">
            Last update: {props.updatedAt}
          </div>
        </div>
        <div className="admin-article__information__action">
          <div className="admin-article__information__status">
            Status: {props.isPublished ? "Published" : "Draft"}
            {props.publishedAt != null ? ` (${props.publishedAt})` : ""}
          </div>
          <Link to={`/admin/articles/create?id=${props.articleId}`}>
            <button className="admin-article__information__action__edit">
              <span className="admin-article__information__action__edit__icon">
                <EditIcon />
              </span>
              Edit
            </button>
          </Link>
          <button
            className="admin-article__information__action__delete"
            onClick={props.handleOpenModal}
          >
            <span className="admin-article__information__action__delete__icon">
              <DeleteIcon />
            </span>
            Delete
          </button>
        </div>
      </div>
      <div className="admin-article__title">
        <h2>{props.title}</h2>
      </div>
      {props.categories.length > 0 && (
        <div className="admin-article__categories">
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
      <SanitizedComponent
        className="admin-article__short-description"
        text={props.content}
      />
    </div>
  );
}

export default AdminArticle;
