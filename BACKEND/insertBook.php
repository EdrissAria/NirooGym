<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
require('objects.php');

$data = json_decode(file_get_contents('php://input'), true);

$userId = 12;
$description = $data['description'];
$amount = $data['amount'];
$take_by = 'M.edriss';
 
$func->addBook($userId, $amount, $description, $take_by, $date);