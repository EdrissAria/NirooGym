<?php
require('cors.php'); 
require('objects.php');

$all = getallheaders();
$token = $all['Authorization'];
$func->auth($token);
