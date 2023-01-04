import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useEffect, useState } from "react";
import LocationCard from "../components/LocationCard";
import {
  Room,
} from "@material-ui/icons";
import axios from "axios";
import Register from "../components/Register";
import Login from "../components/Login";
import { useHistory, useParams } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import NewPinCard from "../components/NewPinCard";
import { deleteFile } from "../helper/uploadFilesHelper";
import MapControls from "../helper/MapControls";
import { useAuth } from "../contexts/ContextApi";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

mapboxgl.workerClass = MapboxWorker;


function Maps() {
  const myStorage = window.localStorage;
  const history = useHistory();
  var { mapname } = useParams();
  const url = process.env.REACT_APP_url;
  var mapStyle = 'mapbox://styles/mapbox/'+mapname;
  const optionsGeolocation = {
    enableHighAccuracy: true,
    timeout: 6000,
    maximumAge: 0
  };
  const toastOptions={
    position:"top-right",
    autoClose:5000,
    pauseOnHover:true,
    draggable:true,
    theme:"light",
    transition: Bounce
  };
  const errorMsg = "Oops something went wrong";
  const successMsg = "Sucessfull";

/********************************* UseStates Variables *****************************************/  
  const {
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
    file, setFile
  } = useAuth();
  


/********************************* UseEffects *****************************************/  
  const makeLoading = (msg="Loading...")=>{
    toastId.current = toast.loading(msg);
  }
  const stopLoadingSuccess = (msg=successMsg) => {
    toast.update(toastId.current, {render: msg, type: "success", isLoading: false, autoClose: 5000, closeButton: true});
  }
  const stopLoadingError = (msg=errorMsg) => {
    toast.update(toastId.current, {render: msg, type: "error", isLoading: false, autoClose: 5000, closeButton: true});
  }

  // Fetching user
  useEffect(()=>{
    setCurrentUsername(myStorage.getItem("user"));
  },[]);

  // Fetching the live location of user
  useEffect(()=>{
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(successGeolocation,errorGeolocation,optionsGeolocation);
      console.log("geolocation is available...");
    } else {
      console.log("geolocation is unavailable...");
    }
  },[]);

  //Fetching all location pins
  useEffect(() => {
    const getPins = async () => {
      try {
        // makeLoading("Submitting location...")
        const allPins = await axios.get(
          url+"api/pins"
        );
        setPins(allPins.data);
        const volunteers = await axios.get(url+"api/volunteer");
        for(let i=0;i<volunteers.data.length;i++){
          allVolunteerSet.add(volunteers.data[i].username+"$"+volunteers.data[i].pinId);
        }
        setAllVolunteerSet(allVolunteerSet);
      } catch (err) {
        console.log(err);
        toast.error(`${err?.message ? err.message : errorMsg}`, toastOptions);
      }
    };
    getPins();
  }, [flagForDeleteLocation]);


  //Disabling dynamic postion of popup for mobile devies
  useEffect(()=>{
    if(window.innerWidth <= 450){
      setIsDynamicPopupPosition(false);
    }else{
      setIsDynamicPopupPosition(true);
    }
  },[window.innerWidth]);
  


