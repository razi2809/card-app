import { Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NavLinkComponent = ({ to, children }) => {
  const [mouseOver, setMouseOver] = useState(false);
  const checked = useSelector((bigPie) => bigPie.DarkReducer);

  return (
    <NavLink
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      to={to}
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
{
  /* <Link to={to}>
      <Typography color="text.primary" sx={{ p: 2 }}>
        {children}
      </Typography>
    </Link> */
}
export default NavLinkComponent;
