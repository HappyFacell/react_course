const mongoose = require("mongoose");
require("dotenv").config();

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}


const password = process.env.MONGO_PASSWORD;

const url = `mongodb+srv://dbaAdmin:${password}@cluster0.b6k0gq1.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);
if (process.argv[3] != undefined && process.argv[4] != undefined) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log(
      `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
    );
    mongoose.connection.close();
  });
  //   console.log(typeof(process.argv[3]));
  //   console.log(typeof(process.argv[4]));
  //   console.log("si existen");
  //   mongoose.connection.close();
  return;
}

Person.find({}).then((result) => {
  console.log("phonebook:");
  result.forEach((person) => {
    console.log(person.name, person.number);
  });
  mongoose.connection.close();
});
