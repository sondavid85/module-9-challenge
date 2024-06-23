//Including packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");
const generateMarkdown = require("./utils/generateMarkdown");
const figlet = require("figlet");

// Creating array of questions
const questions = [
  {
    type: "input",
    name: "title",
    message: "Enter project name:",
  },
  {
    type: "input",
    name: "description",
    message: "Describe the purpose and functionality of this project:",
  },
  {
    type: "input",
    name: "screenshot",
    message: "Relative path to the screenshot image:"
  },
  {
    type: "input",
    name: "link",
    message: "URL of deployed application:"
  },
  {
    type: "checkbox",
    name: "license",
    message: "Please select a license applicable to this project:",
    choices: ["MIT", "APACHE2.0", "Boost1.0", "MPL2.0", "BSD2", "BSD3", "none"],
  },
  {
    type: "input",
    name: "require",
    message: "List any project dependencies:",
  },
  {
    type: "input",
    name: "features",
    message: "Project features:",
  },
  {
    type: "input",
    name: "usage",
    message: "Languages/technologies used:",
  },
  {
    type: "input",
    name: "creator",
    message: "GitHub username:",
  },
  {
    type: "input",
    name: "email",
    message: "Email address:",
  },
  {
    type: "input",
    name: "contributors",
    message: "Contributors:",
    default: "",
  },
  {
    type: "input",
    name: "test",
    message: "Testing notes (if applicable):",
  },
];

// Writing README.md File
function writeToFile(fileName, data) {
  return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

// Initializing app
function init() {
  inquirer.prompt(questions).then((responses) => {
    console.log("Creating README File...");
    writeToFile("./dist/README.md", generateMarkdown({ ...responses }));
  });
}

function printAsciiArt() {
  return new Promise((resolve, reject) => {
    figlet("README GENERATOR", function(err, data) {
      if (err) {
        reject(err);
      } else {
        console.log(data);
        resolve();
      }
    });
  });
}

// Execute ASCII art printing, then initialize app
printAsciiArt()
  .then(init);