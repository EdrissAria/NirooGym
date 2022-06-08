<?php 
require('cors.php');
require('objects.php');

$status = $_GET['status'];

print_r(json_encode($func->getAgrtime($status)));

