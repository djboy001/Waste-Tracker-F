import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/ContextApi';
import { toastOptions, url, errorMsg } from '../constants';
import { toast } from 'react-toastify';

function useFetchPins() {
    const { allVolunteerSet, setAllVolunteerSet, setPins, flagForDeleteLocation, pins } = useAuth();
    //Fetching all location pins
    useEffect(() => {
        const getPins = async () => {
            try {
                const allPins = await axios.get(url + "api/pins");
                setPins(allPins.data);
                const volunteers = await axios.get(url + "api/volunteer");
                for (let i = 0; i < volunteers.data.length; i++) {
                    allVolunteerSet.add(volunteers.data[i].username + "$" + volunteers.data[i].pinId);
                }
                setAllVolunteerSet(allVolunteerSet);
            } catch (err) {
                console.log(err);
                toast.error(`${err?.response?.data ? err?.response?.data : errorMsg}`, toastOptions);
            }
        };
        getPins();
    }, [flagForDeleteLocation]);
    return pins;
}

export default useFetchPins;