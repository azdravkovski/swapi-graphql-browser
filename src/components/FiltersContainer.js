import React, { Component } from "react";
import "./FiltersContainer.css";
import axios from "axios";

const axiosSWAPIGraphQL = axios.create({
  baseURL: "https://api.graph.cool/simple/v1/swapi"
});

const GET_INITAL_DATA = `
{
    allFilms {
        title
      }
    allSpecies {
        name
      }
    allPlanets {
        name
    }
  }
`;

export default class FiltersContainer extends Component {
  state = {
    films: null,
    species: null,
    planets: null
  };

  componentDidMount() {
    this.onFetchFromSWAPI();
  }

  extractStrings = input => {
    return input.map(element => Object.values(element)).flat();
  };

  populateFilter = input => {
    if (input) {
      return input.map((element, index) => (
        <option key={index}>{element}</option>
      ));
    }
  };

  onFetchFromSWAPI = () => {
    axiosSWAPIGraphQL
      .post("", { query: GET_INITAL_DATA })
      .then(response => {
        this.setState({
          films: this.extractStrings(response.data.data.allFilms),
          species: this.extractStrings(response.data.data.allSpecies),
          planets: this.extractStrings(response.data.data.allPlanets)
        });
        console.log(this.state);
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className="filters-container">
        <select name="films" id="films">
          <option>Choose a film...</option>
          {this.populateFilter(this.state.films)}
        </select>
        <select name="species" id="species">
          <option>Choose a species...</option>
          {this.populateFilter(this.state.species)}
        </select>
        <select name="planets" id="planets">
          <option>Choose a planet...</option>
          {this.populateFilter(this.state.planets)}
        </select>
      </div>
    );
  }
}
