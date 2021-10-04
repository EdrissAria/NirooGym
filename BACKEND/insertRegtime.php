<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
require('objects.php');

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$phone = $data['phone'];
$amount = $data['amount'];
$recived = $data['recived'];
$reminder = $data['reminder'];
$playDate = $data['date'];
$time = $data['time'];
$write_by = 'M.Edriss';

 
$recived = $recived == null || $recived == 0?0:$recived;
$reminder = $recived == null || $recived == 0?$amount - $recived:$reminder;
$reminder = $recived != null || $recived != 0?$amount - $recived:$reminder; 

$func->addRegtime($name, $phone, $amount, $recived, $reminder, $time, $write_by, $playDate, $date); 