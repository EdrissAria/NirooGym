<?php
require('cors.php');
require('objects.php');

$earn = $_GET['earn'];

print_r(json_encode($func->getEarn($earn)));