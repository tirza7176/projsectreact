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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
