<?php
require('cors.php');
require('objects.php');

$data = json_decode(file_get_contents('php://input'), true);

$loaner = $data['loaner'];
$phone = $data['phone'];
$amount = $data['amount'];
$descrition = $data['description'];
 

$func->addLoan($loaner, $phone, $amount, $descrition, $date);