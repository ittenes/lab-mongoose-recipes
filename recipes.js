const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });



const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: {
    type: Array
  },
  cuisine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  image: {
    type: String,
    default: 'https: //images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
})

const Recepie = mongoose.model('Recepie', recipeSchema);
module.exports = Recepie;

Recepie.create({
    title: 'Antonio',
    level: 'Easy Peasy',
    ingredients: ['uno', 'dos'],
    cuisine: 'uno',
    dishType: 'Dish',
    duration: 12,
    creator: 'Antonio dos'
  })
  .then(recepie => {
    console.log('The recepie is saved and its value is: ', recepie)
    return Recepie.insertMany(data)
  })
  .then(recepie => {
    console.log('The recepie is saved and its value is: ', recepie)
    return Recepie.updateOne({
      title: "Rigatoni alla Genovese"
    }, {
      duration: 100
    })
  })
  .then(recepie => {
    console.log('The recepie is saved and its value is: ', recepie)
    Recepie.remove({
      title: 'Carrot Cake'
    })
    mongoose.connection.close()
  })
  .catch(err => {
    console.log('An error happened:', err)
  })

// Recepie.insertMany(data)
//   .then(recepie => {
//     console.log('The recepie is saved and its value is: ', recepie)
//   })
//   .catch(err => {
//     console.log('An error happened:', err)
//   });

// Recepie.updateOne({
//     title: "Rigatoni alla Genovese"
//   }, {
//     duration: 100
//   })
//   .then(recepie => {
//     console.log('The recepie is saved and its value is: ', recepie)
//   })
//   .catch(err => {
//     console.log('An error happened:', err)
//   });

// Recepie.remove({
//     title: 'Carrot Cake'
//   })
//   .then(recepie => {
//     console.log('The recepie is saved and its value is: ', recepie)
//   })
//   .catch(err => {
//     console.log('An error happened:', err)
//   });