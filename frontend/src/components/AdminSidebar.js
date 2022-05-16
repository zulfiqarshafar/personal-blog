import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArticleIcon from "@mui/icons-material/Article";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LogoutIcon from "@mui/icons-material/Logout";
import useAuth from "../utils/context/AuthProvider";

function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleLogout = async () => {
    await fetch("http://localhost:8080/api/users/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(response);
      })
      .then((data) => {
        // console.log(data);
        localStorage.removeItem("accesstoken");
        // console.log("Logged out");
        navigate("/admin/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    switch (location.pathname) {
      case "/admin/articles":
      case "/admin/articles/create":
        setSelectedIndex(1);
        break;
      case "/admin/categories":
        setSelectedIndex(2);
        break;
      default:
      // do nothing
    }
  }, [location.pathname]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="admin-sidebar">
      <List component="nav">
        <Link to="/">
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary="BLOG" />
          </ListItemButton>
        </Link>
        <Divider />
        <Link to="/admin/articles">
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Articles" />
          </ListItemButton>
        </Link>
        <Link to="/admin/categories">
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItemButton>
        </Link>
        <Divider />
        <div onClick={handleLogout}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </div>
      </List>
      {/* <div className="sidebar-header">
        <div className="sidebar-header__collapse-icon">--</div>
        <Link to="/">
          <div className="sidebar-header__logo">BLOG</div>
        </Link>
      </div>
      <div className="sidebar-menu">
        <Link to="/admin/articles">
          <div className="sidebar-menu__articles">
            <div className="sidebar-menu__articles__icon">AR</div>
            Articles
          </div>
        </Link>
      </div>
      <div className="sidebar-footer">
        <Link to="/admin/login">
          <div className="sidebar-footer__logout">
            <div className="sidebar-footer__logout__icon">LU</div>
            Logout
          </div>
        </Link>
      </div> */}
    </div>
  );
}

export default AdminSidebar;
