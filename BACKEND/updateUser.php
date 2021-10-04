<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
require('objects.php');

$id = $_GET['id'];

$data = json_decode(file_get_contents("php://input"), true);

$password = sha1($data['password']);
$new_password = sha1($data['new_password']);
$username = $data['username'];
$position = $data['position'];
$photo = $data['photo'];
 
$func->updateUser($id, $username, $password, $new_password,  $position, $photo);