import React, { Component } from "react";
import "./FiltersContainer.css";
import axios from "axios";

const axiosSWAPIGraphQL = axios.create({
  baseURL: "https://api.graph.cool/simple/v1/swapi"
});

const GET_INITIAL_DATA = `
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
    planets: null,
    currFilm: null
  };

  componentDidMount() {
    this.handleInitialFetch();
  }

  extractStrings = input => {
    return input.map(element => Object.values(element)).flat();
  };

  populateFilter = input => {
    if (input) {
      return input.map((element, index) => (
        <option key={index} value={element}>{element}</option>
      ));
    }
  };

  handleInitialFetch = () => {
    axiosSWAPIGraphQL
      .post("", { query: GET_INITIAL_DATA })
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

  handleFilterByFilm = () => {
    this.logOption();
    axiosSWAPIGraphQL
      .post("", {
        query: `
      {
          Film(title: "${this.state.currFilm}") {
            species {
              name
            }
            planets {
              name
            }
          }
        }
      `
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  logOption = () => {
    this.setState(
      {
        currFilm: this.refs.films.value
      },
      () => console.log(this.state.currFilm)
    );
  };

  render() {
    return (
      <div className="filters-container">
        <select defaultValue="choose-film" ref="films" name="films" id="films" onChange={this.handleFilterByFilm}>
          <option disabled value="choose-film">---Choose a film---</option>
          {this.populateFilter(this.state.films)}
        </select>
        <select defaultValue="choose-species" name="species" id="species">
          <option disabled value="choose-species">---Choose a species---</option>
          {this.populateFilter(this.state.species)}
        </select>
        <select defaultValue="choose-planet" name="planets" id="planets">
          <option disabled value="choose-planet">---Choose a planet---</option>
          {this.populateFilter(this.state.planets)}
        </select>
      </div>
    );
  }
}
