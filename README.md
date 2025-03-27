# Blooket Bot (Hobby Project)

## Overview  
This project is a simple bot designed to join Blooket games automatically. It handles game authentication, connects to Firebase, and updates the game state in real time. The bot simulates a player joining a game and interacting with the Firebase database.

## Current Status  
🚨 **This bot is currently non-functional.** The main Firebase connection is missing in the `fetch` command, preventing it from retrieving the necessary authentication token to join games.

## How It Works  
- Sends a request to join a Blooket game using a game ID and player name.  
- Connects to Firebase using a provided authentication token.  
- Updates the game state in Firebase to reflect the bot’s presence.  
- Listens for real-time updates to game data.

## Future Development  
This is a **hobby project** and likely **won't be actively developed further**. However, anyone interested in understanding how Blooket's game connection works can explore and build upon it.

---
💡 *This project is for educational purposes only. Use responsibly!*  
