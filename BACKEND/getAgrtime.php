<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
require('objects.php');

$status = $_GET['status'];

print_r(json_encode($func->getAgrtime($status)));

