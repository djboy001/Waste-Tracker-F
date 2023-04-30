import React,{useEffect, useState, createContext, useContext, useRef} from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUsername, setCurrentUsername] = useState(null);
    const [pins, setPins] = useState([]);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);
    const [currentPlaceDetail,setCurrentPlaceDetail] = useState(null);
    const [newPlace, setNewPlace] = useState(null);
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [flagForDeleteLocation, setFlagForDeleteLocation] = useState(false);
    const [viewport, setViewport] = useState({
      latitude: 47.040182,
      longitude: 17.071727,
      zoom: 13.88,
    });
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [allVolunteerSet,setAllVolunteerSet] = useState(new Set());
    const [isDynamicPopupPosition, setIsDynamicPopupPosition] = useState(true);
    const [file, setFile] = useState(null);
    const toastId = useRef(null);


    /**** useEffects for precomputation ******/


    /****** passing values */
    const value = {
        toastId,
        currentUsername, setCurrentUsername, 
        pins, setPins, 
        currentPlaceId, setCurrentPlaceId, 
        currentPlaceDetail, setCurrentPlaceDetail, 
        newPlace, setNewPlace, 
        title, setTitle, 
        desc, setDesc, 
        flagForDeleteLocation, setFlagForDeleteLocation, 
        viewport, setViewport, 
        showLogin, setShowLogin, 
        showRegister, setShowRegister, 
        allVolunteerSet, setAllVolunteerSet, 
        isDynamicPopupPosition, setIsDynamicPopupPosition, 
        file, setFile,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}