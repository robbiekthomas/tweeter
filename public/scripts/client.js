const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

const renderTweets = function (data) {
  for (const tweet of data) {
    createTweetElement(tweet);
  }
};

const createTweetElement = function (data) {
  const $tweet = $(`
  <article class="tweet-item">
  <header class="tweet-header">
    <div class="user-avatar">
      <img src="${data.user.avatars}" />
      <h5 class="user-name">${data.user.name}</h5>
    </div>
    <h5 class="tag-name">${data.user.handle}</h5>
  </header>
  <p class="tweet-content">
  ${data.content.text}
  </p>
  <footer class="tweet-footer">
    <p class="tweet-time">${data.created_at}</p>
    <div class="icon-list">
      <i class="fa-solid fa-flag icon"></i>
      <i class="fa-solid fa-retweet icon"></i>
      <i class="fa-solid fa-heart icon"></i>
    </div>
  </footer>
</article>>
  `);
  $("#tweets-container").append($tweet[0]);
};

$(document).ready(function () {
  renderTweets(data);
});
