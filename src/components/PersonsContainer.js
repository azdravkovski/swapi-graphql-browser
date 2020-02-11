import React, { Component } from "react";
import "./PersonsContainer.css";
import Person from "./Person";
import {axiosPersons} from "../common/apiUtils";

export default class PersonsContainer extends Component {
  state = {
    persons: null
  };

  componentDidMount() {
    this.handlePersonsFetch();
  }

  handlePersonsFetch = () => {
    axiosPersons
      .get("")
      .then(response => {
        this.setState({
          persons: response.data
        });
      })
      .catch(error => console.log(error));
  };

  renderPersons() {
    const { currentFilm, currentSpecies, currentPlanet } = this.props;
    let persons = this.state.persons.map(person => {
      for (const film of person.films) {
        if (film.title === currentFilm) {
          return (
            <Person
              key={person.id}
              name={person.name}
              planet={person.homeworld && person.homeworld.name}
              species={person.species[0] && person.species[0].name}
              imageURL={`https://starwars-visualguide.com/assets/img/characters/${person.imageID}.jpg`}
            />
          );
        }
      }
    });
    return persons;
  }

  render() {
    return (
      <div className="persons-container">
        {this.state.persons === null ? "Waiting..." : this.renderPersons()}
      </div>
    );
  }
}
