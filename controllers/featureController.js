const db = require("./../utils/dbclient");
// const Users = require();

exports.savePassDb = async (req, res) => {
  try {
    const { email, storeUsername, storePassword, storeWebsite } = req.body;
    // console.log(storePassword, email);
    //will do proper hashing or password later
    await db.client.connect();
    const database = db.client.db("passwizard-vault");
    const collection = database.collection("users");
    const target = await collection.updateOne(
      { email },
      { $push: { storepass: { storeWebsite, storeUsername, storePassword } } }
    );
    res.status(200).json({
      status: "success",
      message: "Password stored successfully in database",
      target,
    });
  } catch (err) {
    res.status(408).json({
      status: "fail",
      err,
    });
  }
};
