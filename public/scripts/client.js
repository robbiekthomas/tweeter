const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
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
  ${escape(data.content.text)}
  </p>
  <footer class="tweet-footer">
    <p class="tweet-time">${timeago.format(data.created_at)}</p>
    <div class="icon-list">
      <i class="fa-solid fa-flag icon"></i>
      <i class="fa-solid fa-retweet icon"></i>
      <i class="fa-solid fa-heart icon"></i>
    </div>
  </footer>
</article>>
  `);
  $("#tweets-container").prepend($tweet[0]);
};

const renderTweets = function (data) {
  for (const tweet of data) {
    createTweetElement(tweet);
  }
};

const loadtweets = function () {
  $.get("/tweets", function (data) {
    renderTweets(data);
  });
};

$(document).ready(function () {
  loadtweets();
});

$(function () {
  $("#submit-tweet").submit(function (event) {
    const queryString = $(this).serialize();
    event.preventDefault();
    if (queryString.length <= 5) {
      $('#error-short').slideDown();
      return;
    }
    if (queryString.length >= 145) {
      $('#error-long').slideDown();
      return;
    }
    $.post("/tweets", queryString).done(function () {
      $.get("/tweets", function (data) {
        createTweetElement(data[data.length - 1]);
      });
    });
    $("form :input").val("");
    $('#error-long').slideUp();
    $('#error-short').slideUp();
  });
});
