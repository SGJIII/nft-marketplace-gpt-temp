// src/components/SellTickets.js
import React, { useState } from "react";
import QRCode from "react-qr-code";
import "./SellTickets.css";
import { Magic } from "magic-sdk";
import { Contract } from "ethers";
import concertTicketAbi from "../../artifacts/contracts/ConcertTicket.sol/ConcertTicket.json";

const SellTickets = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [royalties, setRoyalties] = useState("");
  const [numOfTickets, setNumOfTickets] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [ticketCount, setTicketCount] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (royalties > 10) {
      setError("Royalties must be 10% or less.");
    } else {
      setError(null);

      // Magic API key and contract address
      const magicApiKey = "pk_live_8C45E932620CBB0C";
      const concertTicketAddress = "0x32e92368045c116e36A4E03714236E09e111c632";
      const magic = new Magic(magicApiKey);

      try {
        // Login and get Ethereum provider
        const user = await magic.auth.loginWithMagicLink({
          email: "your@email.com",
        });
        const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
        const signer = provider.getSigner();

        // Create a contract instance
        const contract = new Contract(
          concertTicketAddress,
          concertTicketAbi.abi,
          signer
        );

        // Call the mintTickets function from the smart contract
        const mintTicketsTx = await contract.mintTickets(
          name,
          price,
          royalties,
          numOfTickets
        );
        await mintTicketsTx.wait();

        const mintedTicketIds = Array.from(
          { length: numOfTickets },
          (_, index) => ticketCount + index + 1
        );
        localStorage.setItem(
          "mintedTicketIds",
          JSON.stringify(mintedTicketIds)
        );

        console.log("Tickets minted");
        setTicketCount(ticketCount + parseInt(numOfTickets));
        setSuccessMessage(
          `Congratulations, your ${numOfTickets} tickets are now for sale.`
        );
      } catch (error) {
        console.error("Error minting tickets:", error);
      }
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div>
      <h2>Sell Tickets</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="price">Price ($):</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <label htmlFor="royalties">Royalties (%):</label>
        <input
          type="number"
          id="royalties"
          value={royalties}
          onChange={(e) => setRoyalties(e.target.value)}
          min="0"
          max="10"
          step="0.01"
        />
        <br />
        <label htmlFor="numOfTickets">Number of Tickets:</label>
        <input
          type="number"
          id="numOfTickets"
          value={numOfTickets}
          onChange={(e) => setNumOfTickets(e.target.value)}
        />
        <br />
        <label htmlFor="image">Image:</label>
        <input type="file" id="image" onChange={handleImageChange} />
        <br />

        {preview && (
          <div
            className="preview-container"
            style={{ backgroundImage: `url(${preview})` }}
          >
            <div className="qr-container">
              <div className="preview-qr">
                <QRCode value={`Ticket ${name} - ${ticketCount + 1}`} />
              </div>
            </div>
          </div>
        )}

        <br />
        {error && <p className="error">{error}</p>}
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default SellTickets;
