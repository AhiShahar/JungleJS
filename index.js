// Determines urlRoute based on whether local or hosted
function urlRoute() {
  if (window.location.href.includes("file") || window.location.href.includes("local")) {
    // Find the url in the data-url passed into the html element
    window.location.pathname = this.dataset.url;
  } else if (window.location.href.includes("ahishahar")) {
    window.location.href = `/JungleJS/${this.dataset.url}`;
  }
}

$(document).ready(function() {
  $(".link").on("click", urlRoute)
});
