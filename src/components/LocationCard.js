import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { format } from "timeago.js";
import { useAuth } from "../context/ContextApi";
import { VolunteerApi, MarkerApi } from "../services/services";

function LocationCard() {
  const cardButtonColor = "#212429";
  const history = useHistory();
  const {
    currentUsername,
    allVolunteerSet,
    currentPlaceDetail:pin,
    currentPlaceId
  } = useAuth();
  const { handleVolSubmit } = VolunteerApi();
  const { handleDeleteMarker } = MarkerApi();

  const pinSample = {
    _id: 1,
    username: "currentUsername",
    title: "Water Waste",
    desc: "Snippets support most TextMate syntax for y format whitespace based on dynamic behavior, intelligently format whitespace based on Snippets support most TextMate syntax for dynamic behavior, intelligently format whitespace based on",
    rating: 4,
    lat: 45,
    long: 44,
    img: {
      url: "./garbage.jpg",
      public_id: "abcd..."
    }
  };

  const handleSeeAllVol = (e) => {
    e.preventDefault();
    history.push(`/seeallvolunteers/${currentPlaceId}`);
  };

  return (
    <div>
      <div className="locationCard" id="popupOfWaste">
        <div className='wasteImg'>
          <img height='200px' width='100%' src={pin?.img?.url} />
        </div>
        <div className='cardContent'>
          <div style={{ padding: "3px" }}>
            <h4 className="place" style={{ fontWeight: "700" }}>{pin.title}</h4>
            <p className="desc" style={{ fontSize: "12px" }}>{pin.desc.substring(0, Math.min(720, pin.desc.length))}</p>
            <span className='createdText'>
              <span className="username" style={{ fontSize: "14px" }}>
                Created by <b>{pin.username}</b>
              </span>
              <span className="date" style={{ color: "gray", marginBottom: "2px", fontSize: "10px" }}>
                {format(pin.createdAt)}
              </span>
            </span>
          </div>
          <div className='cardButtonsDiv'>
            {currentUsername && <form onSubmit={handleVolSubmit}>
              <input type="hidden" name="pin_id" value={pin._id}></input>
              <button
                name="volunteer"
                type="submit"
                className="cardButton"
                style={{ background: `${cardButtonColor}` }}
              >
                {allVolunteerSet.has(currentUsername + "$" + pin._id) === true ? "Cancel Volunteer" : "Be a Volunteer"}
              </button>
            </form>}
            <form onSubmit={handleSeeAllVol}>
              <button
                name="volunteer"
                type="submit"
                className="cardButton"
                style={{ background: `${cardButtonColor}` }}
              >
                See Volunteers
              </button>
            </form>
            {currentUsername === pin.username && (
              <form onSubmit={handleDeleteMarker}>
                <input type="hidden" name="pin_id" value={pin._id}></input>
                <button
                  name="volunteer"
                  type="submit"
                  className="cardButton"
                  style={{ background: `${cardButtonColor}` }}
                >
                  Delete location
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationCard;