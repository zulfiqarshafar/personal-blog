import React from "react";
import { Link } from "react-router-dom";
import ArticleEditor from "../../../components/ArticleEditor";
import "./Create.css";

function Create() {
  return (
    <div className="create-article">
      <div className="create-article__content">
        <div className="create-article__content__back">
          <Link to="/admin/articles">
            <button className="create-article__content__back__button">
              Back
            </button>
          </Link>
        </div>
        <div className="create-article__content__header">
          <div className="create-article__content__header__date">
            <div className="create-article__content__header__date__created">
              Created at: {"21:06:43 12 Desember 2021"}
            </div>
            <div className="create-article__content__header__date__updated">
              Last update: {"21:06:22 12 April 2022"}
            </div>
          </div>
          <div className="create-article__content__header__action">
            <div className="create-article__content__header__action__status">
              Status: Published
            </div>
            <button className="create-article__content__header__action__delete">
              Delete
            </button>
            <button className="create-article__content__header__action__save-draft">
              Save Draft
            </button>
            <button className="create-article__content__header__action__publish">
              Publish
            </button>
          </div>
        </div>
        <ArticleEditor />
      </div>
    </div>
  );
}

export default Create;
