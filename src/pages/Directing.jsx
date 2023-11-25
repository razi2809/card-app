import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { useSelector } from "react-redux";
const Directing = () => {
  const loggedin = useSelector((bigPie) => bigPie.authReducer.loggedIn);
  const navigate = useNavigate();
  //direct the user on open to diffrent route depends on whether he loggin alredy
  useEffect(() => {
    if (loggedin) {
      window.scrollTo({ top: 0, left: 0 });
      navigate(ROUTES.HOME);
    } else {
      window.scrollTo({ top: 0, left: 0 });
      navigate(ROUTES.CARDS);
    }
  }, []);
};
export default Directing;
