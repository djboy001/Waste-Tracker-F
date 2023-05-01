import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import mapboxgl from "mapbox-gl";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import { Room } from "@material-ui/icons";
import { useAuth } from "../context/ContextApi";
import { ToastContainer } from 'react-toastify';

import { Register, Login, NewPinCard, LocationCard, MapControls } from "../components/components";
import { UserApi } from "../services/services";
import { MarkerHandlers } from "../helper/helper"
import { useFetchLiveLocation, useFetchPins } from "../hooks/hooks";


function Maps() {
  var { mapname } = useParams();
  var mapStyle = 'mapbox://styles/mapbox/' + mapname;
  mapboxgl.workerClass = MapboxWorker;

  /********************************* UseStates Variables *****************************************/
  const {
    currentUsername, 
    pins,
    currentPlaceId, setCurrentPlaceId,
    currentPlaceDetail, setCurrentPlaceDetail,
    newPlace, setNewPlace,
    viewport, setViewport,
    showLogin, setShowLogin,
    showRegister, setShowRegister,
    isDynamicPopupPosition, setIsDynamicPopupPosition,
    setFile
  } = useAuth();
  const { handleLogout } = UserApi();
  const { handleAddDoubleClick, handleMarkerClick } = MarkerHandlers();



  /********************************* UseEffects *****************************************/
  useFetchLiveLocation();
  useFetchPins();

  //Disabling dynamic postion of popup for mobile devies
  useEffect(() => {
    if (window.innerWidth <= 450) {
      setIsDynamicPopupPosition(false);
    } else {
      setIsDynamicPopupPosition(true);
    }
  }, [window.innerWidth]);


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
        onDblClick={currentUsername && handleAddDoubleClick}
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
                  zIndex: -100
                }}
                onClick={() => {
                  if (p._id !== currentPlaceId) handleMarkerClick(p);
                  else {
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
            <LocationCard />
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
              onClose={() => {
                setNewPlace(null);
                setFile(null);
              }}
              anchor="top"
              dynamicPosition={isDynamicPopupPosition}
            >
              <NewPinCard />
            </Popup>
          </>
        )}
        {currentUsername ? (
          <div className="buttons" id="buttonDiv">
            <button
              style={{ background: "tomato" }}
              className="primaryButton"
              onClick={handleLogout}>
              Log Out
            </button>
          </div>
        ) : (
          <div className="buttons" id="buttonDiv">
            <button className="primaryButton"
              onClick={() => { setShowLogin(true); setShowRegister(false) }}>
              Log In
            </button>
            <button
              className="secondaryButton"
              style={{ marginLeft: "14px" }}
              onClick={() => { setShowRegister(true); setShowLogin(false) }}
            >
              Register
            </button>
          </div>
        )}
        <MapControls />
      </ReactMapGL>


      {showRegister &&
        <div className="my-overlay">
          <Register />
        </div>
      }
      {showLogin && (
        <div className="my-overlay">
           <Login />
        </div>
      )}

      <ToastContainer
        newestOnTop={true}
      />
    </div>
  );
}

export default Maps;
