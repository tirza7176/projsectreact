import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/home";
import About from "./pages/about";
import Footer from "./components/footer";
import NavBar from "./components/navbar";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import SignOut from "./pages/signout";
import Mycards from "./pages/mycards";
import CreateCard from "./pages/createCard";
import FavCards from "./pages/favcard";
function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <header>
        <NavBar />
      </header>
      <main className="bg-success-subtle flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/mycards" element={<Mycards />} />
          <Route path="/addnewcard" element={<CreateCard />} />
          <Route path="/favcard" element={<FavCards />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
