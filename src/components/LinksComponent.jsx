import React, { memo, useEffect, useState } from "react";
import NavLinkComponent from "./NavLinkComponent";
import links from "../layout/header/Mylinks";
import axios from "axios";
import ErrorMessage from "../tostifyHandeker/ErrorMessage";
import { useSelector } from "react-redux";

const { alwaysLinks, loggedinLinks, loggedoutLinks, adminType, businessType } =
  links;
const LinksComponent = ({ loggedin, userInfo }) => {
  const depends = useSelector((bigPie) => bigPie.likeReducer);
  const [cards, SetCards] = useState("");
  useEffect(() => {
    if (userInfo) {
      axios
        .get("/cards")
        .then(function (response) {
          const LikedCards = response.data.filter((card) =>
            card.likes.includes(userInfo._id)
          );
          SetCards(LikedCards);
        })
        .catch(function (error) {
          ErrorMessage(error.response);
        });
    }
  }, [userInfo, depends]);
  return (
    <>
      {loggedin &&
        loggedinLinks.map((myItem) => (
          <NavLinkComponent to={myItem.to} key={myItem.to}>
            {myItem.children}
          </NavLinkComponent>
        ))}
      {!loggedin &&
        loggedoutLinks.map((myItem) => (
          <NavLinkComponent to={myItem.to} key={myItem.to}>
            {myItem.children}
          </NavLinkComponent>
        ))}
      {alwaysLinks.map((myItem) => (
        <NavLinkComponent to={myItem.to} key={myItem.to}>
          {myItem.children}
        </NavLinkComponent>
      ))}
      {cards.length > 0 && (
        <NavLinkComponent to={"/cards/favorite"} key={"/cards/favorite"}>
          favorite
        </NavLinkComponent>
      )}
      {userInfo &&
        userInfo.isBusiness &&
        businessType.map((myItem) => (
          <NavLinkComponent to={myItem.to} key={myItem.to}>
            {myItem.children}
          </NavLinkComponent>
        ))}
      {userInfo &&
        userInfo.isAdmin &&
        adminType.map((myItem) => (
          <NavLinkComponent to={myItem.to} key={myItem.to}>
            {myItem.children}
          </NavLinkComponent>
        ))}
    </>
  );
};

export default memo(LinksComponent);
