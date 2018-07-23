// Current optimal image sizes for Twitter
const twitterWidth = 1024;
const twitterHeight = 512;

const logoRatio = 6.17283950617284;

var input = document.getElementById('file'),
    theImg,
    imageResult,
    blendColor = "#a2c516",
    fadeTime = 120,
    currentFilter = 'grayscale(100%)',
    currentBlend = 'multiply';

var logo = new Image();
logo.src = 'img/logo.png';

var canvasVanilla = document.getElementById('vanillaImage');
var ctxVanilla = canvasVanilla.getContext('2d');

var canvasTwitter = document.getElementById('twitterImage');
canvasTwitter.width = twitterWidth;
canvasTwitter.height = twitterHeight;
var ctxTwitter = canvasTwitter.getContext('2d');

var canvasTwitterZ = document.getElementById('twitterZitatImage');
canvasTwitterZ.width = twitterWidth;
canvasTwitterZ.height = twitterHeight;
var ctxTwitterZ = canvasTwitterZ.getContext('2d');

var slogan = "";
var quelle = "";

// Pass image to render function
function loadImage(src){
  var reader = new FileReader();
  reader.onload = function(e){
    imageResult = e.target.result;
    renderImageVanilla(ctxVanilla);
    renderImageTwitter(ctxTwitter);
    renderImageTwitterZ(ctxTwitterZ);
  };
  reader.readAsDataURL(src);

}

function renderImageVanilla(ctx) {
  var image = new Image();

  image.onload = function() {
    canvasVanilla.width = image.width;
    canvasVanilla.height = image.height;
    ctx.filter = 'none';
    ctx.clearRect(0,0, canvasVanilla.width, canvasVanilla.height);
    ctx.fillStyle = blendColor;
    ctx.fillRect(0,0,canvasVanilla.width,canvasVanilla.height);
    ctx.filter = currentFilter + ' contrast(1.2)';
    ctx.globalCompositeOperation = currentBlend;
    ctx.drawImage(image, 0, 0, image.width, image.height);
  };
  image.src = imageResult;
}

function renderImageTwitter(ctx){
  var twitterImage = new Image();

  twitterImage.onload = function() {
    ctx.filter = 'none';
    ctx.clearRect(0,0, canvasTwitter.width, canvasTwitter.height);
    ctx.fillStyle = blendColor;
    ctx.fillRect(0,0,canvasTwitter.width,canvasTwitter.height);
    ctx.filter = currentFilter + ' contrast(1.6)';
    ctx.globalCompositeOperation = currentBlend;
    drawImageProp(ctx, twitterImage, 0, 0, twitterWidth, twitterHeight);
    renderTwitterText(ctx);
  };
  twitterImage.src = imageResult;
}

function renderTwitterText(ctx) {
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'white';
  ctx.textBaseline = 'middle';

  ctx.drawImage(logo,330,414,364,364/logoRatio);
  if(slogan.length > 0) {
    ctx.textAlign = "center";
    ctx.font = '100px Plakkaat';
    const length = ctx.measureText(slogan);
    if (length < twitterWidth*0.8) {
      ctx.fillText(slogan, twitterWidth/2, twitterHeight/2);
    } else {

    }
  }
  if(quelle.length > 0) {
    ctx.textAlign = "left";
    ctx.font = '18px MarkOT';
    ctx.fillText('Foto: ' + quelle, 32, 489);
  }
}

function renderImageTwitterZ(ctx){
  var image = new Image();

  image.onload = function() {
    ctx.filter = 'none';
    ctx.clearRect(0,0, canvasTwitterZ.width, canvasTwitterZ.height);
    ctx.fillStyle = blendColor;
    ctx.fillRect(0,0,canvasTwitterZ.width,canvasTwitterZ.height);
    drawImageProp(ctx, image, 0, 0, twitterWidth*0.51, twitterHeight);

    if(quelle.length > 0) {
      ctx.fillStyle = "black";
      ctx.globalAlpha=0.35;
      ctx.fillRect(0, twitterHeight-54, twitterWidth*0.51, 54);
      ctx.globalAlpha=1;
      ctx.textAlign = "left";
      ctx.font = '18px MarkOT';
      ctx.fillText('Foto: ' + quelle, 32, 489);
    }
  };
  image.src = imageResult;
}

// Download contents on canvas using filesaver.js
document.getElementById("downloadItVanilla").onclick = function() {
  canvasVanilla.toBlob(function(blob) {
    saveAs(blob, "image.jpg");
  }, "image/jpeg", 0.9);
}

document.getElementById("downloadItTwitter").onclick = function() {
  canvasTwitter.toBlob(function(blob) {
    saveAs(blob, "image.jpg");
  }, "image/jpeg", 0.95);
}


var sloganInput = document.getElementById('slogan');
sloganInput.addEventListener('keyup', function() {
  slogan = this.value;
  renderImageTwitter(ctxTwitter);
});

var quelleInput = document.getElementById('quelle');
quelleInput.addEventListener('keyup', function() {
  quelle = this.value;
  renderImageTwitter(ctxTwitter);
  renderImageTwitterZ(ctxTwitterZ);
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
