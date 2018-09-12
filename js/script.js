// Current optimal image sizes for Twitter
const twitterWidth = 1024;
const twitterHeight = 512;
const instaWidth = 1080;
const instaHeight = 1350;

const logoRatio = 6.17283950617284;

const lineHeight = 1.1;
const margin = 0.85;

var input = document.getElementById('file'),
    theImg,
    imageResult,
    blendColor = "#a2c516",
    fadeTime = 120,
    currentFilter = 'grayscale(100%)',
    currentBlend = 'multiply';

var logo = new Image();
logo.src = 'img/logo.png';

var logoGreen = new Image();
logoGreen.src = 'img/logo_green.png';

var slogan = "";
var quelle = "";
var zitatgeberin = "";
var zitatfunktion = "";
var zitat = "";
var offset = 0.5;

var currentId = "";

// Pass image to render function
function loadImage(src){
  var reader = new FileReader();
  reader.onload = function(e){
    imageResult = e.target.result;
    renderImageVanilla();
    renderImageTwitter();
    renderImageTwitterZ();
    renderImageInsta();
    updateDetail(currentId);
  };
  reader.readAsDataURL(src);

}

function renderImageVanilla() {
  if(imageResult.length > 0) {
    getFlexbox('vanilla', 'Bild');
    var canvas = getCanvas('vanilla');
    var ctx = getCtx('vanilla');

    var image = new Image();
    image.onload = function() {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.filter = 'none';
      ctx.clearRect(0,0, canvas.width, canvas.height);
      ctx.fillStyle = blendColor;
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.filter = currentFilter + ' contrast(1.2)';
      ctx.globalCompositeOperation = currentBlend;
      ctx.drawImage(image, 0, 0, image.width, image.height);
    };
    image.src = imageResult;
  } else {
    removeFlexbox('vanilla');
  }
}

function renderImageInsta(){
  if(imageResult.length > 0) {
    getFlexbox('instagram', 'Instagram');
    var canvas = getCanvas('instagram');
    var ctx = getCtx('instagram');

    var image = new Image();

    image.onload = function() {
      var barHeight = (instaHeight-instaWidth)/2;

      canvas.width = instaWidth;
      canvas.height = instaHeight;

      ctx.filter = 'none';
      drawImageProp(ctx, image, 0, 0, instaWidth, instaHeight, offset);
      ctx.fillStyle = blendColor;
      ctx.globalAlpha=1;
      var gradient = ctx.createLinearGradient(0, instaHeight-barHeight*1.3, 0, instaHeight);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.50)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, instaHeight-barHeight*1.3, instaWidth, barHeight*1.3);
      ctx.globalAlpha=1;
      ctx.drawImage(logo,(instaWidth-barHeight*0.45*logoRatio)*0.5, instaHeight - barHeight*0.95, barHeight*0.45*logoRatio, barHeight*0.45);
      if(quelle.length > 0) {
        ctx.globalAlpha=1;
        ctx.fillStyle = 'white';
        ctx.textAlign = "left";
        ctx.font = '22px MarkOT';
        ctx.fillText('Foto: ' + quelle, 22, instaHeight-22);
      }
    };
    image.src = imageResult;
  } else {
    removeFlexbox('instagram');
  }
}

