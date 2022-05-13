import React from "react";
import "./AdminArticle.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function AdminArticle(props) {
  const shortDescription =
    props.body.length > 500 ? props.body.substring(0, 500) + "..." : props.body;

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
            Status: {props.status}
            {props.publishedAt != null ? ` (${props.publishedAt})` : ""}
          </div>
          <button className="admin-article__information__action__edit">
            <span className="admin-article__information__action__edit__icon">
              <EditIcon />
            </span>
            Edit
          </button>
          <button className="admin-article__information__action__delete">
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
      <div className="admin-article__short-description">
        <p>{shortDescription}</p>
      </div>
    </div>
  );
}

export default AdminArticle;
