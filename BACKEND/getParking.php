<?php 
require('cors.php');
require('objects.php');

print_r(json_encode($func->getData('parking')));
