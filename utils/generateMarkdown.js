// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
	return `# ${data.title}

## Description
${data.description}

<details>
<summary>Click to view table of contents</summary>

## Table of Contents
* [Installation](#installation)
* [Dependencies](#dependencies)
* [Usage](#usage)
* [License](#license)
* [Contributors](#contributors)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
</details>

## Installation
${data.installation}

## Dependencies
${data.dependencies}

## Usage
${data.usage}

## License
${data.license}

## Contributors
${data.authors}

## Contributing
$(data.contributing}

## Tests
${data.tests}

## Questions
If you have any questions, open an issue or contact directly at [${data.email}](mailto:${data.email}). You can find more of my work at [${data.gitHubProfile}](https://www.github.com/${data.gitHubProfile}).`;
}
module.exports = generateMarkdown;
