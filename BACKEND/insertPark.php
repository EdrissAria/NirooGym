<?php
require('cors.php');
require('objects.php');

$data = json_decode(file_get_contents('php://input'), true);


$vehicle = $data['vehicle'];
$amount = $data['amount'];
 

$func->addPark($vehicle, $amount, $date);
