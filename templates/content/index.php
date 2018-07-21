<div class="section screen">
  <div class="inputs">
    <label>
      <span>Slogan</span>
      <input type="text" id="slogan" />
    </label>
  </div>
  <div class="screen1">
    <div class="imageBox">
      <div id="dropZone">
        <div>
          <p>Dieses Werkzeug wandelt Bilder in schwarz-grüne Bilder für ROBIN WOOD-Veröffentlichungen um.</p>
          <p>Bild hier hereinziehen oder unten hochladen<span class="fontpreload">.</span></p>
        </div>
      </div>
      <div class="controls">
        <input type="file" name="file" id="file" accept="image/*" capture>
      </div>
    </div>
  </div>

  <div class="screen2">
    <div class="imageBox">
	     <canvas id="image" class="finalImage"></canvas>
       <div class="controls">
         <button id="downloadIt" class="primary">Herunterladen</button>
         <button id="startOver" class="">Anderes Bild hochladen</button>
       </div>
    </div>
  </div>

  <div class="outputs">
    <div class="imageBox">
      <canvas id="twitterImage" class="finalImage"></canvas>
    </div>
  </div>
</div>
