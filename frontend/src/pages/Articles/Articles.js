import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminArticle from "./components/Post/AdminArticle";
import ModalDelete from "../../components/Modal/ModalDelete";
import AddIcon from "@mui/icons-material/Add";
import { formatDateTime } from "../../utils/helper/Helper";
import "./Articles.css";

function Articles() {
  const accesstoken = localStorage.getItem("accesstoken");

  const [articles, setArticles] = useState([]);
  const [articleId, setArticleId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const generateShortContent = (content) => {
    content = content.replace(/<[^>]*>/g, " ");
    content = content.replace(/\s+/g, " ");
    content = content.trim();

    return content.length > 500 ? content.substring(0, 500) + "..." : content;
  };

  const handleDelete = async () => {
    console.log("delete");
    console.log(articleId);

    await fetch(`${process.env.REACT_APP_API_HOST}/api/articles/${articleId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + accesstoken,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(response);
      })
      .then((data) => {
        navigate("/admin/articles", { replace: true });
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    async function getArticles() {
      await fetch(`${process.env.REACT_APP_API_HOST}/api/articles`, {
        headers: {
          Authorization: "Bearer " + accesstoken,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setArticles(data);
        })
        .catch((error) => console.log(error));
    }

    getArticles();
  }, [accesstoken]);

  return (
    <div className="articles">
      <ModalDelete
        modalOpen={modalOpen}
        handleCloseModal={() => {
          setArticleId(null);
          setModalOpen(false);
        }}
        handleDelete={handleDelete}
      />

      <div className="articles__content">
        <div className="articles__content__header">
          <Link to="/admin/articles/create">
            <button className="articles__content__header__create">
              <span className="articles__content__header__create__icon">
                <AddIcon />
              </span>
              New Article
            </button>
          </Link>
          <div className="articles__content__header__search">
            Search Article
          </div>
        </div>
        <div className="articles__content__list">
          {articles.map((article) => (
            <AdminArticle
              key={article._id}
              articleId={article._id}
              createdAt={formatDateTime(article.createdAt)}
              updatedAt={formatDateTime(article.updatedAt)}
              isPublished={article.isPublished}
              publishedAt={
                article.publishedAt ? formatDateTime(article.publishedAt) : null
              }
              title={article.title}
              categories={article.categories}
              content={generateShortContent(article.content)}
              handleOpenModal={() => {
                setArticleId(article._id);
                setModalOpen(true);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Articles;
