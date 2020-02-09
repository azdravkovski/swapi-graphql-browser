const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const port = 3001;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", true);
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

const SWAPIGraphQL = axios.create({
  baseURL: "https://api.graph.cool/simple/v1/swapi"
});

const GET_PERSONS_DATA = `
{
  allPersons {
    id
    name
    homeworld {
      name
    }
    species {
      name
    }
    films {
      title
    }
  }
}
`;

const extractImgIDFromURL = url => {
  const parts = url.split("/");
  return parts[parts.length - 2];
};

const fetchIDFromPerson = name => {
  axios
    .get(`https://swapi.co/api/people/?search=${name}&format=json`)
    .then(response => extractImgIDFromURL(response.data.results[0].url))
    .catch(error => console.error(error));
};

let body;

const fetchPersons = (query, imgID) => {
  SWAPIGraphQL.post("", { query })
    .then(result => {
      const { allPersons } = result.data.data;
      return (body = allPersons.map(person => {
        const ID = fetchIDFromPerson(person.name);
        console.log(ID);
        return {
          ...person,
          imgID: ID
        };
      }));
    })
    .catch(error => console.error(error));
};

fetchPersons(GET_PERSONS_DATA);

app.get("/persons", (req, res) => res.send(body));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