function renderImageTwitter(){
  if(imageResult.length > 0 && slogan.length > 0) {
    getFlexbox('twitter', 'Twitter: Slogan');
    var canvas = getCanvas('twitter');
    var ctx = getCtx('twitter');

    var twitterImage = new Image();

    twitterImage.onload = function() {
      canvas.width = twitterWidth;
      canvas.height = twitterHeight;

      ctx.filter = 'none';
      ctx.clearRect(0,0, canvas.width, canvas.height);
      ctx.fillStyle = blendColor;
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.filter = currentFilter + ' contrast(1.6)';
      ctx.globalCompositeOperation = currentBlend;
      drawImageProp(ctx, twitterImage, 0, 0, twitterWidth, twitterHeight, offset);

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'white';
      ctx.textBaseline = 'middle';

      ctx.drawImage(logo,330,414,360,360/logoRatio);
      if(slogan.length > 0) {
        ctx.textAlign = "center";
        ctx.font = '130px Plakkaat';
        if (ctx.measureText(slogan).width < twitterWidth*margin) {
          ctx.fillText(slogan, twitterWidth/2, twitterHeight/2);
        } else {
          ctx.font = '100px Plakkaat';
          if (ctx.measureText(slogan).width < twitterWidth*margin) {
            ctx.fillText(slogan, twitterWidth/2, twitterHeight/2);
          } else {
            var words = slogan.split(" ");
            let slogan1 = words.shift();
            while(ctx.measureText(slogan1).width < ctx.measureText(slogan).width/2 && words.length > 1 && ctx.measureText(slogan1 + " " + words[0]).width < twitterWidth*margin) {
              slogan1 += " " + words.shift();
            }
            let slogan2 = words.join(" ");
            if(ctx.measureText(slogan2).width < twitterWidth*margin) {
              ctx.fillText(slogan1, twitterWidth/2, twitterHeight/2-100/2*lineHeight);
              ctx.fillText(slogan2, twitterWidth/2, twitterHeight/2+100/2*lineHeight);
            } else {
              ctx.font = '80px Plakkaat';
              var words = slogan.split(" ");
              let slogan1 = words.shift();
              while(ctx.measureText(slogan1).width < ctx.measureText(slogan).width/2 && words.length > 1 && ctx.measureText(slogan1 + " " + words[0]).width < twitterWidth*margin) {
                slogan1 += " " + words.shift();
              }
              let slogan2 = words.join(" ");
              if(ctx.measureText(slogan2).width < twitterWidth*margin) {
                ctx.fillText(slogan1, twitterWidth/2, twitterHeight/2-80/2*lineHeight);
                ctx.fillText(slogan2, twitterWidth/2, twitterHeight/2+80/2*lineHeight);
              } else {
                var words = slogan2.split(" ");
                let slogan21 = words.shift();
                while(ctx.measureText(slogan21).width < ctx.measureText(slogan2).width/2 && words.length > 1 && ctx.measureText(slogan21 + " " + words[0]).width < twitterWidth*margin) {
                  slogan21 += " " + words.shift();
                }
                let slogan22 = words.join(" ");
                if(ctx.measureText(slogan22).width < twitterWidth*margin) {
                  ctx.fillText(slogan1, twitterWidth/2, twitterHeight/2-15-80*lineHeight);
                  ctx.fillText(slogan21, twitterWidth/2, twitterHeight/2-15);
                  ctx.fillText(slogan22, twitterWidth/2, twitterHeight/2-15+80*lineHeight);
                }
              }
            }
          }
        }
      }
      if(quelle.length > 0) {
        ctx.textAlign = "left";
        ctx.font = '18px MarkOT';
        ctx.fillText('Foto: ' + quelle, 32, 489);
      }
    };
    twitterImage.src = imageResult;
  } else {
    removeFlexbox('twitter');
  }
}

function renderImageTwitterZ(greyscale){
  if(imageResult.length > 0 && ( zitatgeberin.length > 0 || zitat.length > 0 || zitatfunktion.length > 0 ) ) {
    if(greyscale) {
      getFlexbox('twitter1', 'Twitter: Zitatbox Einzelperson')
      var canvas = getCanvas('twitter1');
      var ctx = getCtx('twitter1');
    } else {
      getFlexbox('twitter2', 'Twitter: Zitatbox Einzelperson')
      var canvas = getCanvas('twitter2');
      var ctx = getCtx('twitter2');
    }

    var spalte = 0.54;
    var image = new Image();

    image.onload = function() {
      canvas.width = twitterWidth;
      canvas.height = twitterHeight;

      ctx.filter = 'none';
      ctx.clearRect(0,0, canvas.width, canvas.height);
      ctx.fillStyle = blendColor;
      ctx.fillRect(0,0,canvas.width,canvas.height);


      if(greyscale) {
        ctx.filter = 'grayscale(100%)';
      } else  {
        ctx.filter = 'none';
      }
      drawImageProp(ctx, image, 0, 0, twitterWidth*0.51, twitterHeight, offset);
      ctx.drawImage(logo,twitterWidth*spalte,twitterHeight*0.84,360,360/logoRatio);

      if(quelle.length > 0) {
        ctx.fillStyle = "black";
        ctx.globalAlpha=0.35;
        ctx.fillRect(0, twitterHeight-54, twitterWidth*0.51, 54);
        ctx.fillStyle = "white";
        ctx.globalAlpha=1;
        ctx.textAlign = "left";
        ctx.font = '18px MarkOT';
        ctx.fillText('Foto: ' + quelle, 32, 489);
      }
      if(zitatgeberin.length > 0) {
        ctx.textBaseline = 'middle';
        ctx.fillStyle = "white";
        ctx.globalAlpha=1;
        ctx.textAlign = "left";
        ctx.font = 'bold 21px MarkOT';
        ctx.fillText(zitatgeberin, twitterWidth*spalte, twitterHeight*0.57);
      }
      if(zitatfunktion.length > 0) {
        ctx.textBaseline = 'middle';
        ctx.fillStyle = "white";
        ctx.globalAlpha=1;
        ctx.textAlign = "left";
        ctx.font = 'bold 21px MarkOT';
        ctx.fillText(zitatfunktion, twitterWidth*spalte, twitterHeight*0.57+21*1.2);
      }
      if(zitat.length > 0) {
        ctx.textBaseline = 'middle';
        ctx.fillStyle = "white";
        ctx.globalAlpha=1;
        ctx.textAlign = "left";
        ctx.font = '900 29px MarkOT';
        var lines = cutIntoLines(ctx, zitat, twitterWidth*0.43);
        for (var i = (lines.length)-1; i >= 0; i--) {
          ctx.fillText(lines[i], twitterWidth*spalte, twitterHeight*(0.45-(lines.length-1-i)*0.08));
        }
      }
    };
    image.src = imageResult;
  } else {
    if(greyscale) {
      removeFlexbox('twitter1');
    } else {
      removeFlexbox('twitter2');
    }
  }
}

