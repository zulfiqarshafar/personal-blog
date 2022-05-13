import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./Home.css";
import Header from "../../components/Header";
import HomeArticle from "../../components/HomeArticle";
import SideAbout from "../../components/SideAbout";
import SideArticles from "../../components/SideArticles";
import TopCategories from "../../components/TopCategories";

function Home() {
  const [articles, setArticles] = useState([]);
  const [sideArticles, setSideArticles] = useState([]);
  const [topCategories, setTopCategories] = useState([]);

  const formatDate = (date) => {
    return dayjs(date).format("DD MMMM YYYY");
  };

  const getArticles = async () => {
    await fetch("http://localhost:8080/api/articles")
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);
      })
      .catch((error) => console.log(error));

    // await axios.get('/sync')
    //   .then(response => {
    //     console.log(response);
    //     setPosts(response.data);
    //   });
  };

  const getTopArticles = async () => {
    await fetch("http://localhost:8080/api/articles/top")
      .then((response) => response.json())
      .then((data) => {
        setSideArticles(data);
      })
      .catch((error) => console.log(error));
  };

  const getTopCategories = () => {
    setTopCategories([
      {
        categoryId: "1",
        name: "Pertanian",
        counter: "10",
      },
      {
        categoryId: "2",
        name: "Perkebunan",
        counter: "11",
      },
      {
        categoryId: "3",
        name: "Kehutanan",
        counter: "12",
      },
    ]);
  };

  useEffect(() => {
    // const pusher = new Pusher('756db4176d3e7881364a', {
    //   cluster: 'ap1'
    // });

    // const channel = pusher.subscribe('posts');
    // channel.bind('inserted', (data) => {
    //   console.log('data received', data);
    //   fetchPosts();
    // });
    getArticles();
    getTopArticles();
    getTopCategories();
  }, []);

  return (
    <>
      <Header />
      <div className="content">
        <div className="main-content">
          <div className="main-content__title">
            <h2>Latest Articles</h2>
          </div>
          <div className="main-content__articles">
            {articles.map((article) => (
              <HomeArticle
                key={article._id}
                articleId={article._id}
                createdAt={formatDate(article.createdAt)}
                title={article.title}
                body={article.body}
              />
            ))}
          </div>
        </div>
        <div className="side-content">
          <SideAbout />
          <SideArticles sideArticles={sideArticles} />
          <TopCategories topCategories={topCategories} />
        </div>
      </div>
    </>
  );
}

export default Home;
