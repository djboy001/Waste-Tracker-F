import { Cancel } from "@material-ui/icons";
import { useRef } from "react";
import UserApi from "../services/userApi";
import { useAuth } from "../context/ContextApi";

export default function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { handleRegister } = UserApi();
  const { setShowRegister } = useAuth();

  return (
    <div className="loginContainer">
        <form className="login1" onSubmit={(e)=>handleRegister(e,{ usernameRef, emailRef, passwordRef })}>
          <h2 style={{color:"#212429"}}>Welcome, User!</h2>
          <p>Please Register</p>
          <input autoFocus type="text" placeholder="User Name" ref={usernameRef} />
          <input type="email" placeholder="Email" ref={emailRef} />
          <input type="password" min="6" placeholder="Password" ref={passwordRef} />
          <input type="submit" value="Register" />
          <div className="links1">
            <a href="#"></a>
            <p href="#">Already registered? Then Log In please</p>
          </div>
        </form>
        <Cancel className="loginCancel" onClick={() => setShowRegister(false)} />
    </div>
  );
}
