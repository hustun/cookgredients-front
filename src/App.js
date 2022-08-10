import { Routes, Route, Outlet, BrowserRouter } from "react-router-dom";
import IngredientSearch from "./components/IngredientSearch/IngredientSearch";
import SelectSearch from "./components/SelectSearch";
import RecipeSearch from "./components/RecipeSearch";
import IngredientResult from "./components/IngredientResult";
import RecipeResult from "./components/RecipeResult";
import RecipeDisplay from "./components/RecipeDisplay";

import styles from './Styles.module.scss';
import './App.scss';

function App() {
  return (
    <div className={`h-screen w-screen ${styles.neutralBackground75} ${styles.neutralBackgroundDark75}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/searchbyrecipename" element={<RecipeSearch />} />
          <Route path="/searchbyingredientname" element={<IngredientSearch />} />
          <Route path="/search" element={<SelectSearch />} />
          <Route path="/resultbyingredients" element={<IngredientResult />} />
          <Route path="/resultbyrecipename" element={<RecipeResult />} />
          <Route path="/recipe/:recipeId" element={<RecipeDisplay />} />
          <Route path="/" element={<IngredientSearch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
