const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
const cors = require('cors');
const { stringify } = require('querystring');

const app = express();
const port = 5500; 
app.use(cors());
app.use(express.json()); // Parse incoming requests with JSON payloads

// MongoDB connection
const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);
const dbName = 'Demo';

let ItemIDs = [];
let Names = [];
let Prices = [];
let Emails = [];
let Items = [];
let Phones = [];
let Dates = [];

let test = [];
let compIDs = [];

/*app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, '../public1/orders.html'));
});*/


app.post('/api/users', async (req, res) => {
    const { inf } = req.body;
    try{
        await run(inf);
        /*let test = {
            name : Names,
            price : Prices,
            email : Emails,
            items : Items,
            phone : Phones,
            date : Dates,
        }*/
       let info = {
        test : test,
        comp : compIDs
       }

        res.json(info);
    }catch(error){  
        res.status(500).send('Error fetching data');
    }
}
);

app.post('/api/orders', async (req, res) => {
    const { name, phone, email, items, price, date } = req.body;
    try {
        await updateDB(name, phone, email, items, price, date);
        res.status(200).send('Order added successfully');
    } catch (error) {
        res.status(500).send('Error adding order');
    }
});

app.post('/api/delete', async (req, res) => {
    const { itemID } = req.body;
    try {
        await deleteDB(itemID);
        res.status(200).send('Order deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting order');
    }
});

app.post('/api/move', async (req, res) => {
    const { itemID } = req.body;
    try {
        await moveSet(itemID);
        res.status(200).send('Order moved successfully');
    } catch (error) {
        res.status(500).send('Error moving order');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

async function run(inf) {
    try {
        // If there is any information in the Arrays, Clear them before rescanning the DB
        if(Names.length > 0){
            Names = [];
            Prices = [];
            Emails = [];
            Items = [];
            Phones = [];
            Dates = [];
            ItemIDs = [];

        }
        // Connect to MongoDb Server
        await client.connect();
        console.log("Successfully connected to the server");

        const db = client.db(dbName);
        const collection = db.collection('Orders');
        const collection2 = db.collection('Completed-Orders');

        let findResult = [];
        
        // Find Some Documents based on the mode
        if(inf == 1){
            findResult = await collection.find({}).toArray();

        }else if(inf == 2){
            findResult = await collection2.find({}).toArray();
        }else {
            findResult = await collection.find({}).toArray();
            
            // Concatenate findResult with the completed orders
            //findResult = findResult.concat(await collection2.find({}).toArray());
            let findResult2 = await collection2.find({}).toArray();
            for (let thing in findResult2){
                compIDs.push(findResult2[thing]._id);
            }
            findResult = findResult.concat(findResult2);
            // Sort the combined results by Name
            /*findResult = combinedResults.sort((a, b) => {
                if (a.Name < b.Name) return -1;
                if (a.Name > b.Name) return 1;
                return 0;
              });*/

        }
        test = findResult;

    } finally {
        // Close the Collection
        //console.log(test);
    }
}

async function updateDB(name, phone, email, items, price) {
    const db = client.db(dbName);
     // Insert Document
     const writeResult = await db.collection('Orders').insertMany([
        {
            Name: name,
            Phone: phone,
            Email: email,
            Items: items,
            Price: price,
            Date: new Date(Date.now())
        }
    ]);
    console.log("Documents inserted with _ids: ", writeResult.insertedIds);
}

async function deleteDB(itemID) {
    const db = client.db(dbName);
    // Delete Document
    // Find Some Documents
    const oId = new ObjectId(itemID);
    const myQuery = { _id: oId };
    console.log(myQuery);
    const deleteResult = await db.collection('Orders').deleteOne(myQuery, function(err, obj) {
        if (err) throw err;
        else{  console.log("1 document deleted with id: "+ oId); }
    }
    );
    console.log("Deleted documents: ", deleteResult.deletedCount);
}

async function moveSet(itemID){
    const db = client.db(dbName);
    
    const source = db.collection('Orders');
    const destination = db.collection('Completed-Orders');

    // Find Some Documents
    const docId = new ObjectId(itemID);
    var myQuery = { _id: docId };
    console.log(myQuery);
    // Find Document
    const documentToMove = await source.findOne(myQuery);
    const result = await source.deleteOne(myQuery, function(err, obj) {
        if (err) throw err;
        else console.log("1 document deleted with id: "+ oId);
    });

    if(result.deletedCount === 1){
        console.log('Order deleted successfully');
        // Insert Document
        destination.insertOne(documentToMove, function(err, obj) {
            if (err) throw err;
            console.log("1 document moved");
        });
    } else {
        console.log('Order not found');
    }
}
