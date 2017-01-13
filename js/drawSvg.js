// Function for drawing path's on an invisible svg
$.fn.animatePath = function(time = 2) {
  // Find the total path length
  var pathLength = this[0].getTotalLength();
  // Set the line gap to equal the path length
  $(this).css({
    "stroke-dasharray": pathLength,
    "stroke-dashoffset": pathLength
  });
  // Set the parents css to visible
  $(this).parents("svg").css({"opacity": 1});
  // requires a set timeout so this is performed after setting the path length
  setTimeout(() => {
    $(this).css({
      // Draw the line
      "stroke-dashoffset": "0px",
      // Set the period of time equal to the parameter
      "transition": `${time}s`
    });
  }, 0);
};
