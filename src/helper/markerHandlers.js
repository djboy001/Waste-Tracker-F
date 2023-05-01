  
import { useAuth } from "../context/ContextApi";
  
function MarkerHandlers() {
  const {
    setCurrentPlaceId, 
    setCurrentPlaceDetail,
    setNewPlace,
    viewport, setViewport,
  } = useAuth();
    
  //on clicking on marker location
  const handleMarkerClick = async (p) => {
    setCurrentPlaceId(p._id);
    setCurrentPlaceDetail(p);
    setViewport({ ...viewport, latitude: p.lat, longitude: p.long });
  };

  //on duble click add location handleAddClick 
  const handleAddDoubleClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };
  return { handleAddDoubleClick, handleMarkerClick };
}
  
  export default MarkerHandlers;
