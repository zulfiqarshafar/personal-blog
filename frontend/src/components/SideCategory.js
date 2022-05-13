import React from "react";
import { Link } from "react-router-dom";
import "./SideCategory.css";

function SideCategory(props) {
  return (
    <>
      <Link to="/" className="side-category">
        <span className="side-category__name">{props.name}</span>
        <span className="side-category__counter">{props.counter}</span>
      </Link>
    </>
  );
}

export default SideCategory;
