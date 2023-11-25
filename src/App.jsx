import LayoutComponent from "./layout/LayoutComponent";
import { ToastContainer, toast } from "react-toastify";
import Router from "./routes/Router";
import { useEffect } from "react";
import useAutoLogin from "./hooks/useAutoLogin";
import { useState } from "react";
import { getToken } from "./service/tokenservice";
import ErrorMessage from "./tostifyHandeker/ErrorMessage";
import SuccessMessage from "./tostifyHandeker/SuccessMessage";
import LoadingComponent from "./components/layoutRelatedComponents/LoadingComponent";

const App = () => {
  const login = useAutoLogin();
  const [userData, setUserData] = useState(null);
  const tokenoOBj = getToken();
  const [done, setDone] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const userdata = await login();
        if (userdata != null) {
          if (!userdata.authorized) {
            ErrorMessage(userdata.err);
          } else {
            setUserData(userdata);
          }
        }
        //when user data is null means there are no token find in login function so dont show the user nothing
        //when user data is unauthorized toast the error(server error)
        //when user data is neither that means that login was success so dont show the user nothing
      } catch (err) {
        ErrorMessage(err);
        // code to run when the useEffect failed
        //send a tost with the error message
      } finally {
        setDone(true);
        //set done to true which means that he done checking regardless of the result
      }
    })();
  }, []);

  if (done && userData) {
    if (tokenoOBj.local) {
      // the token was saved in locl he wanted to be remeber so be nice
      //and toast a welcomeing message
      SuccessMessage(`welcome back ${userData.name}`);
    }
  }

  return (
    <div className="App">
      <LayoutComponent>
        <ToastContainer />
        {done ? <Router /> : <LoadingComponent />}
      </LayoutComponent>
    </div>
  );
};

export default App;
