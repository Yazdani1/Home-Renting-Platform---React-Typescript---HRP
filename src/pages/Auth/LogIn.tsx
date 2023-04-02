import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

import style from "./LogIn.module.scss";
import { UserLoginProps, createUserLogin } from "../../services/API";
import { UserContext } from "../../contextapi/UserContext";

const LogIn = () => {
  let navigate = useNavigate();
  const [state, setState] = useContext(UserContext);

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

        // save user info in local storage
        localStorage.setItem("tokenLogin", JSON.stringify(res.data));
        window.localStorage.setItem("token", res.data.token);

        // update user information to context api
        setState({
          user: res.data.user,
          token: res.data.token,
        });

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
