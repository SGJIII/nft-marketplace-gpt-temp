1. Purpose: What is the main goal or function of your app? What problem does it aim to solve?
   1. I want to build an NFT marketplace but I want people to use the NFTs as tickets to get into concerts.
2. Target audience: Who is your app intended for? What demographic or user group are you targeting?
   1. As it is a marketplace the primary audience segment is two-fold. 1 wants to buy NFTs to then use those NFTs to get into concerts, and also potentially re-sell those NFTs. The other wants to sell mint and sell many of the same NFTs which will grant people access to their concert.
3. Features: What are the key features you want to include in your app? Are there any specific functionalities you want to focus on?
   1. The first main feature will be the NFT marketplace. Both sides of the marketplace can log in and store their NFTs using the Magic Wallet sdk.
   2. Users need be able to search, browse, and re-sell NFTs.
   3. Users need to be able to mint NFTs and dictate the number of NFTs they want to mint as well as the price.
   4. Use the polygon blockchain.
   5. Users need to buy and sell NFTs
   6. The app needs to be ran and tested locally
4. Platforms: On which platforms do you want to develop your app? (e.g., iOS, Android, web)
   1. Web
5. Monetization: How do you plan to monetize your app, if at all? (e.g., ads, in-app purchases, subscriptions)
   1. Transaction fees

# BlockParty

Blockparty is a ticketing app that functions very similarly to an NFT marketplace

## Sell Tickets
Users should be able to log in with their magic wallet, and be able to mint tickets as NFTs. They can name the tickets, set the price, set the amount of royalties they receive on resale, and add an image. They'll then set a number of tickets they want to mint which will share the name, price, royalities, and image attribute. Each ticket will have a unique QR code so each ticket can be scanned. The user should be promted to add USDC on the Polygon network to cover the gas for minting their tickets. Once the tickets are minted they should be located in the users Magic sdk wallet and should be visible in the My Tickets page. 

## Buy tickets 
All tickets should be listed on the Buy Tickets page. There should be an example of each ticket collection shown on the buy ticket page in a grid format with the number of tickets available and the price range (in the case of re-sales). When a user clicks the specific ticket, they should see how many are available. The URL will be BuyTickets/[ticketcollectionname]. On this page the user can select how many tickets they want to purchase and should be able to check out with USDC on the polygon network. 

## My Tickets
The my tickets page should also show the collections each person has in their magic wallet. When they click on that selection, they should see the individual tickets they own, and the option to re-sell the tickets and select the price. 
