'use strict';

// Bartender class
function Bartender (questions) {
  this.questions = questions
	this.currentQuestion = null;
	this.userPreferences = {};
}

Bartender.prototype.startQuestions = function () {
	this.currentQuestion = 0;
	return true;
};

Bartender.prototype.fetchCurrentQuestion = function() {
	return this.questions[this.currentQuestion];
}

/**
 * nextQuestion
 * Increments currentQuestion by 1
 * RETURNS - Object - current question object
 */
Bartender.prototype.nextQuestion = function(){
	// check if we're at the last question...
	// if ( ) {}

	++this.currentQuestion;
	return this.questions[this.currentQuestion];
}

Bartender.prototype.onUserAnswer = function (answer) {
	var question = this.questions[this.currentQuestion];
	var flavor = question.flavor;
	this.userPreferences[flavor] = answer;
}

Bartender.prototype.createDrink = function (pantry) {
	var drink = [], prop, ingredient;

	for (prop in this.userPreferences) {
		if (this.userPreferences[prop]) {
			ingredient = pantry.fetchRandom(prop);
			drink.push(ingredient.description);
		}
	}

	return drink;
};

// Question class
function Question (text, flavor) {
  this.text = text;
  this.flavor = flavor;
}

// Ingredient class
function Ingredient (flavor, description)	{
	this.flavor = flavor;
	this.description = description;
}

// Pantry class
function Pantry (ingredients) {
  this.ingredients = ingredients;
}

Pantry.prototype.fetchRandom = function(flavor) {
	var i,
			loop = this.ingredients.length,
			tempIngredient,
			filteredIngredients = [];

	for (i = 0; i < loop; i++){
		tempIngredient = this.ingredients[i];
		if (flavor === tempIngredient.flavor) {
			filteredIngredients.push(tempIngredient);
		}
	}

	var randomTarget = filteredIngredients.length;
	var randomIndex = Math.floor(Math.random() * randomTarget);

	return filteredIngredients[randomIndex];
};

function View() {
}

View.prototype.createQuestionTemplate = function (question) {
	var html = "";

	html += `
		<div class="question-area">
			<h3 class="flavor-${question.flavor}">${question.text}</h3>
			<button class="user-answer" id="1-user-answer">Yes</button>
			<button class="user-answer" id="0-user-answer">No</button>
		</div>
	`;

	return html;
};

View.prototype.renderQuestion = function(element, question) {
	var html = this.createQuestionTemplate(question);

	element.html(html);
};

var view = new View();

// STATIC DATA
var Database = {
  drinksQuestions: [
		//Instanciates a new Question obj from Question class into each array index.
    new Question("Do ye like yer drink's strong?", 'strong'),
    new Question("Do ye like it with a salty tang?", 'salty'),
    new Question("Are ye a lubber who likes it bitter?", 'bitter'),
    new Question("Would ye like a bit of sweetness with yer poison?", 'sweet'),
    new Question("Are ye one for a fruity finish?", 'fruity')
  ]
}

// Drink ingredients
var drinksIngredients = [
	new Ingredient('strong', 'Glug of rum'),
	new Ingredient('strong', 'Slug of whisky'),
	new Ingredient('salty', 'salty thing'),
	new Ingredient('sweet', 'sweet thing'),
	new Ingredient('bitter', 'bitter thing'),
	new Ingredient('fruity', 'fruity thing')
];

	// ADD INGREDIENTS
	// , 'splash of gin']),
	// new Ingredients('Salty', ['Olive on a stick', 'salt-dusted rim', 'rasher of bacon']),
	// new Ingredients('Bitter', ['Shake of bitters', 'splash of tonic', 'twist of lemon peel']),
	// new Ingredients('Sweet', ['Sugar cube', 'spoonful of honey', 'splash of cola']),
	// new Ingredients('Fruity', ['Slice of orange', 'dash of cassis', 'cherry on top'])

// var foodPantry = new Pantry([ /* array of ingredients */ ]);

// on application load:
$(function()	{
	var i, question;

	var drinksBartender = new Bartender(Database.drinksQuestions);
	console.log('Instantiated bartender...', drinksBartender);

	var pantry = new Pantry(drinksIngredients);
	console.log('Instantiated pantry...', pantry);

	console.log('starting questions...');
	drinksBartender.startQuestions();

	question = drinksBartender.fetchCurrentQuestion();

	view.renderQuestion($('.question-area'), question);

	// for ( i = 0; i < 5; i++) {
	// 	question = drinksBartender.fetchCurrentQuestion();
	// 	console.log('current question:', question.text);
	// 	drinksBartender.onUserAnswer(true);
	// 	drinksBartender.nextQuestion();
	// }


	$('#main').on('click', '.user-answer', function(evt){
		var answer = parseInt(evt.target.id);
		// use appropriate bartender method to store user preference


		var question = drinksBartender.nextQuestion();

		if (question) {
			view.renderQuestion( $('.question-area') , question);
		} else {
			// no more questions!
			// var drink = drinksBartender.createDrink(pantry)
			// view.renderDrinkMade(drink)...
		}

		console.log(question);

	});

});





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
