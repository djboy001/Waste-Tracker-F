import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import LoadingUtils from "../utils/loadingUtils";
import { url } from "../constants";

function FileApi() {
    const { stopLoadingError } = LoadingUtils();
    async function uploadFile({ file }) {
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", process.env.REACT_APP_cloudinary_preset);
            formData.append("folder", `WasteTracker/${window.location.hostname}`);
            if (!file) throw new Error("Please choose a image");
            const res = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_cloudinary_cloudname}/image/upload`, formData);

            return {
                url: res?.data?.url,
                public_id: res?.data?.public_id
            };
        } catch (err) {
            console.log(err);
            stopLoadingError(`${err?.message ? err.message : "Oops something went wrong"}`);
        }
    }

    async function deleteFile({ public_id }) {
        try {
            if (!public_id) throw new Error("No public Id to delete Image");
            axios.post(`${url}deleteImage`, { publicId: public_id }).then((res) => {
                console.log(res?.data?.deleted[public_id]);
            })
        } catch (err) {
            console.log(err);
            stopLoadingError(`${err?.message ? err.message : "Oops something went wrong"}`);
        }
    }
    return { uploadFile, deleteFile };
}

export default FileApi;


