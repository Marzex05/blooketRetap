// Object to store bot's connection status and game info
var botinfo = {};

/**
 * Attempts to join a Blooket game using the provided game code and name.
 * Prevents multiple simultaneous connection attempts.
 * @param {string} code - The Blooket game ID.
 * @param {string} name - The desired name for the bot in the game.
 * @param {boolean} icog - Whether to use a random Blooket avatar.
 */
function joinGame(code, name, icog = false) {
  if (botinfo.connecting) {
    console.log("Connecting to game, please wait...");
    return; // Prevent multiple connection attempts
  }

  oname = name; // Store the provided name (not used elsewhere)
  connect(code, name, icog); // Call the async connection function
}

/**
 * Establishes a connection to the Blooket game via Firebase.
 * @param {string} gid - The Blooket game ID.
 * @param {string} name - The bot's display name.
 * @param {boolean} icog - Whether to use a random avatar.
 * @param {object|boolean} reqbody - Optional request body (used if reconnecting).
 */
async function connect(gid, name, icog, reqbody = false) {
  // Reset bot connection status
  botinfo.connected = false;
  botinfo.connecting = true;
  botinfo.name = name;
  botinfo.gid = gid;

  console.log("Fetching token...");

  // Attempt to retrieve a connection token from Blooket's Firebase system
  const body = reqbody
    ? reqbody
    : await fetch("https://fb.blooket.com/c/firebase/join", { // Intended endpoint, but currently results in a 404 error due to CORS or incorrect API access.
        body: JSON.stringify({ id: gid, name: name }), // Send game ID and bot name
        headers: { "Content-Type": "application/json" },
        method: "POST",
      }).then((e) => e.json());

  console.log("Connecting to game...");

  if (body.success) {
    // Initialize Firebase connection using credentials from Blooket
    const liveApp = initializeApp(
      {
        apiKey: "AIzaSyCA-cTOnX19f6LFnDVVsHXya3k6ByP_MnU",
        authDomain: "blooket-2020.firebaseapp.com",
        projectId: "blooket-2020",
        storageBucket: "blooket-2020.appspot.com",
        messagingSenderId: "741533559105",
        appId: "1:741533559105:web:b8cbb10e6123f2913519c0",
        measurementId: "G-S3H5NGN10Z",
        databaseURL: body.fbShardURL, // Use Firebase shard URL provided by the response
      },
      Date.now().toString() // Create a unique Firebase instance for this session
    );

    // Authenticate with Firebase using the provided token
    const auth = getAuth(liveApp);
    await signInWithCustomToken(auth, body.fbToken);

    // Establish a connection to Firebase Realtime Database
    const db = getDatabase(liveApp);

    // Add the bot to the game with a chosen or random avatar
    await set(ref(db, `${gid}/c/${name}`), {
      b: icog ? fblooks[Math.floor(Math.random() * fblooks.length)] : "Rainbow Astronaut",
      rt: true, // Some sort of flag for real-time updates
    });

    // Update bot connection status
    botinfo.fbdb = db;
    botinfo.liveApp = liveApp;
    botinfo.connecting = false;
    botinfo.connected = true;
    console.log("Connected to game");

    // Listen for game state updates
    onValue(ref(db, `${gid}`), (data) => {
      if (!botinfo.connected) return;
      onUpdateData(data.val());
    });

    // Listen for potential blocks or restrictions in the game
    onValue(ref(db, `${gid}/bu`), (data) => {
      if (!botinfo.connected) return;
      onBlock(data.val());
    });

  } else {
    // Handle connection failure
    console.log("Connect error: " + body.msg);
    botinfo.connecting = false;
  }
}
