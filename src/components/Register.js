import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";

export default function Register({ setShowRegister }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const url = process.env.REACT_APP_url;

    try {
      await axios.post(
        url+"api/users/register",
        newUser
      );
      setError(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
      setSuccess(false);
    }
  };
  return (
    <div className="loginContainer">
        <form className="login1" onSubmit={handleSubmit}>
          <h2 style={{color:"#212429"}}>Welcome, User!</h2>
          <p>Please Register</p>
          <input autoFocus type="text" placeholder="User Name" ref={usernameRef} />
          <input type="email" placeholder="Email" ref={emailRef} />
          <input type="password" min="6" placeholder="Password" ref={passwordRef} />
          <input type="submit" value="Register" />
          {success && <span className="success">Successfull. You can login now!</span>}
          {error && <span className="failure">Something went wrong!</span>}
          <div className="links1">
            <a href="#"></a>
            <p href="#">Already registered? Then Log In please</p>
          </div>
        </form>
        <Cancel className="loginCancel" onClick={() => setShowRegister(false)} />
    </div>
  );
}
