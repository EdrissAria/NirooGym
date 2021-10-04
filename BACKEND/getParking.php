<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
require('objects.php');

print_r(json_encode($func->getData('parking')));
