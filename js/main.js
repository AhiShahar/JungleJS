// Make sure all elements have loaded
// Find the input
// Add an event listener
  // Get the current value
  // Set the browser base font size
window.onload = function () {
  const rangeInput = document.querySelector("input");
  rangeInput.addEventListener("input", function () {
    let currentVal = rangeInput.value;
    document.querySelector("html").style.fontSize = rangeInput.value + "px";
  });
};
