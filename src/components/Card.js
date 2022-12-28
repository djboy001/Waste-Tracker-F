import React from "react";

function Card(props) { 
  
  const num = parseInt(Math.random()*100)%4;
  console.log(num);

  return (
    <div className="volunteerCardClass">
    <div class="volunteerCard">
      <img src={`/profile_picture${num}.jpg`} className="volunteerProfileImg" />
      <h4 className="volunteerCardName">{props.username}</h4>
      <p class="volunteerCardEmail">{props.email}</p>
      <a href={`mailto:${props.email}`} className="contactButtonWrapper"><button className="primaryButton">Contact</button></a>
    </div>
    </div>
  );
}

export default Card;

