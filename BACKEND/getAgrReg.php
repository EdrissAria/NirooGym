<?php
require('cors.php');
require('objects.php');

$id = $_GET['id'];

echo json_encode($func->getAgrReg($id));