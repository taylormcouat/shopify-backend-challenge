const express = require('express');
const cors = require('cors');
const Database = require('./Database.js');
const exp = require('constants');
var db = new Database("mongodb://localhost:27017", "inventory-database");

function logRequest(req, res, next){
	console.log(`${new Date()}  ${req.ip} : ${req.method} ${req.path}`);
	next();
}


const host = 'localhost';
const port = 5000;

// express app
let app = express();
app.use(cors())

app.listen(port, () => {
	console.log(`${new Date()}  App Started. Listening on ${host}:${port}`);
});

app.use(express.json()) 						// to parse application/json
app.use(express.urlencoded({ extended: true })) // to parse application/x-www-form-urlencoded
app.use(logRequest);							// logging for debug


app.post("/items", function(req, res) {
    var id = req.body.id;
	var name = req.body.name;
	var description = req.body.description;
    var qty = req.body.qty;

	if (!name || !id) {
		res.status(400).send("Ill-formated request");
	} else {
        var data = {id: id, name: name, description: description, qty: qty};
		db.addItem(data).then((result) => {
			res.status(200).send();
		})
	}
})

app.put("/items", function(req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var description = req.body.description;
    var qty = req.body.qty;
    db.editItem({id: id, name: name, description: description, qty: qty}).then((result) => {
        res.status(200).send();
    })
});

app.get("/items", function(req, res) {
	db.getItems().then((result) => {
		arr = [];
		for (var i = 0; i < result.length; i++) {
			var obj = result[i];
			var item = {id: obj.id, name: obj.name, description: obj.description, qty: obj.qty};
			arr.push(item);
		}
		res.status(200).send(JSON.stringify(arr));
	})
});

app.delete("/items", function(req, res) {
	var id = req.body.id;
	db.removeItem(id).then((result) => {
		res.status(200).send();
	})
})
