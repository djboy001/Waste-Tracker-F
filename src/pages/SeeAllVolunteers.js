import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { useFetchVolunteers } from "../hooks/hooks"

const SeeAllVolunteers = () => {
  const [flag, setFlag] = useState(true);
  const [allVolunteers, setAllVolunteers] = useState([]);
  const [error, setError] = useState("There are no volunteers at this location");

  useFetchVolunteers({ setError, setFlag, setAllVolunteers });
  
  const renderCard = () => {
    return (
      flag ? 
        allVolunteers.map((vol, ind) => (
          <Card username={vol.username} email={vol.email} key={ind} />
        )) :
        <div style={{ width: "100%", color: "black", textAlign: "center", marginTop: "40px" }}>
          <h1 style={{ color: "white" }}>{error}</h1>
          {error}
        </div>
    );
  };

  return (
    <div className="seeAllvoluteers">
      <div className="containerCard">{renderCard()}</div>
    </div>
  );
};

export default SeeAllVolunteers;






















// import React, { useEffect, useState } from "react";
// import Card from "../components/Card";

// class SeeAllVolunteers extends React.Component {
//   state = { flag: true, allVolunteers: [], error: "There is no volunteers on this location" };

//   async componentDidMount() {
//     try {
//       const url = process.env.REACT_APP_url;
      
//       const response = await fetch(
//         url+`api/volunteer/${this.props.match.params.currentPlaceId}`
//       );
//       const data = await response.json();
//       if (data && data.length === 0) {
//         this.setState({
//           flag: false,
//           allVolunteers: data,
//           error: "There is no volunteers on this location",
//         });
//       } else {
//         this.setState({
//           flag: true,
//           allVolunteers: data,
//           error: "There is no volunteers on this location",
//         });
//       }
//     } catch (error) {
//       this.setState({ flag: false, error: "There is no volunteers on this location" });
//     }
//   }

//   renderPerson = () => {
//     const { flag, allVolunteers, error } = this.state;

//     if (flag) {
//       return (
//           allVolunteers.map((vol,ind) => (
//             <Card username={vol.username} email={vol.email} key={ind} />
//           ))
//         );
//     } else if (flag === false) {
//       console.log("Errors : ", error);
//       return <div style={{width:"100%", color:"black", textAlign:"center", marginTop:"40px"}}><h1 style={{color:"white"}}>{error}</h1>{error}</div>
//     }
//   };

//   render() {
//     return (
//       <div className="seeAllvoluteers">
//         <div className="containerCard">
//             {this.renderPerson()}
//         </div>
//       </div>
//     );
//   }
// }

// export default SeeAllVolunteers;

