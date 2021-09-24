import React, { useContext } from "react";
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import "../css/app.css";
import { RecipeContext } from "./App";
import uuidv4 from "uuid/v4";

const RecipeEdit = ({ recipe }) => {
  const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext);

  function handleChange(changes) {
    handleRecipeChange(recipe.id, { ...recipe, ...changes });
  }

  function handleIngredientChange(id, ingredient) {
    const newIngredient = [...recipe.ingredients];
    const index = newIngredient.findIndex((i) => i.id === id);
    newIngredient[index] = ingredient;
    handleChange({ ingredients: newIngredient });
  }

  function handleIngredientAdd() {
    const newIngredient = {
      id: uuidv4(),
      name: "",
      amount: "",
    };
    handleChange({ ingredients: [...recipe.ingredients, newIngredient] });
  }

  function handleIngredientDelete(id) {
    handleChange({
      ingredients: recipe.ingredients.filter((i) => i.id !== id),
    });
  }

  return (
    <div className="recipe-edit">
      <div className="recipe-edit__remove-button-container">
        <button
          className="btn recipe-edit__remove-button"
          onClick={() => handleRecipeSelect(undefined)}
        >
          &times;
        </button>
      </div>
      <div className="recipe-edit__details-grid">
        <label htmlFor="name" className="recipe-edit__label">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="recipe-edit__input"
          onInput={(e) => handleChange({ name: e.target.value })}
          value={recipe.name}
        />
        <label htmlFor="cookTime" className="recipe-edit__label">
          Cook Time
        </label>
        <input
          type="text"
          name="cookTime"
          id="cookTime"
          className="recipe-edit__input"
          onInput={(e) => handleChange({ cooktime: e.target.value })}
          value={recipe.cooktime}
        />
        <label htmlFor="servings" className="recipe-edit__label">
          Servings
        </label>
        <input
          type="number"
          min="1"
          name="servings"
          id="servings"
          className="recipe-edit__input"
          onInput={(e) => handleChange({ serving: e.target.value })}
          value={recipe.serving}
        />
        <label htmlFor="instructions" className="recipe-edit__label">
          Instructions
        </label>
        <textarea
          name="instructions"
          className="recipe-edit__input"
          id="instructions"
          onInput={(e) => handleChange({ instructions: e.target.value })}
        />
      </div>
      <br />
      <label className="recipe-edit__label">Ingredients</label>
      <div className="recipe-edit__ingredient-grid">
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {recipe.ingredients.map((ingredient) => (
          <RecipeIngredientEdit
            handleIngredientChange={handleIngredientChange}
            handleIngredientDelete={handleIngredientDelete}
            id={ingredient.id}
            ingred={ingredient}
          />
        ))}
      </div>
      <div className="recipe-edit__add-ingredient-btn-container">
        <button
          className="btn btn--primary"
          onClick={() => handleIngredientAdd()}
        >
          Add Ingredient
        </button>
      </div>
    </div>
  );
};

export default RecipeEdit;
