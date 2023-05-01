import React from "react";
import Card from "./Card";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function List(props) {
  const Volunteers = props.volunteers;

  return (
    <div>
      <Navbar />
      {Volunteers.map((item) => (
        <Card name={item.username} email={item.email} />
      ))}
      <Footer />
    </div>
  );
}
