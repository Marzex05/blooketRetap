# Blooket Bot (Hobby Project)
**IMPORTANT!** This code is created by scraping code off of another source, and any publically avaliable API keys are NOT mine. 


## Overview  
This project is a simple bot designed to join Blooket games automatically. It is meant to handle game authentication, connects to Firebase (Firebase endpoint remains unresolved), and (supposed to) update the game state in real time. The bot simulates a player joining a game and interacting with the Firebase database.

## Current Status  
🚨 **This script is currently non-functional.** The main Firebase connection is missing in the `fetch` command, preventing it from retrieving the necessary authentication token to join games. It is commented in the code, but can also be found on **line 20** of `joinScript.js` if no more commits are made.
 
⚠️ **This script has CORS issues**, which will not be resolved unless you use a `no-cors` parameter for `fetch` or run this in a related Blooket page. <-- This issue is not the one causing the dysfunctionality with with the Firebase script for Blooket authentication. (Check comment on line 20 of `joinScript.js`)

## How It Works  
- Sends a request to join a Blooket game using a game ID and player name.  
- Connects to Firebase using a provided authentication token.  
- Updates the game state in Firebase to reflect the bot’s presence.  
- Listens for real-time updates to game data.

## Future Development  
This is a **hobby project** and likely **won't be actively developed further**. However, anyone interested in understanding how Blooket's game connection works can explore and build upon it. If you have any personal questions, suggestions, or alterations you want to add, feel free to create a pull request or issue and I'll get to them ASAP.

---
💡 *This project is for educational purposes only. Use responsibly!*  
