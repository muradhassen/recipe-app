import React from "react";
import { NavLink } from "react-router-dom";

const MealList = ({ deatil }) => {
  console.log(deatil);

 return (
   <div className="recipeList">
     {deatil &&
       deatil.map((cItem, index) => (
         <div className="meal-item" key={index}>
           <div className="fontLine"></div>
           <img src={cItem.strMealThumb} alt={cItem.strMeal} />
           <p>{cItem.strMeal}</p>
           <NavLink to={`/${cItem.idMeal}`}>
             <button >Recipe</button>
           </NavLink>
         </div>
       ))}
   </div>
 );
};

export default MealList;
