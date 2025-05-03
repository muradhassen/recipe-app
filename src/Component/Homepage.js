import React, { useState } from "react";
import MealList from "./MealList";

const Homepage = () => {
    const [data, setData] = useState() ;
    const [search, setSearch] = useState();
    const [msg ,setMsg] = useState("") ;
    const handleInput =(evet)=>{
            setSearch(evet.target.value);
    }
   const myApi = async () => {
     if (!search || search.trim() === "") {
       setMsg("Please enter a recipe name");
       setData(null); // clear previous results
       return;
     }

     try {
       const res = await fetch(
         `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
       );
       const json = await res.json();

       if (json.meals) {
         setData(json.meals);
         setMsg("");
       } else {
         setData(null);
         setMsg("No recipe found");
       }
     } catch (err) {
       setMsg("Error fetching data. Please try again.");
       setData(null);
     }
   };
  return (
    <>
      <div className="topClass">
        <div className="container">
          <div className="searchBar">
            <input
              type="text"
              placeholder="recipe name"
              className="item"
              onChange={handleInput}
            />
            <button onClick={myApi} className="searchButton">
              Search
            </button>
          </div>
        </div>
        <h3 className=" head">{msg}</h3>
        <div>
          <MealList deatil={data} />
        </div>
      </div>
    </>
  );
};

export default Homepage;
