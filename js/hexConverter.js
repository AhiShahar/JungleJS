const values = {
  A : 10,
  B : 11,
  C : 12,
  D : 13,
  E : 14,
  F : 15
};

// Will take 2 digits of hex at a time and convert them to R, G, B
function converter(hexPartial) {
  const partialArr = hexPartial.split('');
  for (let i in partialArr) {
    if (isNaN(partialArr[i])) {
      partialArr[i] = values[partialArr[i].toUpperCase()];
    }
  }
  let rgbPartial = partialArr[0]*16;
  rgbPartial += parseInt(partialArr[1] || partialArr[0]);
  return rgbPartial;
}

// Will get a 6 or 3 digit code
  // Break it into 3 parts
  // Send each part to the convertor
  // Return a string matching an RGB code
function breakAndRebuild(hex) {
  let hexArr;
  if (hex.length === 6) {
    hexArr = hex.match(/.{2}/g);
  } else {
    hexArr = hex.match(/.{1}/g);
  }
  let rgbCode = [];
  for (const partial of hexArr) {
    const rgbPartial = converter(partial)
    if (isNaN(rgbPartial)) {
      return "You're an idiot";
    }
    rgbCode.push(rgbPartial);
  }
  return rgbCode.join(",")
}


$(document).ready(function() {
  // Save the input node
  const inputHex = $("#hex");

  // a function that will be called by event listeners, to check input values and proccess them
  function doMagic(value) {
    const inputValue = value;
    if ( inputValue.length === 3 || inputValue.length === 6) {
      const converted = breakAndRebuild(inputValue);
      if (converted === "You're an idiot") return $("#rgba").val(converted);
      const opacity = $("#opacity").val();
      const cssTemplate = `rgba(${converted},${opacity})`;
      $("body").css("background", cssTemplate);
      $("#rgba").val(cssTemplate);
      inputHex.val(inputValue);
    }
  }

  // Add transition to the background
  $("body").css("transition", "background 0.35s");

  // add event listener on KEYUP
  inputHex.on("keyup", function(){
    const value = $("#hex").val();
    doMagic(value);
  });

  const opacity = $("input");
  opacity.on("input", function () {
    const inputValue = $("#hex").val();
    doMagic(inputValue);
  });

    $("#colorPick").on("input", function() {
      console.log(Math.round(this.value).toString(16));
      doMagic(Math.round(this.value).toString(16))
    });

});
