const express = require('express')
const app = express()
const port = 5050
const cors = require('cors');
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://msnAdmin:msn1234@cluster0.9pkjs.mongodb.net/MsnProject?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

client.connect(err => {
  const serviceCollection = client.db("MsnProject").collection("services");

  app.post('/addProduct', (req, res) =>{
      console.log(req.body);
    serviceCollection.insertMany(req.body)
    .then(result => {
        res.send(result.insertedCount)
    })
  })

 console.log("database connected")


});


// app.post('/addProduct', (req, res) =>{
//     // const service = req.body;
//      console.log(req.body);
//    //   serviceCollection.insertMany(service)
//    //   .then(result =>{
//    //     res.send(result.insertedCount)
//    //   })
//  })



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)