// Download contents on canvas using filesaver.js
function download(canvas) {
  return function() {
    canvas.toBlob(function(blob) {
      saveAs(blob, "image.png");
    }, "image/png", 0.96);
  };
}

var sloganInput = document.getElementById('slogan');
sloganInput.addEventListener('keyup', function() {
  slogan = this.value.replace(/[\.\?\!\-\€\„\“\"]/g,"$& ");
  renderImageTwitter();
  updateDetail(currentId);
});

var quelleInput = document.getElementById('quelle');
quelleInput.addEventListener('keyup', function() {
  quelle = this.value;
  renderImageTwitter();
  renderImageTwitterZ(false);
  renderImageTwitterZ(true);
  renderImageInsta();
  updateDetail(currentId);
});

var zitatgeberinInput = document.getElementById('zitatgeberin');
zitatgeberinInput.addEventListener('keyup', function() {
  zitatgeberin = this.value;
  renderImageTwitterZ(false);
  renderImageTwitterZ(true);
  updateDetail(currentId);
});
var zitatfunktionInput = document.getElementById('zitatfunktion');
zitatfunktionInput.addEventListener('keyup', function() {
  zitatfunktion = this.value;
  renderImageTwitterZ(false);
  renderImageTwitterZ(true);
  updateDetail(currentId);
});
var zitatInput = document.getElementById('zitat');
zitatInput.addEventListener('keyup', function() {
  zitat = this.value;
  renderImageTwitterZ(false);
  renderImageTwitterZ(true);
  updateDetail(currentId);
});

$( "#ausschnitt" ).change(function() {
  offset = parseFloat($( this ).val());
  renderImageVanilla();
  renderImageTwitter();
  renderImageTwitterZ();
  renderImageInsta();
  updateDetail(currentId);
});

// Set up filepicker button
input.addEventListener("change", function(e) {
  e.preventDefault();
  theImg = e.target.files[0];
  loadImage(theImg);
}, true);


function cutIntoLines(ctx, text, width) {
  var words = text.split(" ");
  var lines = [];
  for(var i = 0; words.length > 0; i++) {
    lines[i] = words.shift();
    while(ctx.measureText(lines[i] + " " + words[0]).width < width && words.length > 0) {
      lines[i] += " " + words.shift();
    }
  }
  return lines;
}

function drawImageProp(ctx, img, x, y, w, h, offset) {

    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }

    // default offset is center
    offset = typeof offset === "number" ? offset : 0.5;

    // keep bounds [0.0, 1.0]
    if (offset < 0) offset = 0;
    if (offset > 1) offset = 1;

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

    cx = (iw - cw) * offset;
    cy = (ih - ch) * offset;

    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
}

function getFlexbox(id, text) {
  if (!(document.getElementById(id))) {
    var node = document.createElement("div");
    node.setAttribute('class', 'flexBox');
    node.setAttribute('id', id);
    node.innerHTML = '<div class="imageBox"><div class="card-up"><canvas class="finalImage"></canvas></div><div class="card-down"><span class="bezeichnung">' + text + '</span></div></div>'
    // node.getElementsByClassName('download')[0].onclick = download(node.getElementsByClassName('finalImage')[0]);

    var parent = document.getElementById('overviewPart');
    parent.insertBefore(node, parent.firstChild);
    $(function() {
      $("#" + id).on('click', function(){
        $("#" + id).parent().children().each(function () {
          $(this).removeClass('active');
        });
        $("#" + id).addClass("active");
        $("#detailPart .bezeichnung").text(text);
        var oldCanvas = $("#"+id + " .finalImage")[0];
        var newCanvas = $("#detailPart .finalImage")[0];
        newCanvas.width = oldCanvas.width;
        newCanvas.height = oldCanvas.height;
        newCanvas.getContext('2d').drawImage(oldCanvas, 0, 0);
        currentId = id;
      });
    });
  }
  return document.getElementById(id);
}

function removeFlexbox(id) {
  if(document.getElementById(id)) {
    var elem = document.getElementById(id);
    elem.parentNode.removeChild(elem);
  }
  return false;
}

function getCanvas(id) {
  return getFlexbox(id).getElementsByClassName('finalImage')[0];
}

function getCtx(id) {
  return getCanvas(id).getContext('2d');
}

$(function() {
  $("#downloadMain").on('click', function(){
    var node = document.getElementById('detailPart');
    node.getElementsByClassName('download')[0].onclick = download(node.getElementsByClassName('finalImage')[0]);
  });
});

function updateDetail(id) {
  node = document.getElementById(id);
  if(node != null) {
    node.click();
  }
}
