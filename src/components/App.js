import React, { useState, useEffect } from "react";
import Recipelist from "./Recipelist";
import uuidv4 from "uuid/v4";
import "../css/app.css";
import RecipeEdit from "./RecipeEdit";

/* First line- Use to declare variable name for the context and using it down 
   Second line- Providing a key for the local storage that we will refrence further*/
export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = "CookingwithReact.recipe";

const App = () => {
  const [recipes, setRecipes] = useState(recipearray); //The value inside useState() signifies initial values
  const [selectedRecipeId, setSelectedRecipe] = useState();

  /* Useeffect hook for loading the values from localstorage with that specific key and then
  displaying it in the react app using setRecipes function*/

  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  );

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON));
  }, []);

  /* Useeffect hook for updating the values in the local storage whenever something changes and then
  displaying it in the react app using setRecipes function*/

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  /*Context used for passing down props to the children without passing unncessary props to the 
  children and only those who we really need*/
  const RecipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
  };

  function handleRecipeChange(id, recipe) {
    const newRecipe = [...recipes];
    const index = newRecipe.findIndex((r) => r.id === id);
    newRecipe[index] = recipe;
    setRecipes(newRecipe);
  }

  function handleRecipeSelect(id) {
    setSelectedRecipe(id);
  }

  /* function to handle the button click of adding new recipe by providing a hardcoded value for now and
  then passing down to the useState function to update the current recipes array*/
  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: "New dish",
      serving: 3,
      cooktime: "01:00",
      instructions: "1. Just DO",
      ingredients: [
        {
          id: uuidv4(),
          name: "Bon ",
          amount: "2 pound",
        },
      ],
    };
    /*Spread operator to add new recipe to the current recipe array*/
    setSelectedRecipe(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeDelete(id) {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  }

  return (
    /**Use of ReactContext API to actually pass down the props */
    <RecipeContext.Provider value={RecipeContextValue}>
      <Recipelist recipe={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  );
};

const recipearray = [
  {
    id: 1,
    name: "Plain Chicken",
    serving: 3,
    cooktime: "01:45",
    instructions: "1. Chicken Oven\n 2. Chicken Done \n3. Serve",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "2 pounds",
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 tbps",
      },
    ],
  },
  {
    id: 2,
    name: "Plain burger",
    serving: 5,
    cooktime: "00:45",
    instructions: "1. Burgen Prep\n 2. Burger Done\n 3. Serve",
    ingredients: [
      {
        id: 1,
        name: "Pork",
        amount: "2 pounds",
      },
      {
        id: 2,
        name: "Burger Buns",
        amount: "4 slices",
      },
    ],
  },
];

export default App;
