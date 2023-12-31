import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/ContextApi';
import { FileApi, MarkerApi } from "../services/services";
import { toast, Bounce } from 'react-toastify';
import { LoadingUtils } from "../utils/utils";


function NewPinCard() {
    const {
        setNewPlace,
        title, setTitle,
        desc, setDesc,
        file, setFile
    } = useAuth();
    const { uploadFile } = FileApi();
    const { makeLoading } = LoadingUtils();
    const { handleAddMarker } = MarkerApi();

    // const pinSample = {
    //     _id: 1,
    //     username: "currentUsername",
    //     title: "Water Waste",
    //     desc: "Snippets support most TextMate syntax for y format whitespace based on dynamic behavior, intelligently format whitespace based on Snippets support most TextMate syntax for dynamic behavior, intelligently format whitespace based on",
    //     lat: 45,
    //     long: 44,
    //     img: "./garbage.jpg"
    // };



    async function handleAddPin(e) {
        makeLoading("Adding Location...");
        e.preventDefault();
        setNewPlace(null);
        const res = await uploadFile({ file });
        if (res && res.url && res.public_id) handleAddMarker(res);
    }


    return (
        <div className='newPinCard'>
            <h1 className='heading'>Add Pin</h1>
            <form onSubmit={handleAddPin}>
                <div className='chooseFile'>
                    <input
                        type="file"
                        accept="image/*"
                        style={{ padding: "0px" }}
                        onChange={(e) => {
                            if (e.target.files[0].size > 12582912) { //12MB
                                toast.error("File size is too large", {
                                    position: "top-right",
                                    autoClose: 5000,
                                    pauseOnHover: true,
                                    draggable: true,
                                    theme: "light",
                                    transition: Bounce
                                });
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
                    value={title ? title : ""}
                />
                <label>Description</label>
                <textarea
                    placeholder="Say us something about this place (Max. 700 characters)"
                    rows="9"
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc ? desc : ""}
                />
                <button type="submit" className="primaryButton" style={{ marginTop: "20px", }}   >
                    Add Pin
                </button>
            </form>
        </div>
    );
}

export default NewPinCard;