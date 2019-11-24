import React from 'react';
import FiltersContainer from './components/FiltersContainer';
import PersonsContainer from './components/PersonsContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Star Wars Browser</h1>
      <FiltersContainer />
      <PersonsContainer />
    </div>
  );
}

export default App;
