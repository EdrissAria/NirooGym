<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
require('objects.php');

$id = $_GET['id'];

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'];
$job = $data['job'];
$phone = $data['phone'];
$salary = $data['salary'];
$worktime = $data['work_time'];
 
$func->updateStaff($id, $name, $job, $phone,  $salary, $worktime);