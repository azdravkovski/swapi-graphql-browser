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

const axiosPersons = axios.create({
  baseURL: "http://localhost:3001/persons"
});


export { axiosSWAPIGraphQL, GET_INITIAL_DATA, axiosPersons };
