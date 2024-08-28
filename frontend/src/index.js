// import * as React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ReactDOM from "react-dom/client";

// import Home from './Home'
// import Diary from "./Diary";
// import CustomMeals from "./CustomMeals";
// import CustomFoods from "./CustomFoods";
// import Register from "./Register";
// import Login from "./Login";
// import Account from "./Account";
// import Profile from "./Profile";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Register />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/account" element={<Account />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="diary" element={<Diary />} />
//         <Route path="custom-meals" element={<CustomMeals />} />
//         <Route path="custom-foods" element={<CustomFoods />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";

import Diary from "./Diary";
import CustomRecipe from "./CustomRecipe";
import CustomFoods from "./CustomFoods";
import Register from "./Register";
import Login from "./Login";
import Account from "./Account";
import Profile from "./Profile";
import Home from "./Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="diary" element={<Diary />} />
        <Route path="custom-recipe" element={<CustomRecipe />} />
        <Route path="custom-foods" element={<CustomFoods />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);