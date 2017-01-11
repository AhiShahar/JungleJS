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
  if (partialArr[1]) rgbPartial += parseInt(partialArr[1]);
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

  // Add transition to the background
  $("body").css("transition", "background 0.5s");

  // Save the input node
  const inputHex = $("#hex");

  // add event listener, on KEYUP test for length and proceed
  inputHex.on("keyup", function(){
    const inputValue = $("#hex").val();
    if ( inputValue.length === 3 || inputValue.length === 6) {
      const converted = breakAndRebuild(inputValue);
      if (converted === "You're an idiot") return $("#rgb").val(converted);
      const cssTemplate = `rgba(${converted},1)`;
      $("body").css("background", `#${inputValue}`);
      $("#rgb").val(cssTemplate);
    }
  });

});
