import React, { Component } from "react";
import "./MainContainer.css";
import axios from "axios";
import PersonsContainer from "./PersonsContainer";
import { extractStrings, populateFilter } from "../common/dataUtils";

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

  handleChange = (field, event) => {
    this.setState(
      {
        [field]: event.target.value
      },
      () => {
        console.log(this.state);
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
