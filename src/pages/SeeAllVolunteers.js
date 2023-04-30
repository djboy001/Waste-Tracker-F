import React, { useState, useEffect } from "react";
import Card from "../components/Card";

const SeeAllVolunteers = (props) => {
  const [flag, setFlag] = useState(true);
  const [allVolunteers, setAllVolunteers] = useState([]);
  const [error, setError] = useState("There are no volunteers at this location");

  useEffect(() => {
    var controller = new AbortController();
    const {signal} = controller;
    async function fetchData() {
      try {
        const url = process.env.REACT_APP_url;
        const response = await fetch(`${url}api/volunteer/${props.match.params.currentPlaceId}`,{signal});
        const data = await response.json();
        controller = null;
        if (data && data.length === 0) {
          setFlag(false);
          setAllVolunteers(data);
        } else {
          setFlag(true);
          setAllVolunteers(data);
        }
      } catch (error) {
        setFlag(false);
        setError("There are no volunteers at this location");
      }
    }
    fetchData();
    return () => controller?.abort();
  }, [props.match.params.currentPlaceId]);

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

