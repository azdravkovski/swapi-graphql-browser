import React from "react";

export default function Person(props) {
  return (
    <div className="person">
    <img alt="Star Wars Character"></img>
    <p className="person-name">{props.name}</p>
    <p className="person-planet">{props.planet}</p>
    <p className="person-species">{props.species}</p>
  </div>
  )
}