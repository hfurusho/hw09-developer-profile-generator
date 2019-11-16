function generateHtml(githubData) {
  const {
    avatar_url: imgUrl,
    name,
    location,
    html_url: githubUrl,
    blog: blogUrl,
    bio,
    followers,
    public_gists: stars,
    following
  } = githubData;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="./assets/css/styles.css" />
    <title>${name}'s Profile</title>
  </head>
  <body>
    <div class="top">
      <!-- <div class="img-container"> -->
      <img src="https://picsum.photos/300/300" alt="" />
      <!-- </div> -->
      <h1>
        <p>Hello!</p>
        <p>My name is ${name}!</p>
      </h1>
      <p class="bio">
        <h6>Currently @ Trilogy Education Services</h6>
      </p>
      <div>
        <a href="http://" target="_blank" rel="noopener noreferrer"
          >${location}</a
        >
        <a href="${githubUrl}" target="_blank" rel="noopener noreferrer"
          >GitHub</a
        >
        <a href="${blogUrl}" target="_blank" rel="noopener noreferrer"
          >My Blog</a
        >
      </div>
    </div>
    <div class="middle">
      <h2>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </h2>
      <div class="grid-container">
        <div class="card item-1">Public Repositories</div>
        <div class="card item-2">Followers</div>
        <div class="card item-3">GitHub Stars</div>
        <div class="card item-4">Following</div>
      </div>
    </div>
  </body>
</html>
`;
}

module.exports = generateHtml;
