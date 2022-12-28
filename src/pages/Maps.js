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

mapboxgl.workerClass = MapboxWorker;


function Maps(props) {

  const myStorage = window.localStorage;
  const history = useHistory();
  var { mapname } = useParams();
  const url = process.env.REACT_APP_url;
  var mapStyle = 'mapbox://styles/mapbox/'+mapname;
  const optionsGeolocation = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  


/********************************* UseStates Variables *****************************************/  

  const [currentUsername, setCurrentUsername] = useState(
    myStorage.getItem("user")
  );
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [flagForDeleteLocation, setFlagForDeleteLocation] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 13.88,
  });
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [allVolunteerSet,setAllVolunteerSet] = useState(new Set());
  


/********************************* UseEffects & UseCallbacks *****************************************/  

  // Fetching the live location of user
    useEffect(()=>{
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(successGeolocation,errorGeolocation,optionsGeolocation);
        console.log("geolocation is available...");
      } else {
        console.log("geolocation is unavailable...");
        alert("Geolocation is not available");
      }
    },[]);

    //Fetching all location pins
    useEffect(() => {
      const getPins = async () => {
        try {
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
        }
      };
      getPins();
    }, [flagForDeleteLocation]);



/********************************* Functions *****************************************/  

  const handleMarkerClick = async (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };


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
      console.log("this place position is ",[newPlace.lat,newPlace.long]);
      const res = await axios.post(
        url+"api/pins",
        newPin
      );
      setPins([...pins, res.data]);
    } catch (err) {
      deleteFile(image?.public_id);
      alert(err);
    }
  };

  //Delete location
  const handleDeleteLocation = async(e) =>{
    e.preventDefault();
    try{
      setCurrentPlaceId(null);
      const pin = await axios.get(url+`api/pins/pindata/${e.target[0].value}`);
      deleteFile(pin?.data?.img?.public_id);
      await axios.delete(url+`api/pins/${e.target[0].value}`);
      await axios.delete(url+`api/volunteer/${e.target[0].value}`);
      setFlagForDeleteLocation(!flagForDeleteLocation);
    }catch(err){
      console.log(err);
      alert(err);
    }
  }

  const handleSeeAllVol = async (e) => {
    e.preventDefault();
    props.history.push(`/seeallvolunteers/${currentPlaceId}`);
  };

  const handleVolSubmit = async (e) => {
    e.preventDefault();
    const newVol = {
      pin_id: currentPlaceId,
      username: myStorage.getItem("user"),
    };
    try {
      const res = await axios.post(
        url+`api/volunteer/${currentPlaceId}`,
        newVol
      );
      if(allVolunteerSet.has(currentUsername+"$"+currentPlaceId)) allVolunteerSet.delete(currentUsername+"$"+currentPlaceId);
      else allVolunteerSet.add(currentUsername+"$"+currentPlaceId);
      setAllVolunteerSet(allVolunteerSet);
      setFlagForDeleteLocation(!flagForDeleteLocation);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  //Logout the user
  const handleLogout = async () => {
    const userDetails = {
      username: myStorage.getItem("user"),
    };
    await axios.post(
      url + "api/users/logout"
    );
    setCurrentUsername(null);
    myStorage.removeItem("user");
  };

  //Set Live Location viewport
  function successGeolocation(position){
    console.log("geolocation is available...",position);
    setViewport({
      ...viewport,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }

  function errorGeolocation(error){
    console.log("ErrorGeolocation");
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
                  if(p._id!=currentPlaceId) handleMarkerClick(p._id, p.lat, p.long);
                  else setCurrentPlaceId(null);
                }}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                key={p._id}
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="left"
              >
                <LocationCard 
                  pin={p}
                  handleVolSubmit={handleVolSubmit}
                  handleSeeAllVol={handleSeeAllVol}
                  currentUsername={currentUsername}
                  handleDeleteLocation={handleDeleteLocation}
                  allVolunteerSet={allVolunteerSet}
                />
              </Popup>
            )}
          </div>
        ))}
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
              onClose={() => setNewPlace(null)}
              anchor="left"
            >
              <NewPinCard 
                handleSubmit={handleSubmit}
                setDesc={setDesc}
                setTitle={setTitle}
                setNewPlace={setNewPlace}
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
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            setCurrentUsername={setCurrentUsername}
            myStorage={myStorage}
          />
        )}
        <MapControls />
      </ReactMapGL>
    </div>
  );
}

export default Maps;
