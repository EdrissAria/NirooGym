<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
require('objects.php');

$search = $_GET['search'];
$RealSearch = mysqli_real_escape_string($db->con, $search);
echo $func->search($RealSearch);
