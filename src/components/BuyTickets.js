// src/components/BuyTickets.js
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import concertTicketAbi from "../../artifacts/contracts/ConcertTicket.sol/ConcertTicket.json";

const BuyTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    // Add your ConcertTicket contract address here
    const concertTicketAddress = "0x32e92368045c116e36A4E03714236E09e111c632";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      concertTicketAddress,
      concertTicketAbi.abi,
      provider
    );
    const nextTokenId = await contract.getNextTokenId();

    // Add your logic to fetch a sample of unique tickets for sale
    const uniqueNames = new Set();
    const fetchedTickets = [];
    let tokenId = 0;

    // Fetch unique tickets until you have a desired number of them
    while (uniqueNames.size < 10 && tokenId < nextTokenId) {
      try {
        const name = await contract.ticketNames(tokenId);
        const price = await contract.ticketPrices(tokenId);
        if (!uniqueNames.has(name)) {
          uniqueNames.add(name);
          fetchedTickets.push({ id: tokenId, name, price });
        }
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
      tokenId++;
    }
    setTickets(fetchedTickets);
  };

  return (
    <div>
      <h2>Buy Tickets</h2>
      {tickets.map((ticket) => (
        <div key={ticket.id}>
          <Link to={`/checkout/${ticket.id}`}>
            <h3>{ticket.name}</h3>
          </Link>
          <p>Price: ${ticket.price.toString()}</p>
        </div>
      ))}
    </div>
  );
};

export default BuyTickets;
