<?php
require('cors.php');
require('objects.php');

$id = $_GET['id'];

$func->restoreReg($id);
 