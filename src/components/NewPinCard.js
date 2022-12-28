import React, {useState, useEffect} from 'react';
import { deleteFile, uploadFile } from '../helper/uploadFilesHelper';


function NewPinCard({handleSubmit, setTitle, setDesc, setNewPlace}) {
    const pinSample = {
        _id:1,
        username: "currentUsername",
        title : "Water Waste",
        desc : "Snippets support most TextMate syntax for y format whitespace based on dynamic behavior, intelligently format whitespace based on Snippets support most TextMate syntax for dynamic behavior, intelligently format whitespace based on",
        lat: 45,
        long: 44,
        img:"./garbage.jpg"
    };

    const [file, setFile] = useState(null);

    async function handleAddPin(e){
        e.preventDefault();
        setNewPlace(null);
        try{
            const res = await uploadFile(file);
            if(res && res.url && res.public_id) handleSubmit(res);
            else throw new Error("File is not getting upload on cloudinary");
        }
        catch(err){
            alert(err);
        }
    }


    return (
        <div>
            <div className='newPinCard'>
                <h1 className='heading'>Add Pin</h1>
                <form onSubmit={handleAddPin}>
                  <div className='chooseFile'>
                    <input 
                        type="file" 
                        accept="image/*"
                        style={{padding:"0px"}} 
                        onChange={(e)=>{
                            if(e.target.files[0].size > 12582912){ //12MB
                                alert("File size is too large");
                                e.target.value = '';
                            }
                            else setFile(e.target.files[0]);
                        }}
                    />
                  </div>
                    <label>Details</label>
                    <input
                        placeholder="Type of waste"
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Description</label>
                    <textarea
                        placeholder="Say us something about this place"
                        rows="9"
                        onChange={(e) => setDesc(e.target.value)}
                    />
                  <button type="submit" className="primaryButton" style={{marginTop:"20px",}}   >
                    Add Pin
                  </button>
                </form>
            </div>
        </div>
    );
}

export default NewPinCard;