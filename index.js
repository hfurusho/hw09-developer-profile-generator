const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const axios = require("axios");
const generateHtml = require("./generateHtml.js");
const puppeteer = require("puppeteer");

const writeFileAsync = util.promisify(fs.writeFile);

async function printPDF(html) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.pdf({ path: "test.pdf", format: "A4", printBackground: true });

  await browser.close();
}

init();

async function init() {
  try {
    const answers = await promptUser();
    const githubData = await getGithubInfo(answers.githubUsername);
    const html = generateHtml(githubData, answers.themeColor);
    await writeFileAsync("./test.html", html);
    await printPDF(html);
  } catch (err) {
    console.log(err);
  }
}

async function getGithubInfo(username) {
  const queryUrl = `https://api.github.com/users/${username}`;
  try {
    const resp = await axios.get(queryUrl);
    return resp.data;
  } catch (err) {
    console.log(err);
  }
}

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "githubUsername",
      message: "What is your Github username?"
    },
    {
      type: "list",
      name: "themeColor",
      message: "Choose a theme color:",
      choices: ["green", "blue", "pink", "red"]
    }
  ]);
}
