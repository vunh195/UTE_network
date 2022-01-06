import React, { Component, useEffect, useState } from "react";
import { list } from "./apiUser";
import { Link } from "react-router-dom";

import "../css/Ranking.css";
const Card = (rankitem) => {
  return (
    rankitem && (
      // <div className="CardContainer">
      <Link
        to={`/user/${rankitem.id}`}
        className="CardContainer"
        style={{ textDecoration: "none" }}
      >
        {/* <p>{rankitem && rankitem.id}</p> */}
        <div className="text">
          <p>{rankitem && rankitem.name} </p>
          <p style={{fontSize:"12px"}}>{rankitem && rankitem.likes} likes</p>
        </div>
      </Link>
      // </div>
    )
  );
};
const Ranking = (props) => {
  var lst = props.ranks.slice(0, 3);
  return (
    <div className="RankWrapper">
      <div className="rankContainer">
        <div className="st">
          <i class=" fas fa-trophy cupST  " id="iconsrank"></i>
          {Card(lst[0])}
        </div>
        <div className="nd">
          <i class=" fas fa-medal medalND " id="iconsrank"></i>
          {Card(lst[1])}
        </div>
        <div className="th">
          <i class="  fas fa-medal medalTH " id="iconsrank"></i>
          {Card(lst[2])}
        </div>
        {/* <a> {rankItem.likes}</a>{" "} */}
      </div>
    </div>
  );
};
export default Ranking;
