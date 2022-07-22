import { Box, Chip } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./SideCategory.css";

function SideCategory(props) {
  return (
    <>
      <Link to="/" className="side-category">
        <Chip
          label={
            <>
              <span className="side-category__name">{props.name}</span>
              <span className="side-category__counter">{props.counter}</span>
            </>
          }
          sx={{
            width: "100%",
            "& .MuiChip-label": {
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              textDecoration: "none",
            },
          }}
        ></Chip>
      </Link>
    </>
  );
}

export default SideCategory;
