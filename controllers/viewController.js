const db = require("./../utils/dbclient");
exports.getOverview = async (req, res) => {
  try {
    await db.client.connect();
    const database = db.client.db("passwizard-vault");
    const collection = database.collection("news");
    const articles = await collection.find({}).toArray();
    res.status(200).render("index.pug", {
      articles,
    });

    //we would need to await the query for getting news from the database
  } catch (err) {
    res.status(500).json({
      status: "error",
      err: err.message,
      err,
    });
  }
};

exports.getLoginForm = async (req, res) => {
  try {
    await res.status(200).render("login.pug");
  } catch (err) {
    //the catch block is not working currently
    res.status(500).send("something went very wrong");
  }
};

exports.showRegisterForm = async (req, res) => {
  try {
    await res.status(200).render("register.pug");
  } catch (err) {
    res.status(500).send("something went very wrong");
  }
};
exports.showProfile = async (req, res) => {
  try {
    await db.client.connect();
    const database = db.client.db("passwizard-vault");
    const collection = database.collection("users");
    let target;
    let negativeNews;
    target = await collection.findOne({ email: req.user.email });
    const storepass = target.storepass;
    await res.status(200).render("profile.pug", {
      storepass,
    });
  } catch (err) {
    //the catch block is not working currently
    res.status(500).send("something went very wrong");
  }
};
