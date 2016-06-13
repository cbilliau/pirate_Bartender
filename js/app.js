'use strict';

// Class -- blueprint for objects
// classes should begin with capital letters

// Bartender class
function Bartender (questions) {
  this.questions = questions
}

Bartender.prototype.askQuestions = function () {};

Bartender.prototype.createDrink = function () {};

// Questin class
function Question (text, flavor) {
  this.text = text;
  this.flavor = flavor;
  this.userAnswer = null;
}
/**
 * METHOD: questionAnswered
 * desc: Returns true/false based on if question has been answered
 * RETURNS - Boolean
 */
Question.prototype.questionAnswered = function(){
  return this.userAnswer !== null;
}


// Ingredients class
function Ingredients (flavor, description)	{
	this.flavor = flavor;
	this.description = description;
}

// Pantry class
function Pantry (ingredients) {
  this.ingredients = ingredients;
}
/**
 * METHOD: fetchRandom
 * Desc: Retrieves a random ingredient object based on flavor
 * @flavor - String
 * RETURNS - Object - of class Ingredient
 */
Pantry.prototype.fetchRandom = function(flavor) {
  var returnedIngredient;
  var filteredIngredients = [];

  this.ingredients.forEach(function(ingredient){
    if (ingredient.flavor === flavor) {
      filteredIngredients.push(ingredient);
    }   // determine length of filteredIngredients; select random index of array; return element at random index
  });

  	return returnedIngredient;
};

// STATIC DATA

var Database = {
  drinksQuestions: [
    new Question("Do ye like yer drink's strong?", 'strong'),
    new Question("Do ye like it with a salty tang?"),
    new Question("Are ye a lubber who likes it bitter?"),
    new Question("ould ye like a bit of sweetness with yer poison?"),
    new Question("Are ye one for a fruity finish?")
  ],
	drinksIngredients: [

	]
}

var drinksBartender = new Bartender(Database.drinksQuestions);

drinksBartender.questions[0].text
drinksBartender.questions[0].flavor // => 'strong'
drinksBartender.questions[0].userAnswer = true;
drinksBartender.questions[0].questionAnswered // => true/false?

// Instances -- objects created from a Class
// instances should begin with lowercase letters

var drinksPantry = new Pantry([ /* array of ingredients */ ]);
var foodPantry = new Pantry([ /* array of ingredients */ ]);

drinksPantry.ingredients; // => one array
foodPantry.ingredients; // => different array


// Test different user flows:

// on application load:
// 1) instantiate a bartender
// 2) bartender starts asking questions
// 3) user responds to each question
// 4) bartender creates drink
// 5) log out drink info
