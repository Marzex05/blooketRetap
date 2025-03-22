function joinGame(code, name, icog = false) {
  if (botinfo.connecting) {
    console.log("Connecting to game, please wait...");
    return;
  }

  oname = name;
  connect(code, name, icog);
}

async function connect(gid, name, icog, reqbody = false) {
  botinfo.connected = false;
  botinfo.connecting = true;
  botinfo.name = name;
  botinfo.gid = gid;

  console.log("Fetching token...");
  const body = reqbody
    ? reqbody
    : await fetch("https://fb.blooket.com/c/firebase/join", {
        body: JSON.stringify({ id: gid, name: name }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      }).then((e) => e.json());

  console.log("Connecting to game...");
  if (body.success) {
    const liveApp = initializeApp(
      {
        apiKey: "AIzaSyCA-cTOnX19f6LFnDVVsHXya3k6ByP_MnU",
        authDomain: "blooket-2020.firebaseapp.com",
        projectId: "blooket-2020",
        storageBucket: "blooket-2020.appspot.com",
        messagingSenderId: "741533559105",
        appId: "1:741533559105:web:b8cbb10e6123f2913519c0",
        measurementId: "G-S3H5NGN10Z",
        databaseURL: body.fbShardURL,
      },
      Date.now().toString()
    );

    const auth = getAuth(liveApp);
    await signInWithCustomToken(auth, body.fbToken);
    const db = getDatabase(liveApp);

    await set(ref(db, `${gid}/c/${name}`), {
      b: icog ? fblooks[Math.floor(Math.random() * fblooks.length)] : "Rainbow Astronaut",
      rt: true,
    });

    botinfo.fbdb = db;
    botinfo.liveApp = liveApp;
    botinfo.connecting = false;
    botinfo.connected = true;
    console.log("Connected to game");

    onValue(ref(db, `${gid}`), (data) => {
      if (!botinfo.connected) return;
      onUpdateData(data.val());
    });

    onValue(ref(db, `${gid}/bu`), (data) => {
      if (!botinfo.connected) return;
      onBlock(data.val());
    });
  } else {
    console.log("Connect error: " + body.msg);
    botinfo.connecting = false;
  }
}
