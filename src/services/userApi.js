import axios from "axios";
import { useAuth } from "../context/ContextApi";
import LoadingUtils from "../utils/loadingUtils"
import { url, myStorage, errorMsg } from "../constants";

function UserApi() {
  const { setCurrentUsername, setShowLogin, setShowRegister } = useAuth();
  const { makeLoading, stopLoadingError, stopLoadingSuccess } = LoadingUtils();

  //handlesubmit
  const handleRegister = async (e,{emailRef, usernameRef, passwordRef }) => {
    e.preventDefault();
    try {
      makeLoading("Registering...")
      if (!(usernameRef?.current?.value && passwordRef?.current?.value && emailRef?.current?.value)) throw new Error("Please fill all the fields");
      const newUser = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      await axios.post(url + "api/users/register", newUser);
      setShowRegister(false);
      stopLoadingSuccess("Successfully Registered 👍");
    } catch (err) {
      stopLoadingError(`${err?.response?.data ? err?.response?.data : "Oops something went wrong"}`);
    }
  };

  //login handleSubmit 
  const handleLogin = async (e, { usernameRef, passwordRef }) => {
    e.preventDefault();
    try {
      makeLoading("Signing In...");
      if (!(usernameRef?.current?.value && passwordRef?.current?.value)) throw new Error("Please fill all the fields");
      const user = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      };
      const res = await axios.post(url + "api/users/login", user);
      setCurrentUsername(res?.data?.username);
      myStorage.setItem("user", res?.data?.username);
      setShowLogin(false);
      stopLoadingSuccess(`Hey, ${res?.data?.username} 😊`);
    } catch (err) {
      console.log(err?.response?.data);
      stopLoadingError(`${err?.response?.data ? err?.response?.data : "Oops something went wrong"}`);
    }
  };

  //Logout the user
  const handleLogout = async () => {
    makeLoading("Signing out...");
    try {
      await axios.post(url + "api/users/logout");
      setCurrentUsername(null);
      myStorage.removeItem("user");
      stopLoadingSuccess("Successfully logout");
    } catch (err) {
      stopLoadingError(`${err?.response?.data ? err?.response?.data : errorMsg}`);
      console.log("Logout Error : " + err);
    }
  };

  return { handleLogout, handleLogin, handleRegister };
}

export default UserApi;