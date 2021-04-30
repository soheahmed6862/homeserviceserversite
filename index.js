const express = require('express');
const app = express();
const port = 5000;
const fs = require('fs-extra');
const ObjectId =require('mongodb').ObjectId
const cors= require('cors');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
app.use(express.static('service'))
app.use(fileUpload())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/', (req, res) => {
  res.send('Hello World!')
});



const MongoClient = require('mongodb').MongoClient;
const { static } = require('express');
const uri = "mongodb+srv://homeservice:123456Qw@cluster0.pguax.mongodb.net/homeservice?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("homeservice").collection("service");
  const orderlist=client.db("homeservice").collection("order")
  const  commentlist=client.db("homeservice").collection("commnet")
  // perform actions on the collection object






app.get('/product',(req,res)=>{
  collection.find({})
  .toArray((err,document)=>{
    res.send(document)
    console.log(err)
  })
})

app.get('/commentlist',(req,res)=>{
 commentlist.find({})
  .toArray((err,document)=>{
    res.send(document)
    console.log(err)
  })
})

app.get('/getorder',(req,res)=>{
  orderlist.find({})
  .toArray((err,document)=>{
    res.send(document)
    console.log(err)
  })
})
app.get('/singleproduct/:id',(req,res)=>{
  const userId=req.params.id
 
  collection.find({_id: ObjectId(req.params.id)})
.toArray((err,items)=>{
 res.send(items[0])
 console.log(items)
})


      })




app.post('/adservice',(req, res) =>{
  const file = req.files.file;
  const discription=req.body.discription
  const servicename=req.body.servicename
  const price=req.body.price
  const quantity=req.body.quantity
  const filepath=`${__dirname}/service/${file.name}`
  console.log(file,servicename,discription,price,quantity)
  file.mv(filepath,err =>{

    if(err){
      console.log(err)
      return res.status(500).send({message:'file is upload'})
    } 

    var newImg=fs.readFileSync(filepath)
    const encImg=newImg.toString('base64')
    var image={
      contentType: req.files.file.mimetype,
      size:req.files.file.size,
      img:Buffer(encImg,'base64')
    }
        collection.insertOne({discription,servicename,image,price,quantity})
        .then(result=>{
          fs.remove(filepath,error=>{
            if(error){
              console.log(errors)
            }
            res.send(result.insertedCount >0)
          })
       
          console.log(result)

})


    
  })


})
app.post('/orderlist',(req, res)=>{
  const order =req.body;
  const email=req.body.email
console.log(order)


  orderlist.insertOne(order,email)
  .then(result=>{console.log(result)})
})

app.post('/comment',(req, res)=>{
  const commnet=req.body;
  console.log(commnet)
  commentlist.insertOne(commnet)
  .then(result=>{console.log(result)})

})

app.post("/contomarservice",(req,res)=>{

const email=req.body.email
console.log(email);
orderlist.find({email: email})
.toArray((err,document)=>{
  res.send(document)
})

 
})



// app.post('/getorder',(req,res)=>{
 
//   const email =req.body.email

//   orderlist.find({email: email})
//   .toArray((err,document)=>{
//     res.send(document.length>0)
//     console.log(err)
//   })
// })




console.log("mongodb connection")
});





app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
