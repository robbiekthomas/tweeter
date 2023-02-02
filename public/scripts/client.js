// Prevents XSS Attacks
const preventEscape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// HTML for single Tweet
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
  ${preventEscape(data.content.text)}
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

// Renders all tweets
const renderTweets = function (data) {
  $("#tweets-container").empty();
  for (const tweet of data) {
    createTweetElement(tweet);
  }
};

// Loads tweets from database
const loadtweets = function () {
  $.get("/tweets", function (data) {
    renderTweets(data);
  });
};

// Start up of website
$(document).ready(function () {
  loadtweets();
});

$(function () {
  // New Tweet submit button will load new tweet in or give error if requirements aren't met
  $("#submit-tweet").submit(function (event) {
    const queryString = $(this).serialize();
    const inputLength = $("#tweet-text").val().length;
    event.preventDefault();
    if (inputLength === 0) {
      $("#error-short").slideDown();
      $("#error-long").slideUp();
      return;
    }
    if (inputLength > 140) {
      $("#error-long").slideDown();
      $("#error-short").slideUp();
      return;
    }
    $.post("/tweets", queryString)
      .done(function () {
        $.get("/tweets", function (data) {
          createTweetElement(data[data.length - 1]);
        });
      })
      .fail(function () {
        alert("Server side error");
      });

    $("form :input").val("");
    $("#error-long").slideUp();
    $("#error-short").slideUp();
    $(".counter")[0].value = 140;
  });

  // New Tweet Button to show create tweet form
  $("#new-tweet-icon").click(function () {
    $("#submit-tweet").slideToggle();
  });
  // Scroll to top of padge button
  $(".scroll-up").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $("#submit-tweet").slideDown();
  });

  // Show scroll to top of page when page is scrolled down
  $(window).scroll(function () {
    if ($(window).scrollTop() > 400) {
      $(".newTweet").slideUp();
      $(".scroll-up").slideDown();
      $(".title").addClass("title-dark");
      $(".title").removeClass("title-light");
    }
    if ($(window).scrollTop() <= 400) {
      $(".newTweet").slideDown();
      $(".scroll-up").slideUp();
      $(".title").removeClass("title-dark");
      $(".title").addClass("title-light");
    }
  });
});
