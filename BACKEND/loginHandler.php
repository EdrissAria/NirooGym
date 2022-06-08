<?php
require('cors.php');
require('objects.php');


$data = json_decode(file_get_contents('php://input'), true);
 
$password = sha1($data['password']);
$username = $data['username'];
 
$func->loginHandler($username, $password);