import React from "react";
import SideCategory from "./components/SideCategoriesItem/SideCategory";

function TopCategories(props) {
  const topCategories = props.topCategories;

  return (
    <div className="top-categories">
      <h2>Top Categories</h2>
      {topCategories.map((topCategory) => (
        <SideCategory
          key={topCategory.categoryId}
          name={topCategory.name}
          counter={topCategory.counter}
        />
      ))}
    </div>
  );
}

export default TopCategories;
