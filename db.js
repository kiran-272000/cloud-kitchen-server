const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://kiran-gk:KsqfwFljO4BURmKg@cluster0.w7pxy.mongodb.net/cloud-kitchen?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("DB connected Sucessfully");
  });
