<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
require('objects.php');

$id = $_GET['id'];
$earn = $_GET['earn'];

echo $func->getSingleTime($id, $earn);