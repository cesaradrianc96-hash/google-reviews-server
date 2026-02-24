const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const API_KEY = process.env.GOOGLE_API_KEY;
const PLACE_ID = process.env.PLACE_ID;

app.get("/", (req, res) => {
  res.send("SERVIDOR FUNCIONA");
});

app.get("/reviews", async (req, res) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews&key=${API_KEY}`
    );

 const data = await response.json();

    // Aquí definimos la variable reviews correctamente
    const reviews = data.result?.reviews || []; 

    console.log("RESEÑAS:", reviews);

    // Enviamos solo el array de reseñas al front
    res.json(reviews);

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ error: "fallo el server" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log("Servidor activo en puerto", PORT)
);





