import { Cancel } from "@material-ui/icons";
import { useRef } from "react";
import UserApi from "../services/userApi";
import { useAuth } from "../context/ContextApi";

export default function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { setShowLogin } = useAuth();
  const { handleLogin } = UserApi();

  return (
    <div className="loginContainer">
      <form className="login1" onSubmit={(e) => handleLogin(e, { usernameRef, passwordRef })}>
        <h2 style={{ color: "#212429" }}>Welcome, User!</h2>
        <p>Please Log In</p>
        <input autoFocus type="text" placeholder="User Name" ref={usernameRef} />
        <input type="password" min="6" placeholder="Password" ref={passwordRef} />
        <input type="submit" value="Log In" />
        <div className="links1">
          <a href="#"></a>
          <p href="#">Don't have account? Then click on Register</p>
        </div>
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}
