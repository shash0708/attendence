const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(cors());

const uri = "your_mongodb_uri";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged our deployment. You successfully connected to MongoDB!");

    const port = 9000;
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
