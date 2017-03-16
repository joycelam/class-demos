$(function() {


//define the colours
  var colors = [ '#ffffff', 'red', 'cyan', 'lime', 'yellow', 'pink', 'purple', 'orange', '#000000', 'coral'],
    color;
//when a person clicks
  $('body').click(function() {
    //generate a random color from the colours I defined
    var randColor;
    do {
      //using math, i want random number from the amount of colours I have defined
      randColor = colors[Math.floor(Math.random() * colors.length)];
    } while (color == randColor);
    
    // change the css background with the randocolor generated
    $('body').css('background-color', randColor);
    color = randColor;
  });
});
