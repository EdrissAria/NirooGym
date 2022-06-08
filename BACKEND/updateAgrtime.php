<?php
require('cors.php');
require('objects.php');

$id = $_GET['id'];

$data = json_decode(file_get_contents("php://input"), true);
 
$amount = $data['amount'];
$recived = $data['recived'];
$startDate = $data['startDate'];
$playDays = $data['playDays'];
$endDate = $data['endDate'];
$time = $data['time'];
$wrote_by = "M.Edriss";

$recived = $recived == null?0:$recived;

$endDate = $endDate == null?'undecided':$endDate;
 
$play_days = json_encode(implode(",", array_values($playDays)));

$func->updateAgr($id, $amount, $recived, 
$startDate, $play_days, $endDate, $time, $wrote_by, $date);