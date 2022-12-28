import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";

export default function Login({ setShowLogin, setCurrentUsername, myStorage }) {
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const url = process.env.REACT_APP_url;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post(
        url+"api/users/login",
        user
      );
      setCurrentUsername(res.data.username);
      myStorage.setItem("user", res.data.username);
      setShowLogin(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="loginContainer">
        <form className="login1" onSubmit={handleSubmit}>
          <h2 style={{color:"#212429"}}>Welcome, User!</h2>
          <p>Please Log In</p>
          <input autoFocus type="text" placeholder="User Name" ref={usernameRef} />
          <input type="password" min="6" placeholder="Password" ref={passwordRef} />
          <input type="submit" value="Log In" />
          {error && <span className="failure">Something went wrong!</span>}
          <div className="links1">
            <a href="#"></a>
            <p href="#">Don't have account? Then click on Register</p>
          </div>
        </form>
        <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div> 
  );
}
