import React from "react";
import { Switch, useHistory } from 'react-router';

export default function Home() {
  const Background = "./earthpic.jpeg"
  const handleOnClick = ()=>{
    window.location.href = `${window.location.origin}/maps/streets-v12`;
  }
  return (
    <div className="HomeClass" style={{
      backgroundImage: `url(${Background})`,
      backgroundPositionY: -500,
    }}>
      <div className="title-container">
        <div className="title">
          <h1>Get well soon dear Earth</h1>
          <p >
            If you can't keep clean your old bedroom you will also destroy the
            new one. Don't look for an alternative of earth. Rather keep it
            clean and habitable. Environment pollution has increased
            significantly. By polluting the environment we are not just
            destroying the earth, we are destroying humanity as well.
          </p>
          <button className="primaryButton letsgoButton" onClick={handleOnClick}>Let's Clean</button>
        </div>
      </div>
    </div>
  );
}
