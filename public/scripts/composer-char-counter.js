$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    let counterItem = $(this).parent().children("div").children("output")[0];
    counterItem.value = 140 - this.value.length;
    if (this.value.length > 140) {
      $(counterItem).addClass('redColor');
    }
    if (this.value.length <= 140) {
      $(counterItem).removeClass('redColor');
    }
  });
});
