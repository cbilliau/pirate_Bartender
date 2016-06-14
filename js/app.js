'use strict';

// Bartender class
function Bartender (questions) {
  this.questions = questions
}

Bartender.prototype.askQuestions = function (questionsToAsk) {
		var answer = true; //...send each ques to View; Resp returns.
		// Assign true/false (i.e. answer)
		questionsToAsk.userAnswer = answer;
		console.log(questionsToAsk);
		alert('question/ans process simulate');
};

Bartender.prototype.createDrink = function () {
// 1) instantiate a pantry
	var drinksPantry = new Pantry(drinksIngredients, Database.drinksPreferences);
	// console.log(drinksPantry);
// 3) Generate rndm list of ingredients based on prefs
	var drinkRecipe = drinksPantry.fetchRandom(drinksPantry);
// 4) Return drink ingredients
	return drinkRecipe;
// 5 (later add ons: drink name generate, etc...)
};

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
function Ingredients (flavor, ingredient)	{
	this.flavor = flavor;
	this.ingredient = ingredient;
}

// Pantry class
function Pantry (ingredients, preferences) {
  this.ingredients = ingredients;
	this.preferences = preferences;
}

Pantry.prototype.fetchRandom = function(ingredients, preferences) {
	// Def var holding rndm ingredients
	var filteredIngredients = [];
	// loop through preferences and rndmly assign ingredient for each flavor where userAnswer = true.
	for (var i = 0, alength=this.ingredients.length; i < alength; i++){
			if (this.preferences[i].userPreference == true) {
				filteredIngredients.push(this.ingredients[i].ingredient[(Math.floor((Math.random() * (3 - 0))))])
			}
		}
  return filteredIngredients;
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

// Drink ingredients
var drinksIngredients = [
	new Ingredients('Strong', ['Glug of rum', 'slug of whisky', 'splash of gin']),
	new Ingredients('Salty', ['Olive on a stick', 'salt-dusted rim', 'rasher of bacon']),
	new Ingredients('Bitter', ['Shake of bitters', 'splash of tonic', 'twist of lemon peel']),
	new Ingredients('Sweet', ['Sugar cube', 'spoonful of honey', 'splash of cola']),
	new Ingredients('Fruity', ['Slice of orange', 'dash of cassis', 'cherry on top'])
	]

// var foodPantry = new Pantry([ /* array of ingredients */ ]);

// on application load:
$(function()	{
	// 1) instantiate a bartender
	var drinksBartender = new Bartender(Database.drinksQuestions);
	// 2) bartender starts asking questions
	for (var i=0, length=drinksBartender.questions.length; i<length; i++) {
		// 3) user responds to each question
		drinksBartender.askQuestions(drinksBartender.questions[i]);
		// 4 Response for each ? rec in Preferences
		Database.drinksPreferences[i].userPreference  = drinksBartender.questions[i].userAnswer;
	};
	// 5) bartender creates drink
	var recipe = drinksBartender.createDrink();
	// 6) log out drink info
	console.log(recipe);
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

// Original notes from createDrink
		// this.ingredients.forEach(function(item,index){
		  // 	console.log(item, index);
			// if (ingredient.flavor === flavor) {
			// 	filteredIngredients.push(ingredient);
			// }   // determine length of filteredIngredients; select random index of array; return element at random index


// you definitely want to create a preferences object of some kind that the bartender holds onto -- you don't want the userResponse in the question object.  thinking about if the bartender needs to serve multiple drinks, he needs to be able to erase the preferences object and start again.  if the info's being logged in the question objects, you've got to recreate 5 question objects every time which doesn't make sense since they're mostly static data.
