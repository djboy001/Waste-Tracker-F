import axios from "axios";
import { useAuth } from "../context/ContextApi";
import LoadingUtils from "../utils/loadingUtils";
import { myStorage, url, errorMsg } from "../constants";

function VolunteerApi() {
    const { 
        allVolunteerSet, 
        setAllVolunteerSet, 
        setFlagForDeleteLocation, 
        currentPlaceId, 
        currentUsername, 
        flagForDeleteLocation 
    } = useAuth();
    const { stopLoadingError, stopLoadingSuccess, makeLoading } = LoadingUtils();
    
    //on click To be a volunteer
    const handleVolSubmit = async (e) => {
        e.preventDefault();
        const newVol = {
            pin_id: currentPlaceId,
            username: myStorage.getItem("user"),
        };
        try {
            makeLoading();
            await axios.post(url + `api/volunteer/${currentPlaceId}`, newVol);
            if (allVolunteerSet.has(currentUsername + "$" + currentPlaceId))
                allVolunteerSet.delete(currentUsername + "$" + currentPlaceId);
            else
                allVolunteerSet.add(currentUsername + "$" + currentPlaceId);
            setAllVolunteerSet(allVolunteerSet);
            setFlagForDeleteLocation(!flagForDeleteLocation);
            stopLoadingSuccess("Done");
        } catch (err) {
            console.log(err);
            stopLoadingError(`${err?.response?.data ? err?.response?.data : errorMsg}`);
        }
    };

    return { handleVolSubmit };
}

export default VolunteerApi;