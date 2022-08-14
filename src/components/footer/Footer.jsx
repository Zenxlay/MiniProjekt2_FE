import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top">
        <h1>Neetflix Review</h1>
        <ul>
          <Link className="footer-menu" to="/">
            <li>Home</li>
          </Link>
          <Link className="footer-menu" to="/tvseries">
            <li>Tv Series</li>
          </Link>
          <Link className="footer-menu" to="/animation">
            <li>Animation</li>
          </Link>
          <Link className="footer-menu" to="/mylist">
            <li>My List</li>
          </Link>
          <Link className="footer-menu" to="/help">
            <li>Help</li>
          </Link>
          <Link className="footer-menu" to="/reviewed">
            <li>Reviewed</li>
          </Link>
        </ul>
      </div>
      <hr />
      <div className="footer-bottom">
        <p>
          © 2022 <span>Neetflix</span>. All rights reserved
        </p>
        <ul>
          <li>
            <AiOutlineInstagram className="footer-icon" />
          </li>
          <li>
            <AiOutlineFacebook className="footer-icon" />
          </li>
          <li>
            <AiOutlineTwitter className="footer-icon" />
          </li>
          <li>
            <AiOutlineYoutube className="footer-icon" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
