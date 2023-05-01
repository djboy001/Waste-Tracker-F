import { Bounce } from 'react-toastify';

export const optionsGeolocation = {
    enableHighAccuracy: true,
    timeout: 6000,
    maximumAge: 0
};
export const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    transition: Bounce
};
export const errorMsg = "Oops something went wrong";
export const successMsg = "Sucessfull";
export const url = process.env.REACT_APP_url;
export const myStorage = window.localStorage;