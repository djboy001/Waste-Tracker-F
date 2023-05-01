import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/ContextApi';
import { optionsGeolocation, toastOptions, errorMsg } from '../constants';


function useFetchLiveLocation() {
    // Fetching the live location of user
    const { viewport ,setViewport } = useAuth();
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(successGeolocation, errorGeolocation, optionsGeolocation);
            console.log("geolocation is available...");
        } else {
            console.log("geolocation is unavailable...");
        }
    }, []);
    const successGeolocation = (position) => {
        console.log("geolocation is available...", position);
        setViewport({
            ...viewport,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
    }
    const errorGeolocation = (err) => {
        toast.error(`${(err?.response?.data ? err?.response?.data : errorMsg)}`, toastOptions);
        console.log("ErrorGeolocation : ", err);
    }

    return viewport;
}

export default useFetchLiveLocation;