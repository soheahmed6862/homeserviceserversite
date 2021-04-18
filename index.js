const express = require('express');
const app = express();
const port = 5000;
const cors= require('cors');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
app.use(fileUpload())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/', (req, res) => {
  res.send('Hello World!')
});



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://homeservice:123456Qw@cluster0.pguax.mongodb.net/homeservice?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("homeservice").collection("service");
  // perform actions on the collection object

// app.post("/Addservice",(req,res)=>{

// const service=req.body

//     collection.insertOne(service)
//     .then(response => {
//       console.log(response);
//       res.send(response)
//     })
// })

app.post('/adservice',(req, res) =>{
  const file = req.files.file;
  console.log(file)

  const newImg = file?.data;
  const encImg = newImg.toString('base64');

  var image = {
      contentType: file.mimetype,
      size: file.size,
      img: Buffer.from(encImg, 'base64')
  };

  doctorCollection.insertOne({  image })
      .then(result => {
          res.send(result.insertedCount > 0);
      })
})


console.log("mongodb connection")
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});