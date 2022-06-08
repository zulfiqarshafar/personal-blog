import React, { useEffect, useRef, useState } from "react";
import {
  createSearchParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { formatDateTime } from "../../../utils/helper/Helper";
import ModalDelete from "../../../components/ModalDelete";
import { Editor } from "@tinymce/tinymce-react";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import "./Create.css";

function Create() {
  const accesstoken = localStorage.getItem("accesstoken");

  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");
  const [dirty, setDirty] = useState(false);
  const [categories, setCategories] = useState([]);
  const [article, setArticle] = useState(null);
  const [title, setTitle] = useState("");
  const [categoryVal, setCategoryVal] = useState([]);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const articleId = searchParams.get("id");

  const editorRef = useRef(null);

  const handleInputChange = () => {
    setDirty(true);
    if (alertOpen) {
      setAlertOpen(false);
    }
  };

  const handleCategoryValue = (categoryArray) => {
    const formattedCategoryArray = categoryArray.map((category) =>
      category.toLowerCase().trim()
    );

    // Remove duplicates
    const uniqueCategoryArray = [...new Set(formattedCategoryArray)];

    const capitalCategoryArray = uniqueCategoryArray.map((uniqueCategory) => {
      return uniqueCategory
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
        .join(" ");
    });

    return capitalCategoryArray;
  };

  const handleDelete = async () => {
    await fetch("http://localhost:8080/api/articles/" + articleId, {
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async (isPublished) => {
    const accesstoken = localStorage.getItem("accesstoken");
    const postTitle = title;
    let editorContent = "";

    if (editorRef.current) {
      const cleanedCategoryVal = handleCategoryValue(categoryVal);
      editorContent = editorRef.current.getContent();

      console.log(postTitle);
      console.log(editorContent);

      if (postTitle === "" || editorContent === "") {
        setAlertMessage("Title or content cannot be empty!");
        setAlertType("error");
        setAlertOpen(true);
      } else {
        setDirty(false);
        editorRef.current.setDirty(false);

        // Set options
        let reqMethod = "POST";
        let reqBody = {
          title: postTitle,
          category: cleanedCategoryVal,
          content: editorContent,
          isPublished,
        };
        if (articleId) {
          reqMethod = "PUT";
          reqBody.articleId = articleId;
        }

        await fetch("http://localhost:8080/api/articles", {
          method: reqMethod,
          headers: {
            Authorization: "Bearer " + accesstoken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        })
          .then((response) => {
            if (response.ok) return response.json();
            return Promise.reject(response);
          })
          .then((data) => {
            console.log(data);
            setSearchParams({ id: data.id });
            window.location.reload();
            // navigate({
            //   pathname: "/admin/articles/create",
            //   search: createSearchParams({
            //     id: "123",
            //   }).toString(),
            // });
          })
          .catch((error) => {
            console.log(error);
            setDirty(true);
            editorRef.current.setDirty(true);
          });
      }
    }
  };

  const handleImageUpload = (blobInfo, progress) =>
    new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("image", blobInfo.blob(), blobInfo.filename());

      fetch("http://localhost:8080/api/articles/images", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accesstoken,
        },
        body: formData,
      })
        .then((response) => {
          if (response.ok) return response.json();
          return reject(response);
        })
        .then((data) => {
          resolve(data.path);
        })
        .catch((error) => {
          console.log(error);
        });
    });

  const getCategories = async () => {
    await fetch("http://localhost:8080/api/categories")
      .then((response) => response.json())
      .then((data) => {
        const categoriesOptions = data.map((category) => category.name);
        setCategories(categoriesOptions);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    async function getArticle() {
      console.log(articleId);
      await fetch("http://localhost:8080/api/articles/" + articleId, {
        headers: {
          Authorization: "Bearer " + accesstoken,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setArticle(data);
          setTitle(data.title);
          const defaultCategoryVal = data.categories.map(
            (category) => category.name
          );
          setCategoryVal(defaultCategoryVal);
          // editorRef.current.setContent(article.content);
        })
        .catch((error) => console.log(error));
    }

    if (articleId) {
      getArticle();
    }
  }, [articleId]);

  return (
    <div className="create-article">
      <ModalDelete
        modalOpen={modalOpen}
        handleCloseModal={() => setModalOpen(false)}
        handleDelete={handleDelete}
      />

      <div className="create-article__back">
        <Link to="/admin/articles">
          <button className="create-article__back__button">Back</button>
        </Link>
      </div>

      {loading && (
        <div className="create-article__overlay">
          <CircularProgress color="inherit" />
          <p className="create-article__overlay__label">Loading</p>
        </div>
      )}

      <div
        className="create-article__content"
        style={{ visibility: loading ? "hidden" : "visible" }}
      >
        <Collapse in={alertOpen}>
          <Alert
            variant="filled"
            severity={alertType}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlertOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {alertMessage}
          </Alert>
        </Collapse>

        <div className="create-article__content__header">
          <div className="create-article__content__header__date">
            {article && (
              <>
                <div className="create-article__content__header__date__created">
                  Created at: {formatDateTime(article.createdAt)}
                </div>
                <div className="create-article__content__header__date__updated">
                  Last update: {formatDateTime(article.updatedAt)}
                </div>
              </>
            )}
          </div>
          <div className="create-article__content__header__action">
            {article && (
              <>
                <div className="create-article__content__header__action__status">
                  Status: {article.isPublished ? "Published" : "Draft"}
                  {article.publishedAt
                    ? ` (${formatDateTime(article.publishedAt)})`
                    : ""}
                </div>
                {articleId && (
                  <button
                    className="create-article__content__header__action__delete"
                    onClick={() => setModalOpen(true)}
                  >
                    Delete
                  </button>
                )}
              </>
            )}
            <button
              className="create-article__content__header__action__save-draft"
              onClick={() => handleSubmit(false)}
              disabled={!dirty}
            >
              Save Draft
            </button>
            <button
              className="create-article__content__header__action__publish"
              onClick={() => handleSubmit(true)}
              disabled={!dirty}
            >
              Publish
            </button>
          </div>
        </div>

        <Alert
          icon={false}
          variant="filled"
          sx={{
            mb: "1em",
            height: 15,
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#fee440",
            color: "black",
            visibility: dirty ? "visible" : "hidden",
          }}
        >
          You have unsaved content!
        </Alert>

        <div className="create-article__content__title">
          <TextField
            onChange={(e) => {
              setTitle(e.target.value);
              handleInputChange();
            }}
            value={title}
            required
            fullWidth
            id="create-article__content__title__input"
            label="Title"
            sx={{
              "& label.Mui-focused": {
                color: "black",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#9f9f9f",
                  borderRadius: "10px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
            }}
          />
        </div>

        <div className="create-article__content__category">
          <Autocomplete
            id="tags-standard"
            value={categoryVal}
            onChange={(event, value) => {
              setCategoryVal(value);
              setDirty(true);
            }}
            multiple
            freeSolo
            options={categories}
            filterSelectedOptions
            filterOptions={createFilterOptions({
              trim: true,
            })}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                  sx={{
                    bgcolor: "#49e14f",
                  }}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                sx={{
                  "& label.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#9f9f9f",
                      borderRadius: "10px",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
              />
            )}
          />
        </div>

        <form className="create-article__content__editor">
          <Editor
            apiKey="your-api-key"
            onInit={(evt, editor) => {
              editorRef.current = editor;
              editor.getContainer().classList.add("editor-container");
              setLoading(false);
            }}
            onDirty={() => {
              handleInputChange();
            }}
            initialValue={article ? article.content : ""}
            init={{
              height: 500,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "save",
              ],
              toolbar:
                "save | undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | image | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }",
              file_picker_types: "image",
              file_picker_callback: (cb, value, meta) => {
                const input = document.createElement("input");
                input.setAttribute("type", "file");

                if (meta.filetype === "file") {
                  input.setAttribute("accept", "file/*");
                }
                if (meta.filetype === "image") {
                  input.setAttribute("accept", "image/*");
                }
                if (meta.filetype === "media") {
                  input.setAttribute("accept", "video/*");
                }

                input.addEventListener("change", (e) => {
                  const file = e.target.files[0];

                  const reader = new FileReader();
                  reader.addEventListener("load", () => {
                    /*
                    Note: Now we need to register the blob in TinyMCEs image blob
                    registry. In the next release this part hopefully won't be
                    necessary, as we are looking to handle it internally.
                  */
                    const id = "blobid" + new Date().getTime();
                    const blobCache = editorRef.current.editorUpload.blobCache;
                    const base64 = reader.result.split(",")[1];
                    const blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);

                    /* call the callback and populate the Title field with the file name */
                    cb(blobInfo.blobUri(), { title: file.name });
                  });
                  reader.readAsDataURL(file);
                });

                input.click();
              },
              // images_upload_url: 'http:/localhost:8080/api/articles/images',
              images_upload_handler: handleImageUpload,
            }}
          />
        </form>
      </div>
    </div>
  );
}

export default Create;
