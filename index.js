// TODO: Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
const toMarkdown = require("./utils/generateMarkdown.js");

// TODO: Create an array of questions for user input
const questions = ["What is your project?",
					"How would you describe it, covering the following points:\n - Motivation for project\n - Why it was created\n - Problem(s) solved\n"];
const [title, description] = questions;

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
	fs.writeFile(fileName, toMarkdown(data), err => {
		if (err) {
			console.error(err);
		}
		// file written successfully
		console.log("Readme successfully created.");
	});
}

// TODO: Create a function to initialize app
function init() {
	inquirer
	.prompt([
		{
			type: "input",
			message: title,
			name: "title"
		},
		{
			type: "input",
			message: description,
			name: "description"
		}
	])
	.then((answers) => {
		writeToFile("README.md", answers);
	})
	.catch((error) => {
		if (error.isTtyError) {
			// Prompt couldn't be rendered in the current environment
		} else {
			// Something else went wrong
		}
	});
}

// Function call to initialize app
init();