$.fn.rainbowText = function () {
    for (var _i = 0, _a = this; _i < _a.length; _i++) {
        var item = _a[_i];
        var letters = item.innerText.split("");
        item.innerText = "";
        var count = 0;
        var results = [];
        for (var _b = 0, letters_1 = letters; _b < letters_1.length; _b++) {
            var letter = letters_1[_b];
            var color = count * (Math.random() * 255 / letters.length);
            var stuff = document.createElement("span");
            stuff.innerText = letter;
            stuff.style.color = "hsl(" + color + ", 40%, 50%)";
            item.append(stuff);
            count++;
        }
    }
};

randomHex = function() {
  const result = []
  for (var i = 0; i < 6; i++) {
    result.push(Math.floor(Math.random() * 16).toString(16));
  }
  return "#" + result.join("");
}
