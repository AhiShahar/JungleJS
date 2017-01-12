$(document).ready(function() {
  document.addEventListener("keydown", function(e) {
    if (e.code == "Space") {
      document.querySelector("h1").innerText = randomHex();
      document.body.style.background = randomHex();
    }
  });

  document.addEventListener("mousemove", function(e) {
    const hexString = e.clientY / window.innerHeight * 255;
    const satString = e.clientX / window.innerWidth * 100;
    const text = document.querySelector("h1");

    if (e.clientX < window.innerWidth / 2) {
      text.style.color = `white`;
    }
    if (e.clientX > window.innerWidth / 2) {
      text.style.color = "black";
    }
    text.innerText = `rgb(${hslToRgb(hexString/255, satString/100, satString/100)})`;
    document.body.style.background = `hsl(${hexString} ,${satString}% ,${satString}%)`
  });
});
