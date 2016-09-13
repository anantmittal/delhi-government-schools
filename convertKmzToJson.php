<?php
	$directory    = '/home/batman/Documents/Delhi-govt/kmzdata/MCD';
	$all_files = scandir($directory);
	//print_r($all_files);exit;
	$pdf_files = array();
	for($i=2;$i<sizeof($all_files);$i++){
		$file = '/home/batman/Documents/Delhi-govt/kmzdata/MCD/'.$all_files[$i];
		//echo $file.PHP_EOL;
		$dest_file = basename($file, ".kmz");
		//echo $dest_file.PHP_EOL;
		$cmd = "ogr2ogr -f GeoJSON "."/home/batman/Documents/Delhi-govt/kmzdata/MCD/json/".$dest_file.".json ".$file;
		//echo $cmd;exit;
		echo exec($cmd);
		//exit;
	}
?>
