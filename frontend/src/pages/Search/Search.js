import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { formatDate } from "../../utils/helper/Helper";
import Header from "../../components/Header";
import Post from "../../components/Post";
import "./Search.css";

function Search() {
  const [isLoading, setIsLoading] = useState(true);
  // Bisa dimasukkan reducer
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  const generateShortContent = (content) => {
    const container = document.createElement("div");
    container.innerHTML = content;

    const imgList = container.querySelectorAll("img");
    if (imgList.length > 0) {
      imgList.forEach((img) => {
        img.parentNode.removeChild(img);
      });
    }

    const newContent = container.innerHTML;

    return newContent.length > 500
      ? newContent.substring(0, 500) + "..."
      : newContent;
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    setSearchTerm(searchParams.get("q"));

    const getPosts = async () => {
      await fetch(
        `${
          process.env.REACT_APP_API_HOST
        }/api/articles/published?search=${searchParams.get("q")}`
      )
        .then((response) => {
          setIsLoading(false);
          return response.json();
        })
        .then((data) => {
          setPosts(data);
        })
        .catch((error) => console.log(error));
    };

    getPosts();
  }, [search]);

  return (
    <>
      <Header />
      {isLoading && <div>Loading</div>}

      <div className="content">
        <div className="main-content">
          <div className="main-content__title">
            <h2>Search results for '{searchTerm}'</h2>
          </div>
          <div className="main-content__posts">
            {posts.length > 0 ? (
              <>
                {posts.map((post) => (
                  <Post
                    key={post._id}
                    articleId={post._id}
                    createdAt={formatDate(post.createdAt)}
                    title={post.title}
                    categories={post.categories}
                    content={generateShortContent(post.content)}
                  />
                ))}
              </>
            ) : (
              <div>No result found</div>
            )}
          </div>
        </div>
        <div className="side-content"></div>
      </div>
    </>
  );
}

export default Search;
