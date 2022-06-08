<?php
require('cors.php');
require('objects.php');

$id = $_GET['id'];

echo json_decode(file_get_contents("php://input"));