/********************************* Functions *****************************************/  

  //on clicking on marker
  const handleMarkerClick = async (p) => {
    setCurrentPlaceId(p._id);
    setCurrentPlaceDetail(p);
    setViewport({ ...viewport, latitude: p.lat, longitude: p.long });
  };

  //on duble click on map
  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setViewport({ ...viewport, latitude: latitude, longitude: longitude });
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };

  //on submit new waste location form
  const handleSubmit = async (image) => {
    const newPin = {
      username: currentUsername,
      title,
      desc,
      img: image,
      lat: newPlace.lat,
      long: newPlace.long,
    };
    try {
      if(!(newPin.username && newPin.title && newPin.desc && newPin.img && newPin.lat && newPin.long)){
        throw new Error("Please fill all the fields");
      }
      const res = await axios.post(
        url+"api/pins",
        newPin
      );
      setPins([...pins, res.data]);
      stopLoadingSuccess("Successfully location submitted");
    } catch (err) {
      deleteFile(image?.public_id);
      console.log(err);
      stopLoadingSuccess(`${err?.message ? err.message : errorMsg}`);
    }
    finally{
      setDesc(null);
      setTitle(null);
      setFile(null);
    }
  };

  //Delete location
  const handleDeleteLocation = async(e) =>{
    e.preventDefault();
    try{
      makeLoading("Deleting location...")
      setCurrentPlaceId(null);
      setCurrentPlaceDetail(null);
      const pin = await axios.get(url+`api/pins/pindata/${e.target[0].value}`);
      deleteFile(pin?.data?.img?.public_id);
      await axios.delete(url+`api/pins/${e.target[0].value}`);
      await axios.delete(url+`api/volunteer/${e.target[0].value}`);
      setFlagForDeleteLocation(!flagForDeleteLocation);
      stopLoadingSuccess("Location Deleted");
    }catch(err){
      console.log(err);
      stopLoadingError(`${err?.message ? err.message : errorMsg}`);
    }
  }
  
  //fetching all volunteers
  const handleSeeAllVol = async (e) => {
    e.preventDefault();
    history.push(`/seeallvolunteers/${currentPlaceId}`);
  };

  //on click be a volunteer
  const handleVolSubmit = async (e) => {
    e.preventDefault();
    const newVol = {
      pin_id: currentPlaceId,
      username: myStorage.getItem("user"),
    };
    try {
      makeLoading();
      await axios.post(
        url+`api/volunteer/${currentPlaceId}`,
        newVol
      );
      if(allVolunteerSet.has(currentUsername+"$"+currentPlaceId)) allVolunteerSet.delete(currentUsername+"$"+currentPlaceId);
      else allVolunteerSet.add(currentUsername+"$"+currentPlaceId);
      setAllVolunteerSet(allVolunteerSet);
      setFlagForDeleteLocation(!flagForDeleteLocation);
      stopLoadingSuccess("Done");
    } catch (err) {
      console.log(err);
      stopLoadingError(`${err?.message ? err.message : errorMsg}`);
    }
  };

  //Logout the user
  const handleLogout = async () => {
    makeLoading("Signing out...");
    try{
      await axios.post(
        url + "api/users/logout"
      );
      setCurrentUsername(null);
      myStorage.removeItem("user");
      stopLoadingSuccess("Successfully logout");
    }catch(err){
      stopLoadingError(`${err?.message ? err.message : errorMsg}`);
      console.log("Logout Error : "+err);
    }
  };

  //Set Live Location viewport
  const successGeolocation = (position) => {
    console.log("geolocation is available...",position);
    setViewport({
      ...viewport,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }

  const errorGeolocation = (err) => {
    toast.error(`${(err?.message ? err.message : errorMsg)}`,toastOptions);
    console.log("ErrorGeolocation : ",err);
  }



/****************** TESTING STUFF ************************/






  return (
    <div className='MapClass'>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoiYW1pdGJhdHJhMzEiLCJhIjoiY2t2MmQzbnh0MDI5dzJ5bDdvbDExand4MiJ9.vJaVz5di-IFq3uJd_eCC2Q"
        width="100%"
        height="100%"
        transitionDuration="20"
        mapStyle={mapStyle}
        onViewportChange={(viewport) => setViewport(viewport)}
        onDblClick={currentUsername && handleAddClick}
      >
        {pins.map((p, ind) => (
          <div key={ind}>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-1.5 * viewport.zoom} //-3.5
              offsetTop={-1.5 * viewport.zoom} //-7
            >
              <Room
                style={{
                  fontSize: 3 * viewport.zoom,
                  color:
                  currentUsername === p.username ? "tomato" : "slateblue",
                  cursor: "pointer",
                  zIndex:-100
                }}
                onClick={() =>{
                  if(p._id!=currentPlaceId) handleMarkerClick(p);
                  else{ 
                    setCurrentPlaceDetail(null); 
                    setCurrentPlaceId(null);
                  }
                }}
              />
            </Marker>
          </div>
        ))}
        {currentPlaceDetail && (
          <Popup
            key={currentPlaceDetail._id}
            latitude={currentPlaceDetail.lat}
            longitude={currentPlaceDetail.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => {
              setCurrentPlaceId(null);
              setCurrentPlaceDetail(null);
            }}
            anchor="top"
            dynamicPosition={isDynamicPopupPosition}
          >
            <LocationCard 
              pin={currentPlaceDetail}
              handleVolSubmit={handleVolSubmit}
              handleSeeAllVol={handleSeeAllVol}
              currentUsername={currentUsername}
              handleDeleteLocation={handleDeleteLocation}
              allVolunteerSet={allVolunteerSet}
            />
          </Popup>
        )}
        {newPlace && (
          <>
            <Marker
              latitude={newPlace.lat}
              longitude={newPlace.long}
              offsetLeft={-1.5 * viewport.zoom}
              offsetTop={-1.5 * viewport.zoom}
            >
              <Room
                style={{
                  fontSize: 3 * viewport.zoom,
                  color: "tomato",
                  cursor: "pointer",
                }}
              />
            </Marker>
            <Popup
              latitude={newPlace.lat}
              longitude={newPlace.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() =>{ 
                setNewPlace(null);
                setFile(null);
              }}
              anchor="top"
              dynamicPosition={isDynamicPopupPosition}
            >
              <NewPinCard 
                handleSubmit={handleSubmit}
                makeLoading={makeLoading}
              />
            </Popup>
          </>
        )}
        {currentUsername ? (
          <div className="buttons" id="buttonDiv">
            <button 
              style={{background:"tomato"}}
              className="primaryButton" 
              onClick={handleLogout}>
              Log Out
            </button>
          </div>
        ) : (
          <div className="buttons" id="buttonDiv">
            <button className="primaryButton" 
              onClick={() => {setShowLogin(true); setShowRegister(false)}}>
              Log In
            </button>
            <button
              className="secondaryButton"
              style={{marginLeft:"14px"}}
              onClick={() => {setShowRegister(true); setShowLogin(false)}}
            >
              Register
            </button>
          </div>
        )}
        <MapControls />
      </ReactMapGL>
        {showRegister && 
          <div className="my-overlay">
            <Register 
              setShowRegister={setShowRegister} 
              makeLoading={makeLoading}
              stopLoadingSuccess={stopLoadingSuccess}
              stopLoadingError={stopLoadingError}
            />
          </div> 
        }
        {showLogin && (
          <div className="my-overlay">
            <Login
              setShowLogin={setShowLogin}
              setCurrentUsername={setCurrentUsername}
              myStorage={myStorage}
              makeLoading={makeLoading}
              stopLoadingSuccess={stopLoadingSuccess}
              stopLoadingError={stopLoadingError}
            />
          </div>
        )}
      <ToastContainer 
        newestOnTop={true}  
      />
    </div>
  );
}

export default Maps;
