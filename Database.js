const { MongoClient} = require('mongodb');	// require the mongodb driver

/**
 * Uses mongodb v3.6+ - [API Documentation](http://mongodb.github.io/node-mongodb-native/3.6/api/)
 * Database wraps a mongoDB connection to provide a higher-level abstraction layer
 * for manipulating the objects in our cpen322 app.
 */
function Database(mongoUrl, dbName){
	if (!(this instanceof Database)) return new Database(mongoUrl, dbName);
	this.connected = new Promise((resolve, reject) => {
		MongoClient.connect(
			mongoUrl,
			{
				useNewUrlParser: true
			},
			(err, client) => {
				if (err) reject(err);
				else {
					console.log('[MongoClient] Connected to ' + mongoUrl + '/' + dbName);
					resolve(client.db(dbName));
				}
			}
		)
	});
	this.status = () => this.connected.then(
		db => ({ error: null, url: mongoUrl, db: dbName }),
		err => ({ error: err })
	);
}

Database.prototype.getItems = function(){
	return this.connected.then(db =>
		new Promise((resolve, reject) => {
			var items = db.collection('items').find().toArray();
			resolve(items);
		})
	)
}

Database.prototype.editItem = function(item) {
	console.log(item);
    return this.connected.then(db => 
        new Promise((resolve, reject) => {
            db.collection('items').updateOne( {id : item.id}, { $set: {id: item.id, name: item.name, description: item.description, qty: item.qty} }).then((res) => {
                resolve(item);
            })
        }))
}


Database.prototype.addItem = function(item){
	return this.connected.then(db => 
		new Promise((resolve, reject) => {
			db.collection('items').insertOne(item).then((res) => {
				resolve(item);
			});
		})
	)
}

Database.prototype.removeItem = function(id){
	return this.connected.then(db => 
		new Promise((resolve, reject) => {
			db.collection('items').deleteOne({id : id}).then((res) => {
				resolve(item);
			});
		})
	)
}

module.exports = Database;