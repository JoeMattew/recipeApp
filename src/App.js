
import './App.css';
import Axios from "axios";
import { useState } from 'react';
import RecipeTile from './RecipeTile';

function App() {
  const [query, setquery] = useState("");
  const [recipes, setrecipes] = useState([]);
  const [healthLabels, sethealthLabels] = useState("vegan");

  const YOUR_APP_ID = "b61bff56";
  const YOUR_APP_KEY = "56a9628483e6fbf6f6c01a95ef9b8c1b";

  var url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabels}`;

  async function getRecipes() {
    var result = await Axios.get(url);
    setrecipes(result.data.hits);
    console.log(result.data);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  };
 
  return (
    <div className="app">
      <h1 className='app__headertext'>Food Recipe Administry </h1>
      <form className="app__searchForm" onSubmit={onSubmit}>
        <input className="app__input" type="text" placeholder="enter ingridient"
        value={query} onChange={(e) => setquery(e.target.value)} />
        <input className='app__submit' type="submit" value="Search" />

        <select className="app__healthLabels" value={healthLabels} onChange={(e) => sethealthLabels(e.target.value)}>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="wheat-free">Wheat-free</option>
          <option value="alcohol-free">Alcohol-free</option>
          <option value="dairy-free">Dairy-free</option>
          <option value="fish-free">Fish-free</option>
          <option value="egg-free">Egg-free</option>
          <option value="keto-friendly">Keto-friendly</option>
          <option value="kidney-friendly">Kidney-friendly</option>
          <option value="kosher">Kosher</option>
          <option value="low-sugar">Low-sugar</option>
          <option value="pork-free">Pork-free</option>
          <option value="soy-free	">Soy-free</option>          
        </select>
      </form>

      <div className="app__recipes">
      {recipes.map((recipe) => {
          return <RecipeTile recipe={recipe} key={recipe.recipe.uri}/>;
        })}
       
      </div>

    </div>
  );
}

export default App;
