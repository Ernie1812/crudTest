<?php
require_once('settings.php');
$link = mysqli_connect(DB_HOST, DB_USER, DB_PASS);

if ($link) {
    echo "connected";
} else {
    echo "ERROR ". mysqli_connect_error();
}


?>