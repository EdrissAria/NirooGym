<?php
require('cors.php');
require('objects.php');

$id = $_GET['id'];
echo $func->getSingleStaff($id);