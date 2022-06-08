<?php
require('cors.php');
require('objects.php');

$id = $_GET['id'];

$data = json_decode(file_get_contents("php://input"), true);

$agr_id = $data['agrId'];
$newReceipt = $data['newReceipt'];
$oldReceipt = $data['oldReceipt'];
 
$func->updateReceipt($id, $agr_id, $oldReceipt, $newReceipt, $date);