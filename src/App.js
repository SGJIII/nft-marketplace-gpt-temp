// src/App.js

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./AuthContext";
import Header from "./components/Header";
import Login from "./components/Login";
import BuyTickets from "./components/BuyTickets";
import SellTickets from "./components/SellTickets";
import MyTickets from "./components/MyTickets";

function App() {
  const { loggedIn } = useAuth();

  return (
    <Router>
      {loggedIn && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? <Navigate to="/buy-tickets" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={loggedIn ? <Navigate to="/buy-tickets" /> : <Login />}
        />
        <Route
          path="/buy-tickets"
          element={loggedIn ? <BuyTickets /> : <Navigate to="/login" />}
        />
        <Route
          path="/sell-tickets"
          element={loggedIn ? <SellTickets /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-tickets"
          element={loggedIn ? <MyTickets /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
