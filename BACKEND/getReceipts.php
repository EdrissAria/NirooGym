<?php
require('cors.php');
require('objects.php');

$id = $_GET['id'];

print_r(json_encode($func->getReceipts($id)));