import { useState } from "react";
import { toast } from "react-toastify";

import style from "./Registration.module.scss";
import {
  UserRegistrationProps,
  createUserRegistration,
} from "../../services/API";

const Registration = () => {
  /****************************************/
  /*********User Registration *************/
  /****************************************/
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const onSubmitHanldeRegistration = async () => {
    try {
      
      const payload: UserRegistrationProps = {
        name: userName,
        email: userEmail,
        password: userPassword,
      };

      const res = await createUserRegistration(payload);

      if (res) {
        toast.success("You have Registered Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
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
            className={style.formControlName}
            placeholder="Your Name*"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="Name"
            className={style.formControlEmail}
            placeholder="Your E-mail *"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="email"
            className={style.formControlPassword}
            placeholder="Your Password*"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>
        <button
          className="btn btn-success"
          onClick={onSubmitHanldeRegistration}
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Registration;
