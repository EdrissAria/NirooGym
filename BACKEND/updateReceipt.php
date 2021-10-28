<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
require('objects.php');

$id = $_GET['id'];

$data = json_decode(file_get_contents("php://input"), true);

$agr_id = $data['agrId'];
$newReceipt = $data['newReceipt'];
$oldReceipt = $data['oldReceipt'];
 
$func->updateReceipt($id, $agr_id, $oldReceipt, $newReceipt, $date);