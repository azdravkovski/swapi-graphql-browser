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


const axiosSWAPIGraphQL = axios.create({
  baseURL: "https://api.graph.cool/simple/v1/swapi"
});

const GET_PERSONS_DATA = `
{
  allPersons {
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
let body;

function fetchPersons() {
  axiosSWAPIGraphQL
    .post("", { query: GET_PERSONS_DATA })
    .then(result => {
      body = result.data;
      console.log(body);
    })
    .catch(error => console.error(error));
}

fetchPersons();


app.get("/persons", (req, res) => res.send(body));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
