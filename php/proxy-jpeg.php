<?php
    $url = $_GET['url'];
    header("Content-type:image/jpeg");
    echo file_get_contents($url);
?>