import "./App.css";
import Homepage from "./Component/Homepage";
import { Route, Routes } from "react-router-dom";
import Categories from "./Component/Categories";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/:mealid" element={<Categories />} />
    </Routes>
  );
}

export default App;
