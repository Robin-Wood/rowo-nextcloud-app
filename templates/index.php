<?php
script('robinwoodapp', 'FileSaver');
script('robinwoodapp', 'script');
style('robinwoodapp', 'style');
?>

<div id="app">
	<div id="app-navigation">
		<div id="app-settings-content">
			<p>Dieses Werkzeug wandelt Bilder in schwarz-grüne Bilder für ROBIN WOOD-Veröffentlichungen um.</p>
			<label>
				<span>Bild-Datei</span>
				<input type="file" name="file" id="file" accept="image/*" capture>
			</label>
			<label>
				<span>Slogan</span>
				<input type="text" id="slogan" />
			</label>
			<label>
				<span>Bildquelle</span>
				<input type="text" id="quelle" />
			</label>
		</div>
	</div>
	<div id="app-content">
		<div id="app-content-wrapper">
			<?php print_unescaped($this->inc('content/index')); ?>
		</div>
	</div>
</div>
