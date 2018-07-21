const twitterWidth = 1024;
const twitterHeight = 512;

var input = document.getElementById('file'),
    theImg,
    imageResult,
    blendColor = "#a2c516",
    fadeTime = 120,
    currentFilter = 'grayscale(100%)',
    currentBlend = 'multiply';

var canvasTwitter = document.getElementById('twitterImage');
canvasTwitter.width = twitterWidth;
canvasTwitter.height = twitterHeight;
var ctxTwitter = canvasTwitter.getContext('2d');

var slogan = "";

// Pass image to render function
function loadImage(src){
  var reader = new FileReader();
  reader.onload = function(e){
    imageResult = e.target.result;
    renderImageTwitter();
  };
  reader.readAsDataURL(src);

}

function renderImageTwitter(){
  var twitterImage = new Image();

  twitterImage.onload = function() {
    ctxTwitter.filter = 'none';
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
  ctxTwitter.globalCompositeOperation = 'source-over';
  ctxTwitter.fillStyle = 'white';
  ctxTwitter.textAlign = "center";
  ctxTwitter.textBaseline = 'middle';
  ctxTwitter.font = '100px Plakkaat';
  ctxTwitter.fillText(slogan, twitterWidth/2, twitterHeight/2);
}

// Download contents on canvas using filesaver.js
document.getElementById("downloadIt").onclick = function() {
  canvas.toBlob(function(blob) {
    saveAs(blob, "image.jpg");
  }, "image/jpeg", 0.9);
}


var sloganInput = document.getElementById('slogan');
sloganInput.addEventListener('keyup', function() {
     if (this.value.length > 1) {
          slogan = this.value;
          renderImageTwitter();
     }
});

// Set up filepicker button
input.addEventListener("change", function(e) {
  e.preventDefault();
  theImg = e.target.files[0];
  loadImage(theImg);
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
