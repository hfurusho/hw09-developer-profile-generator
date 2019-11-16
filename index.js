const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const axios = require("axios");
const generateHtml = require("./generateHtml.js");

const writeFileAsync = util.promisify(fs.writeFile);

init();

async function init() {
  try {
    const answers = await promptUser();
    const githubData = await getGithubInfo(answers.githubUsername);
    const html = generateHtml(githubData, answers.favoriteColor);
    writeFileAsync("./test.html", html);
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
      type: "input",
      name: "favoriteColor",
      message: "What is your favorite color?"
    }
  ]);
}

// Profile image
// User name
// Links to the following:
// User location via Google Maps
// User GitHub profile
// User blog

// User bio
// Number of public repositories
// Number of followers
// Number of GitHub stars
// Number of users following

// {
//   data:
//    { login: 'hfurusho',
//      id: 51175640,
//      node_id: 'MDQ6VXNlcjUxMTc1NjQw',
//      avatar_url: 'https://avatars3.githubusercontent.com/u/51175640?v=4',
//      gravatar_id: '',
//      url: 'https://api.github.com/users/hfurusho',
//      html_url: 'https://github.com/hfurusho',
//      followers_url: 'https://api.github.com/users/hfurusho/followers',
//      following_url:
//       'https://api.github.com/users/hfurusho/following{/other_user}',
//      gists_url: 'https://api.github.com/users/hfurusho/gists{/gist_id}',
//      starred_url:
//       'https://api.github.com/users/hfurusho/starred{/owner}{/repo}',
//      subscriptions_url: 'https://api.github.com/users/hfurusho/subscriptions',
//      organizations_url: 'https://api.github.com/users/hfurusho/orgs',
//      repos_url: 'https://api.github.com/users/hfurusho/repos',
//      events_url: 'https://api.github.com/users/hfurusho/events{/privacy}',
//      received_events_url: 'https://api.github.com/users/hfurusho/received_events',
//      type: 'User',
//      site_admin: false,
//      name: 'Harry H. Furusho',
//      company: null,
//      blog: '',
//      location: 'Seattle',
//      email: null,
//      hireable: null,
//      bio: null,
//      public_repos: 12,
//      public_gists: 1,
//      followers: 4,
//      following: 5,
//      created_at: '2019-05-29T19:38:37Z',
//      updated_at: '2019-11-11T21:04:17Z' } }
