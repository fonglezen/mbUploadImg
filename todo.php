<?php
	

	$imgsrc = $_POST['dataurl'];
	$time = time();
	$picpath = 'upload/'.$time.'.jpg';
	$data = base64_decode($imgsrc);
	file_put_contents($picpath, $data);
	echo $picpath;
?>