
var canvas = document.getElementById('image'),
    canvasTwitter = document.getElementById('twitter'),
    input = document.getElementById('file'),
    theImg,
    imageResult,
    blendColor = "#a2c516",
    ctx = canvas.getContext('2d'),
    ctxTwitter = canvasTwitter.getContext('2d'),
    fadeTime = 120,
    currentFilter = 'grayscale(100%)',
    currentBlend = 'multiply';

// Pass image to render function
function loadImage(src){
  var reader = new FileReader();
  reader.onload = function(e){
    imageResult = e.target.result;
    renderImage();
    renderImageTwitter();
  };
  reader.readAsDataURL(src);

}


// Draw image to canvas and apply filters
function renderImage(){
  var image = new Image();

  image.onload = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.fillStyle = blendColor;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.filter = currentFilter + ' contrast(1.2)';
    ctx.globalCompositeOperation = currentBlend;
    ctx.drawImage(image, 0, 0, image.width, image.height);
  };

  image.src = imageResult;
}

function renderImageTwitter(){
  var twitterImage = new Image();

  twitterImage.onload = function() {}
    ctxTwitter.clearRect(0,0, canvasTwitter.width, canvasTwitter.height);
    ctx.fillStyle = blendColor;
  };
  twitterImage.src = imageResult;
}

// Download contents on canvas using filesaver.js
document.getElementById("downloadIt").onclick = function() {
  canvas.toBlob(function(blob) {
    saveAs(blob, "image.jpg");
  }, "image/jpeg", 0.9);
}


// Go back to first step and reset canvas
document.getElementById("startOver").onclick = function() {
  screenFade();
}


// Fade between stages of the screen
function screenFade(){
  // Go from step 1 to step 2
  if($('.screen1').is(':visible')){
    $('.screen1').fadeOut(fadeTime, function(){
      $('.screen2').fadeIn(fadeTime, function(){
        $('#image').animate({
          marginTop: '0',
          opacity: '1'
        }, 300);
      });
    });
  }
  // Go from step 2 to step 1 and clear the canvas
  else {
    $('.screen2').fadeOut(fadeTime, function(){
      $('.screen1').fadeIn();
      $('#image').css({
        marginTop: '10px',
        opacity: '0'
      });
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  }
}

// Set up dropzone
var target = document.getElementById('dropZone');
target.addEventListener("dragover", function(e){e.preventDefault();}, true);
target.addEventListener("drop", function(e){
	e.preventDefault();
  theImg = e.dataTransfer.files[0];
	loadImage(theImg);
  screenFade();
}, true);

// Set up filepicker button
input.addEventListener("change", function(e) {
  e.preventDefault();
  theImg = e.target.files[0];
  loadImage(theImg);
  screenFade();
}, true);
