'use strict';

// Bartender class
function Bartender(questions) {
    this.questions = questions;
    this.currentQuestion = null;
    this.userPreferences = {};
}

// Set questions counter to zero
Bartender.prototype.startQuestions = function() {
    this.currentQuestion = 0;
    return true;
};

// Return the current question
Bartender.prototype.fetchCurrentQuestion = function() {
    return this.questions[this.currentQuestion];
}

/**
 * nextQuestion
 * Increments currentQuestion by 1
 * RETURNS - Object - current question object
 */
Bartender.prototype.nextQuestion = function() {
    // check if we're at the last question...
    if (this.currentQuestion == (this.questions.length) - 1) {
        return false;
    }

    ++this.currentQuestion;
    return this.questions[this.currentQuestion];
}

// Assign user answer to prefs array
Bartender.prototype.onUserAnswer = function(answer) {
    var question = this.questions[this.currentQuestion];
    var flavor = question.flavor;
    this.userPreferences[flavor] = answer;
}

// Create crink from user prefs(answers)
Bartender.prototype.createDrink = function(pantry) {
    var drink = [],
        prop, ingredient;

    for (prop in this.userPreferences) {
        if (this.userPreferences[prop]) {
            ingredient = pantry.fetchRandom(prop);
            drink.push(ingredient.description);
        }
    }

    return drink;
};

// Question class
function Question(text, flavor) {
    this.text = text;
    this.flavor = flavor;
}

// Ingredient class
function Ingredient(flavor, description) {
    this.flavor = flavor;
    this.description = description;
}

// Pantry class
function Pantry(ingredients) {
    this.ingredients = ingredients;
}

// Fetch rndm ingredient from ingredient array
Pantry.prototype.fetchRandom = function(flavor) {
    var i,
        loop = this.ingredients.length,
        tempIngredient,
        filteredIngredients = [];

    for (i = 0; i < loop; i++) {
        tempIngredient = this.ingredients[i];
        if (flavor === tempIngredient.flavor) {
            filteredIngredients.push(tempIngredient);
        }
    }

    var randomTarget = filteredIngredients.length;
    var randomIndex = Math.floor(Math.random() * randomTarget);

    return filteredIngredients[randomIndex];
};

// View Class
function View() {}

// Create question to ask
View.prototype.createQuestionTemplate = function(question) {
    var html = "";

    html += `
			<p class="flavor-${question.flavor}">${question.text}</p>
			<h4 class="user-answer" id="user-answer">[PRESS Y or N]</h4>
	`;

    return html;
};

// Display question from create question class
View.prototype.renderQuestion = function(element, question) {
    var html = this.createQuestionTemplate(question);

    element.html(html);
};

// Clear text
View.prototype.clearTextBox = function() {
    $('.textBox').clear();
}

// Display drink ingredients
View.prototype.createDrinkTemplate = function(drink) {
    var html = "";
    drink.forEach(function(item) {
        html += "<p>   • " + item + "</p>";
    });
    html += "<h4>[PRESS Y TO ORDER AGAIN]</h4>";
    return html;
};

// Generate and display drink name
View.prototype.createDrinkName = function() {
    var drinkName = "";
    var i = null,
        n = null;
    i = Math.floor((Math.random() * 10));
    n = Math.floor((Math.random() * 10));
    drinkName += "<p> Yar! The '" + Database.firstName[i] + " " + Database.lastName[n] + "' it be, Matey.</p>";
    return drinkName;
};

// Display drink
View.prototype.renderDrink = function(element, drink) {
    var html = this.createDrinkTemplate(drink);
    var drinkName = this.createDrinkName();
    view.clearTextBox;
    element.html(drinkName);
    console.log(drinkName);
    element.html(drinkName + html);
};

// Create new view
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
    ],
    // First name of drink array
    firstName: [
        "Hairy",
        "Swing'n",
        "Skipper's",
        "Stagger'n",
        "Sloppy",
        "Kiss'n",
        "Shakey",
        "Bitter",
        "Coiled",
        "Lazy"
    ],
    // Second name of drink array
    lastName: [
        "Monkey Fist",
        "Rudder",
        "Main",
        "Bos'n",
        "Mermaid",
        "Snatchblock",
        "Manrope",
        "Jackstaff",
        "Limber-hole",
        "Prop"
    ]
}

// Drink ingredients
var drinksIngredients = [
    new Ingredient('strong', 'Glug of rum'),
    new Ingredient('strong', 'Slug of whisky'),
    new Ingredient('strong', 'Splash of gin'),
    new Ingredient('salty', 'Olive on a stick'),
    new Ingredient('salty', 'Salt-dusted rim'),
    new Ingredient('salty', 'Rasher of bacon'),
    new Ingredient('sweet', 'Sugar cube'),
    new Ingredient('sweet', 'Spoonful of honey'),
    new Ingredient('sweet', 'Splash of cola'),
    new Ingredient('bitter', 'Shake of bitters'),
    new Ingredient('bitter', 'Splash of tonic'),
    new Ingredient('bitter', 'Twist of lemon peel'),
    new Ingredient('fruity', 'Slice of orange'),
    new Ingredient('fruity', 'Dash of cassis'),
    new Ingredient('fruity', 'cherry on top')
];


$(document).one('keypress', function() {
    // Create bartender, pantry, and start questions
    var i, question;
    var drinksBartender = new Bartender(Database.drinksQuestions);
    console.log('Instantiated bartender...', drinksBartender);
    var pantry = new Pantry(drinksIngredients);
    console.log('Instantiated pantry...', pantry);
    view.clearTextBox;
    drinksBartender.startQuestions();
    console.log('starting questions...');
    var question = drinksBartender.fetchCurrentQuestion();
    view.renderQuestion($('.textBox'), question);

    $(document).on('keydown', function(event) {
        // Set var to question count
        var quesCount = drinksBartender.currentQuestion;
        // If 'y' pressed
        if (event.which == 89) {
            var answer = true;
            // Set user answer to True
            drinksBartender.onUserAnswer(answer);
            // Get next question
            var question = drinksBartender.nextQuestion();
            // If not on last question
            if (quesCount < (drinksBartender.questions.length) - 1) {
                // render question
                view.renderQuestion($('.textBox'), question);
            } else {
                // else render drink
                var drink = drinksBartender.createDrink(pantry);
                view.renderDrink($('.textBox'), drink);
                drinksBartender.startQuestions();
            }
            // If 'n' pressed
        } else if (event.which == 78) {
            var answer = false;
            drinksBartender.onUserAnswer(answer);
            var question = drinksBartender.nextQuestion();
            if (quesCount < (drinksBartender.questions.length) - 1) {
                view.renderQuestion($('.textBox'), question);
            } else {
                var drink = drinksBartender.createDrink(pantry);
                view.renderDrink($('.textBox'), drink);
                drinksBartender.startQuestions();
            }
        }
    })
})
