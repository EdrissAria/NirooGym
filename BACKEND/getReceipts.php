<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
require('objects.php');

$id = $_GET['id'];

print_r(json_encode($func->getReceipts($id)));