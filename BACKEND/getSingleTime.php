<?php
require('cors.php');
require('objects.php');

$id = $_GET['id'];
$earn = $_GET['earn'];

echo $func->getSingleTime($id, $earn);