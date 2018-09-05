<?php
script('robinwoodapp', 'FileSaver');
script('robinwoodapp', 'script');
style('robinwoodapp', 'style');
?>

<div id="app">
	<div id="app-navigation">
		<div id="app-settings-content">
			<p>Dieses Werkzeug wandelt Bilder in schwarz-grüne Bilder für ROBIN WOOD-Veröffentlichungen um<span class="fontpreload">.</span></p>
			<label>
				<span>Bild-Datei</span>
				<input type="file" name="file" id="file" accept="image/*" capture>
			</label>
			<label>
				<span>Ausschnitt</span>
				<input type="range" min="0" max="1" value="0.5" class="slider" id="myRange">
			</label>
			<label>
				<span>Bildquelle</span>
				<input type="text" id="quelle" />
			</label>
			<strong>Slogan</strong>
			<label>
				<span>Slogan</span>
				<input type="text" id="slogan" />
			</label>
			<strong>Zitatbox</strong>
			<label>
				<span>Zitat</span>
				<input type="text" id="zitat" />
			</label>
			<label>
				<span>Zitatgeber*in</span>
				<input type="text" id="zitatgeberin" />
			</label>
			<label>
				<span>Zitatgeber*in Funktion</span>
				<input type="text" id="zitatfunktion" />
			</label>
		</div>
	</div>
	<div id="app-content">
		<div id="app-content-wrapper">
			<div class="section screen"></div>
		</div>
	</div>
</div>
