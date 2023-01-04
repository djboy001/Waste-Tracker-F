import axios from "axios";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const url = process.env.REACT_APP_url;

export async function uploadFile(file){
    try{
        const formData = new FormData();
        formData.append("file",file);
        formData.append("upload_preset",process.env.REACT_APP_cloudinary_preset);
        formData.append("folder",`WasteTracker/${window.location.hostname}`);
        if(!file) throw new Error("Please choose a image");
        const res = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_cloudinary_cloudname}/image/upload`,formData);
    
        return {
            url:res?.data?.url,
            public_id:res?.data?.public_id
        };
    }catch(err){
        console.log(err);
        toast.error(`${err?.message ? err.message : "Oops something went wrong"}`, {
            position:"top-right",
            autoClose:5000,
            pauseOnHover:true,
            draggable:true,
            theme:"light",
            transition: Bounce
        });
    }
}

export async function deleteFile(public_id){
    try{
        if(!public_id) throw new Error("No public Id to delete Image");
        axios.post(`${url}deleteImage`,{publicId:public_id}).then((res)=>{
            console.log(res?.data?.deleted[public_id]);
        })
    }catch(err){
        console.log(err);
        toast.error(`${err?.message ? err.message : "Oops something went wrong"}`, {
            position:"top-right",
            autoClose:5000,
            pauseOnHover:true,
            draggable:true,
            theme:"light",
            transition: Bounce
        });
    }
}
