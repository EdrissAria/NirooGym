<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
require('objects.php');

$data = json_decode(file_get_contents('php://input'), true);

$loaner = $data['loaner'];
$phone = $data['phone'];
$amount = $data['amount'];
$descrition = $data['description'];

$func->addLoan($loaner, $phone, $amount, $descrition, $date);