const express=require('express');
const cors=require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app=express();
const port=process.env.PORT||5000;


// middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2jwpece.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
const toysCollection=client.db('toyWorld').collection('toys')
const myCollection=client.db('toyWorld').collection('mytoys')
const categoryCollection=client.db('toyWorld').collection('category')
app.get('/toys',async(req,res)=>{
    const cursor=toysCollection.find();
    const result=await cursor.toArray()
    res.send(result);
})
app.get('/toys/:id',async(req,res)=>{
  const id=req.params.id;
  const query={_id: new ObjectId(id)}
  const result=await toysCollection.findOne(query);
  res.send(result)
})
app.get('/mytoys',async(req,res)=>{
  const cursur=myCollection.find();
  const result=await cursur.toArray();
  res.send(result);
})
app.get('/mytoys/:id', async(req, res) => {
  const id = req.params.id;
  const query = {_id: new ObjectId(id)}
  const result = await myCollection.findOne(query);
  res.send(result);
})
app.post('/mytoys',async(req,res)=>{
  const adding=req.body;
  console.log(adding);
  const result=await myCollection.insertOne(adding);
  res.send(result);
})
app.get('/mytoys', async (req, res) => {
  console.log(req.query.email);
  let query = {};
  if (req.query?.email) {
      query = { email: req.query.email }
  }
  const result = await bookingCollection.find(query).toArray();
  res.send(result);
})
app.delete('/mytoys/:id',async(req,res)=>{
  const id=req.params.id;
  const query={_id: new ObjectId(id)}
  const result=await myCollection.deleteOne(query);
  res.send(result);
})
app.get("/mytoys/:email", async (req, res) => {
  console.log(req.params.id);
  const toys = await myCollection
    .find({
      postedBy: req.params.email,
    })
    .toArray();
  res.send(toys);
});



app.put("/mytoys/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log(body);
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      price: body.price,
      availableQuantity: body.availableQuantity,
      description: body.description,
      rating:body.rating
    },
  };
  const result = await myCollection.updateOne(filter, updateDoc);
  res.send(result);
});
app.get('/category',async(req,res)=>{
  const cursor=categoryCollection.find();
  const result=await cursor.toArray()
  res.send(result);
})
app.get('/category/:id',async(req,res)=>{
  const id=req.params.id;
  const query={_id: new ObjectId(id)}
  const result=await categoryCollection.findOne(query);
  res.send(result)
})


//   app.get("/category/:category", async (req, res) => {
//   console.log(req.params.id);
//   const jobs = await categoryCollection
//     .find({
//       status: req.params.category,
//     })
//     .toArray();
//   res.send(jobs);
// });


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('toy is running ')
})
app.listen(port,()=>{
    console.log(`Toy is running on the port: ${port}`)
})