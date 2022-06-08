<?php
require('cors.php');
require('objects.php');

$search = $_GET['search'];
$RealSearch = mysqli_real_escape_string($db->con, $search);
echo $func->search($RealSearch);
