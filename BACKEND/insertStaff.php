<?php
require('cors.php');
require('objects.php');

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$job = $data['job'];
$phone = $data['phone'];
$salary = $data['salary'];
$worktime = $data['work_time'];
$created_by = 'M.Edriss';

$func->addStaff($name, $job, $salary, $phone, $worktime, $created_by, $date);