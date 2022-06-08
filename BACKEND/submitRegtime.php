<?php
require('cors.php');
require('objects.php');

$id = $_GET['id'];

$data = json_decode(file_get_contents("php://input"), true);

$status = $data['status'];
 
$func->updateRegStatus($id, $status, $date);