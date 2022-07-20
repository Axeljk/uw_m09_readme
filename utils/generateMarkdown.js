// License badge. Checks for no license.
function renderLicenseBadge(data) {
	if (data.license !== "UNLICENSED")
		return `[![badge](https://img.shields.io/github/license/${data.gitHubProfile}/${data.gitHubRepo})](https://www.github.com/${data.gitHubProfile}/${data.gitHubRepo}/blob/main/license)\n\n`;
	else
		return "";
}

// License section. Needs to check for no license.
function renderLicenseSection(license) {
	if (license !== "UNLICENSED")
		return `## License\n${license}\n\n`;
	else
		return "";
}

function renderTitle(data) {
	return `# ${data.title}\n\n` + renderLicenseBadge(data);
}
function renderSection(header, data) {
	return (data != "") ? `## ${header}\n${data}\n\n` : "";
}
function renderList(header, data) {
	if (data != "") {
		let list = `## ${header}`;
		if (typeof data === "array") {
			for (x in data)
				list += "\n- " + x;
		} else (typeof data === "string")
			list += "\n- " + data.split(" ").join("\n- ");
		return list + "\n\n";
	} else
		return "";
}
function renderTableOfContents(data) {
	let table = `<details>\n<summary>Click to view table of contents</summary>\n\n## Table of Contents\n`;

	if (data.installation != "")
		table += `* [Installation](#installation)\n`;
	if (data.dependencies != "")
		table += `* [Dependencies](#dependencies)\n`;
	if (data.usage != "")
		table += `* [Usage](#usage)\n`;
	if (data.authors != "")
		table += `* [Contributors](#contributors)\n`;
	if (data.contributing != "")
		table += `* [Contributing](#contributing)\n`;
	if (data.tests != "")
		table += `* [Tests](#tests)\n`;
	if (data.license !== "UNLICENSED")
		table += `* [License](#license)\n`;
	table += `* [Questions](#questions)\n</details>\n\n`;

	return table;
}
function renderQuestions(data) {
	return `## Questions\nIf you have any questions, open an issue or contact directly at [${data.email}](mailto:${data.email}). You can find more of my work on [GitHub](https://www.github.com/${data.gitHubProfile}).`;
}

// Generates markdown for README
function generateMarkdown(data) {
	let readme = renderTitle(data);
	readme += renderSection("Description", data.description);
	readme += renderTableOfContents(data);
	readme += renderSection("Installation", data.installation);
	readme += renderList("Dependencies", data.dependencies);
	readme += renderSection("Usage", data.usage);
	readme += renderList("Contributors", data.authors);
	readme += renderSection("Contributing", data.contributing);
	readme += renderSection("Tests", data.tests);
	readme += renderLicenseSection(data.license);
	readme += renderQuestions(data);

	return readme;
}
module.exports = generateMarkdown;
