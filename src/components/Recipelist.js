import React, { useContext } from "react";
import Recipe from "./Recipe";
import "../css/app.css";
import { RecipeContext } from "./App";

const Recipelist = ({ recipe }) => {
  const { handleRecipeAdd } = useContext(RecipeContext);
  return (
    <div className="recipe-list">
      {recipe.map((dynamic) => {
        return <Recipe key={dynamic.id} {...dynamic} />;
      })}
      <div className="recipe-list__add-recipe-btn-container">
        <button className="btn btn--primary" onClick={handleRecipeAdd}>
          Add Recipe
        </button>
      </div>
    </div>
  );
};

export default Recipelist;
