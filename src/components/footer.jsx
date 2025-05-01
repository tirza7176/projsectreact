import cardService from "../services/cardServics";
import { useContext, useState, useEffect } from "react";
import { authContext } from "../contexts/AuthContext";
import { Link, Navigate, useNavigate } from "react-router";

function Footer() {
  const { user } = useContext(authContext);
  return (
    <footer className="border-top py-3 text-center d-flex d-flex justify-content-evenly d-flex align-items-center">
      <Link
        to={"/about"}
        className="d-flex flex-column align-items-center text-decoration-none"
      >
        <i className="bi bi-info-circle-fill"></i>
        <span className="mt-1">About</span>
      </Link>
      {user?.isBusiness && (
        <Link
          to={"/mycards"}
          className="d-flex flex-column align-items-center text-decoration-none"
        >
          <i className="bi bi-person-square"></i>
          <span className="mt-1">My-cards</span>
        </Link>
      )}
      {user && (
        <Link
          to={"/favcard"}
          className="d-flex flex-column align-items-center text-decoration-none"
        >
          <i className="bi bi-heart-fill"></i>
          <span className="mt-1">Fav-cards</span>
        </Link>
      )}
    </footer>
  );
}
export default Footer;
