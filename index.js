function urlRoute() {
  if (window.location.href.includes("file") || window.location.href.includes("local")) {
    window.location.pathname = this.dataset.url;
  } else if (window.location.href.includes("ahishahar")) {
    window.location.href = `/JungleJS/${this.dataset.url}`;
  }
}

$(document).ready(function() {
  $(".link").on("click", urlRoute)
});
