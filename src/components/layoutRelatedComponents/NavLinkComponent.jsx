import { Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NavLinkComponent = ({ to, children }) => {
  const [mouseOver, setMouseOver] = useState(false);
  const checked = useSelector((bigPie) => bigPie.DarkReducer);
const hanlePageNavigate=()=>{
  window.scrollTo({top: 0, left: 0});
}
  return (
    <NavLink
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      to={to}
       onClick={hanlePageNavigate}
      style={{ textDecoration: "none" }}
    >
      {({ isActive }) => (
        <Typography
          color={
            !checked
              ? isActive
                ? "#f44336"
                : mouseOver
                ? "white"
                : "black"
              : isActive
              ? "#f44336"
              : mouseOver
              ? "black"
              : "white"
          }
          sx={{ p: 1, fontSize: 19, fontWeight: "bold", textAlign: "center" }}
        >
          {children}
        </Typography>
      )}
    </NavLink>
  );
};

export default NavLinkComponent;
