import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Categories = () => {
  const { mealid } = useParams();
  const [info, setInfo] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const recipe = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`
        );
        const jsonRecipe = await recipe.json();
        setInfo(jsonRecipe.meals[0]);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    if (mealid) {
      getRecipe();
    }
  }, [mealid]);

  if (!info) return <p>Loading...</p>;
  const videoId = info.strYoutube?.split("v=")[1];

  return (
    <div className="recipe-container">
      <img src={info.strMealThumb} alt={info.strMeal} />
      <div className="recipe-details">
        <h1>Recipe Detail</h1>

        <button onClick={() => setShowVideo((prev) => !prev)}>
          {showVideo ? "Hide Video" : `Watch ${info.strMeal} Video`}
        </button>

        {showVideo && videoId && (
          <div className="video-wrapper">
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube Recipe Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div>
          <h3 className="myHead">Ingredients</h3>
          {Array.from({ length: 20 }, (_, i) => {
            const ingredient = info[`strIngredient${i + 1}`];
            const measure = info[`strMeasure${i + 1}`];

            return ingredient?.trim() ? (
              <h4 key={i}>
              {i+1} : {ingredient} : {measure}
              </h4>
            ) : null;
          })}
        </div>
        <h3 className="myHead">Instructions</h3>
        <p>{info.strInstructions}</p>
      </div>
    </div>
  );
};

export default Categories;
