<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
require('objects.php');

$data = json_decode(file_get_contents('php://input'), true);

$expense = $data['expense'];
$amount = $data['amount'];
$write_by = $data['write_by']; 

$func->addExpense($expense, $amount, $write_by, $date);