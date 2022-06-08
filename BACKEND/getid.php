<?php 
require('cors.php');
require('objects.php');

print_r(json_encode($func->getUser($_GET['id'])));
