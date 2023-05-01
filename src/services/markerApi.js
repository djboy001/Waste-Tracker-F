import axios from "axios";
import { useAuth } from "../context/ContextApi";
import LoadingUtils from "../utils/loadingUtils";
import FileApi from "./fileApi";
import { url, errorMsg } from "../constants";

function MarkerApi() {
    const {
        currentUsername,
        pins, setPins,
        setCurrentPlaceId, 
        setCurrentPlaceDetail,
        newPlace,
        title, setTitle,
        desc, setDesc,
        flagForDeleteLocation, setFlagForDeleteLocation,
        setFile
    } = useAuth();
    const { makeLoading, stopLoadingError, stopLoadingSuccess } = LoadingUtils();
    const { deleteFile } = FileApi();

    //new location handleSubmit
    const handleAddMarker = async (image) => {
        const newPin = {
            username: currentUsername,
            title,
            desc,
            img: image,
            lat: newPlace.lat,
            long: newPlace.long,
        };
        try {
            if (!(newPin.username && newPin.title && newPin.desc && newPin.img && newPin.lat && newPin.long)) {
                throw new Error("Please fill all the fields");
            }
            const res = await axios.post( url + "api/pins", newPin);
            setPins([...pins, res.data]);
            stopLoadingSuccess("Successfully location submitted");
        } catch (err) {
            deleteFile({ public_id: image?.public_id });
            console.log(err);
            stopLoadingError(`${err?.response?.data ? err?.response?.data : errorMsg}`);
        }
        finally {
            setDesc(null);
            setTitle(null);
            setFile(null);
        }
    };

    //Delete location handleDeleteLocation
    const handleDeleteMarker = async (e) => {
        e.preventDefault();
        try {
            makeLoading("Deleting location...")
            setCurrentPlaceId(null);
            setCurrentPlaceDetail(null);
            const pin = await axios.get(url + `api/pins/pindata/${e.target[0].value}`);
            deleteFile({ public_id: pin?.data?.img?.public_id });
            await axios.delete(url + `api/pins/${e.target[0].value}`);
            await axios.delete(url + `api/volunteer/${e.target[0].value}`);
            setFlagForDeleteLocation(!flagForDeleteLocation);
            stopLoadingSuccess("Location Deleted");
        } catch (err) {
            console.log(err);
            stopLoadingError(`${err?.response?.data ? err?.response?.data : errorMsg}`);
        }
    }
    return { handleAddMarker, handleDeleteMarker };
}

export default MarkerApi;