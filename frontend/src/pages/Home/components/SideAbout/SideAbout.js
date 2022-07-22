import React from "react";
import "./SideAbout.css";
import imageAbout from "../../../../assets/lionking.jpg";

function SideAbout() {
  return (
    <div className="side_about">
      <h2>About Me</h2>
      <img className="side_about__image" src={imageAbout} alt="" />
      <p className="side_about__description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit non
        accusamus beatae eveniet modi dignissimos perferendis laborum id labore.
        Quos minima laudantium iusto. Accusantium odio rerum ipsum quasi a
        tempore.
      </p>
    </div>
  );
}

export default SideAbout;
