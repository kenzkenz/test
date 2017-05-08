<?php
    $url = $_GET['url'];
    header('Content-type:image/png');
    echo file_get_contents($url);
?>