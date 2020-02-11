import React, { Component } from "react";
import "./MainContainer.css";
import PersonsContainer from "../PersonsContainer/PersonsContainer";
import { extractStrings, populateFilter } from "../../common/dataUtils";
import { axiosSWAPIGraphQL, GET_INITIAL_DATA } from "../../common/apiUtils";

export default class MainContainer extends Component {
  state = {
    films: null,
    species: null,
    planets: null,
    currentFilm: null,
    currentSpecies: null,
    currentPlanet: null
  };

  componentDidMount() {
    this.handleInitialFetch();
  }

  //Populate the dropdowns with all available films, species and planets
  handleInitialFetch = () => {
    axiosSWAPIGraphQL
      .post("", { query: GET_INITIAL_DATA })
      .then(response => {
        let { allFilms, allSpecies, allPlanets } = response.data.data;
        this.setState({
          films: extractStrings(allFilms),
          species: extractStrings(allSpecies),
          planets: extractStrings(allPlanets)
        });
      })
      .catch(error => console.log(error));
  };

  //Make call to SWAPI GraphQL API and retrieve data based on currently selected film
  handleFilterByFilm = () => {
    axiosSWAPIGraphQL
      .post("", {
        query: `
      {
          Film(title: "${this.state.currentFilm}") {
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
      .then(response => {
        let { species, planets } = response.data.data.Film;
        this.setState({
          species: extractStrings(species),
          planets: extractStrings(planets)
        });
      })
      .catch(error => console.log(error));
  };

  //Handler that sets current film, species and planet based on selected option in dropdown
  handleChange = (field, event) => {
    this.setState(
      {
        [field]: event.target.value
      },
      () => {
        this.handleFilterByFilm()}
    );
  };

  render() {
    let { films, species, planets, currentFilm, currentSpecies, currentPlanet } = this.state;
    return (
      <div className="main-container">
        <div className="filters-container">
          <select
            defaultValue="choose-film"
            name="films"
            id="films"
            onChange={(e) => this.handleChange("currentFilm", e)}
          >
            <option disabled value="choose-film">
              ---Choose a film---
            </option>
            {populateFilter(films)}
          </select>
          <select
            defaultValue="choose-species"
            name="species"
            id="species"
            onChange={(e) => this.handleChange("currentSpecies", e)}
          >
            <option disabled value="choose-species">
              ---Choose a species---
            </option>
            {populateFilter(species)}
          </select>
          <select
            defaultValue="choose-planet"
            name="planets"
            id="planets"
            onChange={(e) => this.handleChange("currentPlanet", e)}
          >
            <option disabled value="choose-planet">
              ---Choose a planet---
            </option>
            {populateFilter(planets)}
          </select>
        </div>
        <PersonsContainer currentFilm={currentFilm} currentSpecies={currentSpecies} currentPlanet={currentPlanet} />
      </div>
    );
  }
}
