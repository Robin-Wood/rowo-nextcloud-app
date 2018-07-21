const twitterWidth = 1024;
const twitterHeight = 512;


var canvas = document.getElementById('image'),
    input = document.getElementById('file'),
    theImg,
    imageResult,
    blendColor = "#a2c516",
    ctx = canvas.getContext('2d'),
    fadeTime = 120,
    currentFilter = 'grayscale(100%)',
    currentBlend = 'multiply';

var canvasTwitter = document.getElementById('twitterImage');
canvasTwitter.width = twitterWidth;
canvasTwitter.height = twitterHeight;
var ctxTwitter = canvasTwitter.getContext('2d');


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

  twitterImage.onload = function() {
    ctxTwitter.clearRect(0,0, canvasTwitter.width, canvasTwitter.height);
    ctxTwitter.fillStyle = blendColor;
    ctxTwitter.fillRect(0,0,canvasTwitter.width,canvasTwitter.height);
    ctxTwitter.filter = currentFilter + ' contrast(1.4)';
    ctxTwitter.globalCompositeOperation = currentBlend;
    drawImageProp(ctxTwitter, twitterImage, 0, 0, twitterWidth, twitterHeight);
    renderTwitterText();
  };
  twitterImage.src = imageResult;
}

function renderTwitterText() {
  ctxTwitter.globalCompositeOperation = "sourceOver";
  ctxTwitter.fillStyle = 'white';
  ctxTwitter.textAlign = "center";
  ctxTwitter.fillText("ENDE GELÄNDE", twitterWidth, twitterHeight/2);
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


function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }

    // default offset is center
    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;

    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;

    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx, cy, cw, ch, ar = 1;

    // decide which gap to fill
    if (nw < w) ar = w / nw;
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
    nw *= ar;
    nh *= ar;

    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
}
