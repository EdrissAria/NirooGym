<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
require('objects.php');

 
$data = json_decode(file_get_contents('php://input'), true);

$password = sha1($data['password']);
$username = $data['username'];
$position = $data['position'];
$photo = $data['photo'];
$created_by = $data['created_by']; 
 
 
$func->insertUser($username, $password, $position, $photo, $created_by, $date);
 
