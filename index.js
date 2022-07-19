// Modules required.
const fs = require("fs");
const inquirer = require("inquirer");
const toMarkdown = require("./utils/generateMarkdown.js");

// Commandline arguments and package.json info.
const CLI_USE_PACKAGE_VALUES = "-i";
const CLI_SAVE_TO_PACKAGE = "-y";
const args = process.argv.slice(2);
const USE_VALUES_IN_PACKAGE = args.includes(CLI_USE_PACKAGE_VALUES);
const SAVE_VALUES_TO_PACKAGE = args.includes(CLI_SAVE_TO_PACKAGE);
const package = JSON.parse(fs.readFileSync("./package.json", "utf8"));

// Questions.
const questions = [
	{
		type: "input",
		message: "Does the project have a repository?",
		name: "gitHub"
	},
	{
		type: "input",
		message: "What is your GitHub username?",
		name: "gitHubUsername"
	},
	{
		type: "input",
		message: "What is your email?",
		name: "email"
	},
	{
		type: "input",
		message: "What is your project called?",
		name: "title",
	},
	{
		type: "input",
		message: "Enter a short description covering the following points:\n - Motivation for project\n - Why it was created\n - Problem(s) solved\n",
		name: "description",
	},
	{
		type: "editor",
		message: "Please detail your installation process.",
		name: "installation",
		default: `To install with the necessary dependencies, run the following command:\n\n \`\`\`npm i\`\`\``
	},
	{
		type: "editor",
		message: "Please describe how to use your project.",
		name: "usage",
	},
	{
		type: "list",
		message: "Select the license you're using.",
		choices: ["MIT", "ISC"],
		name: "license"
	},
	{
		type: "input",
		message: "Enter those who authored or contributed to the project.",
		name: "authors"
	},
	{
		type: "editor",
		message: "How can someone contribute to this project?",
		name: "contributing"
	},
	{
		type: "editor",
		message: "Are there any unit tests?",
		name: "tests",
		default: `To run tests, run the following command:\n\n\`\`\`npm test\`\`\``
	},
	{
		type: "input",
		message: "What modules are required?",
		name: "dependencies"
	}];
const [gitHub, gitHubProfile, email, title, description, installation, usage, license, authors, contributing, tests, dependencies] = questions;

// Get info from package.json file.
function getPackage() {
	// Helper functions for evaluating package.json.
	function removeQuestion(question) { questions.splice(questions.indexOf(question), 1); }
	function addDefault(key, question) { question.default = package[key]; }
	function checkPackageKey(key, question) {
		if (key in package && package[key] !== "")
			USE_VALUES_IN_PACKAGE ? removeQuestion(question) : addDefault(key, question);
	}

	// Check the package.json for the following:
	checkPackageKey("name", title);
	checkPackageKey("description", description);
	checkPackageKey("author", authors);
	checkPackageKey("license", license);
	checkPackageKey("scripts.test", tests);
	checkPackageKey("repository", gitHub);
	checkPackageKey("dependencies", dependencies);
}

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
	// Grab package.json data.
	getPackage();

	inquirer
	.prompt(questions)
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