<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
require('objects.php');

$data = json_decode(file_get_contents('php://input'), true);

$agr_id = $data['agr_id'];
$custommer_id = $data['custommer_id'];
$name = $data['name'];
$phone = $data['phone'];
$amount = $data['amount'];
$recived = $data['recived'];
$reminder = $data['reminder'];
$playDate = $date;
$entry_date = $data['entry_date'];
$time = $data['time'];
$wrote_by = $data['wrote_by'];

$recived = $recived == null || $recived == 0?0:$recived;
$reminder = $recived == null || $recived == 0?$amount - $recived:$reminder;
$reminder = $recived != null || $recived != 0?$amount - $recived:$reminder; 

$func->addRegAgrtime($agr_id, $custommer_id, $name, $phone, $amount, $recived, $reminder, $entry_date, $playDate, $time, $wrote_by, $date); 