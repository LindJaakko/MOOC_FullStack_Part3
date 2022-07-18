const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://JaakkoLind:${password}@cluster0.3wwp4.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv[3] === undefined || process.argv[4] === undefined) {
  mongoose.connect(url).catch((err) => console.log(err));
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else {
  mongoose
    .connect(url)
    .then((result) => {
      const note = new Person({
        name: process.argv[3],
        number: process.argv[4],
      });
      return note.save();
    })
    .then(() => {
      console.log(
        `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
      );
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
}
