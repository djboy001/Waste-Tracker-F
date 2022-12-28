import React from "react";
import { useState } from "react";
import Card from "./Card";
import Footer from "./Footer";
import Header from "./Header";

export default function List(props) {
  const Volunteers = props.volunteers;

  return (
    <div>
      <Header />
      {Volunteers.map((item) => (
        <Card name={item.username} email={item.email} />
      ))}
      <Footer />
    </div>
  );
}
