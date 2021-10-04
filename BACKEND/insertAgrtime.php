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
$total = $data['total'];
$startDate = $data['startDate'];
$playDays = $data['playDays'];
$endDate = $data['endDate'];
$time = $data['time'];
$wrote_by = "M.Edriss";

$recived = $recived == null?0:$recived;
$reminder = $reminder == null?0:$reminder;
$total = $total == null?0:$total;
$endDate = $endDate == null?'undecided':$endDate;
 
$play_days = json_encode(implode(",", array_values($playDays)));

$func->addAgrtime($name, $phone, $amount, $recived, $reminder,$total,
$startDate, $play_days, $endDate, $time, $wrote_by, $date);