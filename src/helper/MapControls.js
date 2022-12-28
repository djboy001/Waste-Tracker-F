import React, {useState, useEffect, useRef} from 'react';
import { useHistory } from 'react-router-dom';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { GeolocateControl, NavigationControl } from 'react-map-gl';

function MapControls() {
    var mapList=[
        'streets-v12',
        'outdoors-v12',
        'light-v11',
        'dark-v11',
        'satellite-streets-v12',
        'navigation-day-v1',
        'navigation-night-v1'
    ];
    const [mapNumber, setMapNumber] = useState(0);
    const [flagForInitialLocationActivation,setFlagForInitialLocationActivation] = useState(false);
    const inputRef = useRef();
    const history = useHistory();


    if(!flagForInitialLocationActivation && inputRef?.current?.childNodes[0]?.childNodes[0]?.childNodes[0]){
      //document.querySelector("button.mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate")
      setFlagForInitialLocationActivation(true);
    }
    useEffect(()=>{
      if(flagForInitialLocationActivation){
        setTimeout(()=>{
          inputRef?.current?.childNodes[0]?.childNodes[0]?.childNodes[0]?.click()
        },100);
      }
    },[flagForInitialLocationActivation]);


    //Changing Mapcount
    useEffect(()=>{
        var tmp = parseInt(sessionStorage.getItem("map"));
        if(tmp > -1) setMapNumber(tmp);
    },[]);

    //For changing map
    const handleChangeMap = () => {
        var tmp = (mapNumber+1)%mapList.length;
        setMapNumber((num)=>(num+1)%mapList.length);
        sessionStorage.setItem("map",tmp);
        history.push(`/maps/${mapList[tmp]}`);
        window.location.reload();
    }

    return (
        <div className="mapControlButtons">
            <div ref={inputRef}>
                <GeolocateControl 
                    showUserLocation={true}
                    trackUserLocation={true}
                    showUserHeading={true}
                    positionOptions={{ enableHighAccuracy: true }}
                    showAccuracyCircle={false}
                    className='locationToggleButton'
                />
            </div>
            <NavigationControl className='navigationControl' />
            <span className="changeMap" onClick={handleChangeMap}>
                <ChangeCircleIcon fontSize='inherit' style={{filter: "drop-shadow(1px 2px 2px gray)"}} />
            </span>
        </div>
    );
}

export default MapControls;