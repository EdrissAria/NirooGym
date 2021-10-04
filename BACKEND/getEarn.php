<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Support-Methods: *');
require('objects.php');

$earn = $_GET['earn'];

print_r(json_encode($func->getEarn($earn)));