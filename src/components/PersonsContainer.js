import React, { Component } from "react";
import axios from "axios";
import "./PersonsContainer.css";
import Person from "./Person";

const axiosPersons = axios.create({
  baseURL: "http://localhost:3001/persons"
});

export default class PersonsContainer extends Component {
  state = {
    persons: null
  };

  componentDidMount() {
    this.handlePersonsFetch();
  }

  componentDidUpdate() {
    console.log(this.state.persons);
  }

  handlePersonsFetch = () => {
    axiosPersons
      .get("")
      .then(response => {
        let { allPersons } = response.data.data;
        this.setState({
          persons: allPersons
        });
      })
      .catch(error => console.log(error));
  };

  renderPersons() {
    let persons = this.state.persons.map(person => (
      <Person
        name={person.name}
        planet={person.homeworld}
        species={person.species[0].name}
      />
    ));
    return persons;
  }

  render() {
    return <div className="persons-container">{this.renderPersons()}</div>;
  }
}