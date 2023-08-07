import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/ContextApi';
import { toastOptions, url, errorMsg } from '../constants';
import { toast } from 'react-toastify';

function useFetchPins() {
    const { allVolunteerSet, setAllVolunteerSet, setPins, flagForDeleteLocation, pins } = useAuth();
    //Fetching all location pins
    async function fetchUsername(objId) {
        try {
          const userObj = await axios.post(url + "api/users/getuser", { _id: objId });
          if (userObj.data) {
            const { username } = userObj.data;
            return username;
          }
          return null;
        } catch (error) {
          console.error("Error fetching user with ID:", objId, "Error:", error);
          throw error; // Rethrow the error to be caught in the main function
        }
    }
    async function processVolunteers(volunteers) {
        try {
          for (const { pinId, userIds } of volunteers) {
            const usernames = await Promise.all(userIds.map(fetchUsername));
            usernames.filter((username) => !(username instanceof Error)).forEach((username) => {
              if(username) allVolunteerSet.add(username + "$" + pinId);
            });
          }
          setAllVolunteerSet(allVolunteerSet);
        } catch (err) {
            console.error("Error occurred during processing:", err);
            toast.error(`${err?.response?.data ? err?.response?.data : "Can't fetch volunteer or pin details!"}`, toastOptions);
        }
    }
    useEffect(() => {
        const getPins = async () => {
            try {
                const allPins = await axios.get(url + "api/pins");
                var volunteers = await axios.get(url + "api/volunteer");
                setPins(allPins.data);
                volunteers = volunteers.data;
                if(!volunteers) throw "No Volunteers";
                await processVolunteers(volunteers);
            } catch (err) {
                console.log(err);
                toast.error(`${err?.response?.data ? err?.response?.data : "Can't fetch volunteer or pin details!"}`, toastOptions);
            }
        };
        getPins();
    }, [flagForDeleteLocation]);
    return pins;
}

export default useFetchPins;