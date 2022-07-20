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
var package;

// Questions.
const questions = [
	{
		type: "input",
		message: "What is your GitHub username?",
		name: "gitHubProfile",
	},
	{
		type: "input",
		message: "What is the name of the repository for the project?\n\tLeave blank if none.",
		name: "gitHubRepo",
		when: (answers) => answers.gitHubUsername !== ""
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
		default: "To use, run the following command:\n\n\`\`\`node index.js\`\`\`"
	},
	{
		type: "list",
		message: "Select the license you're using.",
		choices: ["MIT", "ISC", "UNLICENSED"],
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
		name: "contributing",
		default: "All contributions are welcome!\nPlease review any open issue."
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
const [gitHubProfile, gitHubRepo, email, title, description, installation, usage, license, authors, contributing, tests, dependencies] = questions;

// Get info from package.json file.
function getPackage() {
	// Helper functions for evaluating package.json.
	function removeQuestion(question) { questions.splice(questions.indexOf(question), 1); }
	function addDefault(key, question) { question.default = package[key]; }

	// Read package.json file if it exists.
	try {
		package = JSON.parse(fs.readFileSync("./package.json", "utf8"));
	} catch(err) {
		package = null;
	}

	// Check package.json for any details. Use them as defaults for prompts.
	if (package !== null) {

		// First check for repo info.
		if ("repository" in package && package.repository !== "") {
			let url;

			if (typeof (package.repository) === "object")
				url = package.repository.url.split("/");
			else if (typeof(package.repository) === "string")
				url = package.repository.split("/");
			package.gitHubProfile = url[url.length - 2];
			package.gitHubRepo = url[url.length - 1];
			
			USE_VALUES_IN_PACKAGE ? removeQuestion(gitHubProfile) : addDefault("gitHubProfile", gitHubProfile);
			USE_VALUES_IN_PACKAGE ? removeQuestion(gitHubRepo) : addDefault("gitHubRepo", gitHubRepo);
		}
		// Check for author email.
		if ("author" in package && package.author !== "") {
			console.log("Has author");
			if ("email" in package.author && package.author.email !== "")
				USE_VALUES_IN_PACKAGE ? removeQuestion(email) : email.default = package.author.email;
		}
		// Project title. NPM packages seem to all be foo-bar-baz, even on GitHub.
		if ("name" in package && package.name !== "")
			USE_VALUES_IN_PACKAGE ? removeQuestion(title) : addDefault("name", title);
		// Project description.
		if ("description" in package && package.description !== "")
			USE_VALUES_IN_PACKAGE ? removeQuestion(description) : addDefault("description", description);
		if ("author" in package && package.author !== "") {
			let contributors = [];
			if (typeof package.author === "string")
				contributors.push(package.author);
			else if (typeof package.author === "object")
				contributors.push(package.author.name);

			if ("contributors" in package && package.contributors.length !== 0)
				package.contributors.forEach((e) => contributors.push(e.name));

			USE_VALUES_IN_PACKAGE ? removeQuestion(authors) : authors.default = contributors.join(", ");
		}
	}
}

// Writes to ReadMe file.
function writeToFile(fileName, data) {
	fs.writeFile(fileName, toMarkdown(data), err => {
		if (err) {
			console.error(err);
		}
		// file written successfully
		console.log("Readme successfully created.");
	});
}

// Called when program starts. 
function init() {
	// Grab package.json data.
	getPackage();

	inquirer
	.prompt(questions)
	.then((answers) => {
		writeToFile("./sample/README.md", answers);
	})
	.catch((err) => console.error(err));
}

// Function call to initialize app.
init();