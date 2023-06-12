const express = require("express");
const cors = require("cors");
const path = require("path");
const { rootRouter } = require("./app/routes");
const { sequelize } = require("./models/index");

const app = express();
const port = process.env.PORT || 1234;

app.use(cors());
app.use(express.json());

const publicPathDirectory = path.join(__dirname, "./public");
app.use("/public", express.static(publicPathDirectory));

app.use("/api/v1", rootRouter);

app.listen(port, async () => {
	console.log("App running on port " + port);
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully!");
	} catch (err) {
		console.log("Unable to connect to the database!");
	}
});
