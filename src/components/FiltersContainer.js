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
  }

  populateFilter = input => {
    if (input) {
      return input.map((element, index) => (
        <option key={index} value={element}>{element}</option>
      ));
    }
  }

  handleInitialFetch = () => {
    axiosSWAPIGraphQL
      .post("", { query: GET_INITIAL_DATA })
      .then(response => {
        let {allFilms, allSpecies, allPlanets} = response.data.data;
        this.setState({
          films: this.extractStrings(allFilms),
          species: this.extractStrings(allSpecies),
          planets: this.extractStrings(allPlanets)
        });
      })
      .catch(error => console.log(error));
  }

  handleFilterByFilm = () => {
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
      .then(response => {
        let {species, planets} = response.data.data.Film;
        this.setState({
          species: this.extractStrings(species),
          planets: this.extractStrings(planets)
        })
      })
      .catch(error => console.log(error));
  }

  filterByFilm = () => {
    this.setState(
      {
        currFilm: this.refs.films.value
      },
      () => this.handleFilterByFilm()
    );
  }

  render() {
    let {films, species, planets} = this.state;
    return (
      <div className="filters-container">
        <select defaultValue="choose-film" ref="films" name="films" id="films" onChange={this.filterByFilm}>
          <option disabled value="choose-film">---Choose a film---</option>
          {this.populateFilter(films)}
        </select>
        <select defaultValue="choose-species" name="species" id="species">
          <option disabled value="choose-species">---Choose a species---</option>
          {this.populateFilter(species)}
        </select>
        <select defaultValue="choose-planet" name="planets" id="planets">
          <option disabled value="choose-planet">---Choose a planet---</option>
          {this.populateFilter(planets)}
        </select>
      </div>
    );
  }
}
