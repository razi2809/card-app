import React from "react";
import NavLinkComponent from "../layout/header/NavLinkComponent";
import links from "../layout/header/Mylinks";

const { alwaysLinks, loggedinLinks, loggedoutLinks, adminType, businessType } =
  links;
const LinksComponent = ({ loggedin, userInfo }) => {
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

export default LinksComponent;
