// Header.js
import React from "react";
import { Link } from "react-router-dom";
import { StyledHeader, StyledNav } from "./HeaderStyles";

const Header = () => {
  return (
    <StyledHeader>
      <h1>NFT Marketplace</h1>
      <StyledNav>
        <ul>
          <li>
            <Link to="/buy-tickets">Buy Tickets</Link>
          </li>
          <li>
            <Link to="/sell-tickets">Sell Tickets</Link>
          </li>
          <li>
            <Link to="/my-tickets">My Tickets</Link>
          </li>
        </ul>
      </StyledNav>
    </StyledHeader>
  );
};

export default Header;
