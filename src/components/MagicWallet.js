// src/components/MagicWallet.js

import React, { useState } from "react";
import { Magic } from "magic-sdk";

const MagicWallet = ({ onSuccess }) => {
  const [email, setEmail] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const magic = new Magic("pk_live_8C45E932620CBB0C");

    try {
      await magic.auth.loginWithMagicLink({ email });
      onSuccess();
    } catch (error) {
      console.error("Magic Wallet sign-up failed:", error);
    }
  };

  return (
    <div>
      <h2>Magic Wallet Sign-Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Sign Up with Magic Wallet</button>
      </form>
    </div>
  );
};

export default MagicWallet;
