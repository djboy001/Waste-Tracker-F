  
  /*********************** User GeoLocating ************************/

  // const optionsGeolocation = {
  //   enableHighAccuracy: true,
  //   timeout: 5000,
  //   maximumAge: 0
  // };
  
  // const [liveviewport, setLiveviewport] = useState({
  //   latitude: 47.040182,
  //   longitude: 17.071727,
  // });


    // Fetching the live location of user
    // useEffect(()=>{
    //   if ("geolocation" in navigator) {
    //     console.log("geolocation is available");
    //     navigator.geolocation.getCurrentPosition(successGeolocation,errorGeolocation,optionsGeolocation);
    //   } else {
    //     console.log("geolocation is unavailable");
    //     alert("Geolocation is not available");
    //   }
    // },[]);


  // function successGeolocation(position){
  //   setLiveviewport({
  //     ...liveviewport,
  //     latitude: position.coords.latitude,
  //     longitude: position.coords.longitude,
  //   });
  //   setViewport({
  //     ...viewport,
  //     latitude: position.coords.latitude,
  //     longitude: position.coords.longitude,
  //   });
  // }

  // function errorGeolocation(error){
  //   alert("errorGeolocation : "+error);
  // }




    // <Marker
    //   latitude={liveviewport.latitude}
    //   longitude={liveviewport.longitude}
    //   offsetLeft={-1.5 * viewport.zoom}
    //   offsetTop={-1.5 * viewport.zoom}
    // >
    //   <MyLocation
    //     style={{
    //       fontSize: 3 * viewport.zoom,
    //       color: "red",
    //       cursor: "pointer",
    //       visibility:"hidden"
    //     }}
    //     onClick={() =>
    //       handleMarkerClick(
    //         "Live Geolocation",
    //         liveviewport.latitude,
    //         liveviewport.longitude
    //       )
    //     }
    //   />
    // </Marker> 
    // {currentPlaceId == "Live Geolocation" && (
    //   <Popup
    //     key={currentPlaceId}
    //     latitude={liveviewport.latitude}
    //     longitude={liveviewport.longitude}
    //     closeButton={true}
    //     closeOnClick={false}
    //     onClose={() => setCurrentPlaceId(null)}
    //     anchor="left"
    //   >
    //     <div
    //       style={{
    //         maxHeight: "100%",
    //         color: "black",
    //         fontWeight:"500",
    //         padding: "12px",
    //         marginRight: "4px",
    //         backgroundColor:"white"
    //       }}
    //     >
    //       Your Location
    //     </div>
    //   </Popup>
    // )} 




/*********************** Previous Cards ************************/
    // <div className="card" id="popupOfWaste">
    //   <label>Type of waste</label>
    //   <h4 className="place">{p.title}</h4>
    //   <label>Description</label>
    //   <p className="desc">{p.desc}</p>
    //   <label>Garbage Level</label>
    //   <div className="stars">
    //     {Array(p.rating).fill(<DeleteIcon className="star" />)}
    //   </div>
    //   <label>Information</label>
    //   <span className="username">
    //     Created by <b>{p.username}</b>
    //   </span>
    //   <span className="date">{format(p.createdAt)}</span>
    //   <form onSubmit={handleVolSubmit}>
    //     <input type="hidden" name="pin_id" value={p._id}></input>
    //     <button
    //       name="volunteer"
    //       type="submit"
    //       className="submitButton"
    //       style={{background:"slateblue"}}
    //     >
    //       {allVolunteerSet.has(currentUsername+"$"+p._id)===true?"Cancel Volunteer":"Be a Volunteer"}
    //     </button>
    //   </form>
    //   <form onSubmit={handleSeeAllVol}>
    //     <button
    //       name="volunteer"
    //       type="submit"
    //       className="submitButton"
    //       style={{background:"slateblue"}}
    //     >
    //       See Volunteers
    //     </button>
    //   </form>
    //   {currentUsername === p.username &&(
    //       <form onSubmit={handleDeleteLocation}>
    //         <input type="hidden" name="pin_id" value={p._id}></input>
    //         <button
    //           name="volunteer"
    //           type="submit"
    //           className="submitButton"
    //           style={{background:"slateblue"}}
    //         >
    //           Delete location
    //         </button>
    //       </form>)
    //   }
    // </div> 


    //New Card
    // <div style={{padding:"5px"}}>
    //   <form onSubmit={handleSubmit}>
    //     <FileBase64
    //         multiple={ false }
    //         onDone={({ base64 })=>{
    //           setImageBase64(base64);
    //         }} 
    //     />
    //     <img src={imageBase64} height="300px" width="300px" />
    //     <label>Details</label>
    //     <input
    //       placeholder="Enter a title"
    //       autoFocus
    //       onChange={(e) => setTitle(e.target.value)}
    //     />
    //     <label>Description</label>
    //     <textarea
    //       placeholder="Say us something about this place."
    //       onChange={(e) => setDesc(e.target.value)}
    //     />
    //     <label>Garbage Level</label>
    //     <select onChange={(e) => setStar(e.target.value?e.target.value:1)}>
    //       <option value="1">1</option>
    //       <option value="2">2</option>
    //       <option value="3">3</option>
    //       <option value="4">4</option>
    //       <option value="5">5</option>
    //     </select>
    //     <button type="submit" className="submitButton" style={{background:"slateblue"}}  >
    //       Add Pin
    //     </button>
    //   </form>
    // </div>



    /***************************** Inital Activate User Location ***************************/
    
    // document.addEventListener('DOMContentLoaded', function(event) {
    // });
    // useEffect(()=>{
    //     setTimeout(()=>{
    //       console.log("timeout ran...");
    //       if(document.querySelector("button.mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate"))
    //         document.querySelector("button.mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate").click();
    //     },500);
    //   console.log("dom ",params.mapname);
    // },[params.mapname]);

