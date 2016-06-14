'use strict';

// Bartender class
function Bartender (questions) {
  this.questions = questions
}

Bartender.prototype.askQuestions = function (questionsToAsk) {
		var answer = true; //...send each ques to View; Resp returns.
		// userAnswer assigned true/false
		questionsToAsk.userAnswer = answer;
		console.log(questionsToAsk);
		alert('question/ans process simulate');
};

Bartender.prototype.createDrink = function () {};

// Question class
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

// Preferences class
function Preferences (flavor)	{
	this.flavor = flavor;
	this.userPreference = null;
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
		//Instanciates a new Question obj from Question class into each array index.
    new Question("Do ye like yer drink's strong?", 'strong'),
    new Question("Do ye like it with a salty tang?", 'salty'),
    new Question("Are ye a lubber who likes it bitter?", 'bitter'),
    new Question("Would ye like a bit of sweetness with yer poison?", 'sweet'),
    new Question("Are ye one for a fruity finish?", 'fruity')
  ],
	drinksPreferences: [
		new Preferences('strong'),
		new Preferences('salty'),
		new Preferences('bitter'),
		new Preferences('sweet'),
		new Preferences('fruity'),
	]
}

var drinksPantry = new Pantry([ /* array of ingredients */ ]);
var foodPantry = new Pantry([ /* array of ingredients */ ]);

drinksPantry.ingredients; // => one array
foodPantry.ingredients; // => different array


// Test different user flows:

$(function()	{
	// on application load:
	// 1) instantiate a bartender
	var drinksBartender = new Bartender(Database.drinksQuestions);
	// 2) bartender starts asking questions
	for (var i=0, length=drinksBartender.questions.length; i<length; i++) {
		// 3) user responds to each question
		drinksBartender.askQuestions(drinksBartender.questions[i]);
		// 3.1 Response for each ? rec in Preferences
		Database.drinksPreferences[i].userPreference  = drinksBartender.questions[i].userAnswer;
	};

	// 4) bartender creates drink
	// 5) log out drink info
});

	/*
	 *  Notes
	 */

// drinksBartender.questions[0].text
// drinksBartender.questions[0].flavor // => 'strong'
// drinksBartender.questions[0].userAnswer = true;
// drinksBartender.questions[0].questionAnswered // => true/false?


// Class -- blueprint for objects
  // classes should begin with capital letters
// Instances -- objects created from a Class
  // instances should begin with lowercase letters

// you definitely want to create a preferences object of some kind that the bartender holds onto -- you don't want the userResponse in the question object.  thinking about if the bartender needs to serve multiple drinks, he needs to be able to erase the preferences object and start again.  if the info's being logged in the question objects, you've got to recreate 5 question objects every time which doesn't make sense since they're mostly static data.
