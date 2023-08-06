import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import style from "./LogIn.module.scss";
import { UserLoginProps, createUserLogin } from "../../services/API";
import { useUserContext } from "../../contextapi/UserContextCookies";

const LogIn = () => {
  let navigate = useNavigate();

  //Context api cookies and encrypted

  const {  setUser } = useUserContext();

  /****************************************/
  /*********  Log In **********************/
  /****************************************/

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmitUserLogIn = async () => {
    try {
      const payload: UserLoginProps = {
        email: email,
        password: password,
      };

      const res = await createUserLogin(payload);

      if (res) {
        toast.success("You have Loged In Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        //Token for api protected route that is required for server api response
        // Protected route for frontend route
        window.localStorage.setItem("token", res.data.token);
        
        // Context api - to store user details after logedin - cookies and encrypted
        setUser(res.data.user);

        setEmail("");
        setPassword("");

        // Send user to the dashboard based on the user role
        if (res.data.user?.role === "Admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className={style.signInContainer}>
      <div className={style.inputFormArea}>
        <div className="form-group">
          <input
            type="text"
            name="Name"
            className={style.formControlEmail}
            placeholder="Your E-mail *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="email"
            className={style.formControlPassword}
            placeholder="Your Password*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-success" onClick={onSubmitUserLogIn}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default LogIn;
