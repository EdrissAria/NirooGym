<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
require('objects.php');

$id = $_GET['id'];

$data = json_decode(file_get_contents("php://input"), true);
 
$amount = $data['amount'];
$recived = $data['recived'];
$reminder = $data['recived'];
$date = $data['date'];
$time = $data['time'];

$recived = $recived == null || $recived == 0?0:$recived;
$reminder = $recived == null || $recived == 0?$amount - $recived:$reminder;
$reminder = $recived != null || $recived != 0?$amount - $recived:$reminder;
 
$func->updateReg($id , $amount,  $recived, $reminder, $date, $time);