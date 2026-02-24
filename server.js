const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = "AIzaSyACTYHOGcLaBzOXf1Pz4pX6QuoU9ENd85w";
const PLACE_ID = "ChIJd-3_DzSwKIQRE0vHqy1kQLk";

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("SERVIDOR FUNCIONA");
});

// Ruta reviews
app.get("/reviews", async (req, res) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews&key=${API_KEY}`
    );

    const data = await response.json();

    console.log("GOOGLE RESPONDIO:");
    console.log(data);

    res.json(data.result?.reviews || []);

  } catch (error) {
    console.log("ERROR:", error);
    res.json({ error: "falló el server" });
  }
});

app.listen(3000, () => console.log("SERVIDOR NUEVO ACTIVO"));
