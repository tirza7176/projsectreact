import { Link, NavLink } from "react-router";
import Logo from "../components/logo";
import { useAuth } from "../contexts/AuthContext";

import { useSearch } from "../contexts/searchprovider";
import { useEffect, useState } from "react";

function Navbar() {
  const { user } = useAuth();
  const { inputSearch, setInputsearch } = useSearch();

  const [theme, setTheme] = useState(false);
  useEffect(() => {
    const mode = theme ? "dark" : "light";
    document.documentElement.setAttribute("data-bs-theme", mode);
  }, [theme]);

  function handleToggle() {
    if (!theme) {
      setTheme(true);
    } else {
      setTheme(false);
    }
  }

  return (
    <nav
      className="navbar navbar-expand-md navbar bg-primary bg-opacity-75 shadow-sm "
      aria-label="Fourth navbar example"
    >
      <div className="container">
        <Link className="navbar-brand text-white fw-bold fs-3" to="/">
          <Logo />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/about">
                About
              </NavLink>
            </li>
            {user && (
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/favcard">
                  Fav cards
                </NavLink>
              </li>
            )}

            {user?.isBusiness && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/mycards">
                    My cards
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/addnewcard">
                    Add new card
                  </NavLink>
                </li>
              </>
            )}
            {user?.isAdmin && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/sand-box">
                    Sand box
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="input-group w-25">
            <input
              type="text"
              className="form-control"
              placeholder="search"
              aria-label="search"
              value={inputSearch}
              onChange={(e) => setInputsearch(e.target.value)}
            ></input>
          </div>
          <button className="ms-2 btn btn-link-dark" onClick={handleToggle}>
            {theme ? (
              <i className="bi bi-brightness-high"></i>
            ) : (
              <i className="bi bi-moon-fill"></i>
            )}
          </button>
          <ul className="navbar-nav ms-auto mb-2 mb-md-0">
            {user ? (
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/signout">
                  logout
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/signup">
                    Sign up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/signin">
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
