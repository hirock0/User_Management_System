import "dotenv/config";
import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const ping = await client.db("admin").command({ ping: 1 });
    if (ping?.ok) {
      console.log("DB Connected successfully!");
    }
    const users = client?.db("All_User")?.collection("users");

    app.get("/users", async (req, res) => {
      const allUsers = await users?.find()?.toArray();

      res.send(allUsers.reverse());
    });
    app.post("/user", async (req, res) => {
      const reqBody = await req.body;
      if (reqBody == undefined) {
        res.send({ success: false, message: "Data not successful!" });
      } else {
        const allUsers = await users?.find()?.toArray();
        const uniqEmail = allUsers.some((item) => item.email == reqBody.email);
        if (uniqEmail) {
          res.send({ success: false, message: "Email already exits!" });
        } else {
          await users?.insertOne(reqBody);
          res.send({ success: true, message: "Data save successful!" });
        }
      }
    });
    app.delete("/user/delete/:id", async (req, res) => {
      const Id = req.params.id;
      const dbId = new ObjectId(Id);
      await users.findOneAndDelete({ _id: dbId });
      res.send({ success: true, message: "Delete Successful" });
    });

    app.get("/update_user/:id", async (req, res) => {
      const Id = req.params.id;
      const id = new ObjectId(Id);
      const userData = await users?.findOne({ _id: id });
      res.send({ message: "Data is found", success: true, userData });
    });
    app.put("/update_user/:id", async (req, res) => {
      const Id = req.params.id;
      const query = { _id: new ObjectId(Id) };
      const reqUser = await req.body;
      await users?.findOneAndUpdate(query, { $set: reqUser }, { upsert: true });

      res.send({ message: "Update successfully!", success: true });
    });
  } catch (error) {
    throw new Error(error);
  }
}

run().catch(console.dir);

app.listen(process.env.PORT || 500, () => {
  console.log(`Port is running on ${process.env.PORT}`);
});
