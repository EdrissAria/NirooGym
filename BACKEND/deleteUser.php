<?php
require('cors.php');
require('objects.php');

$id = $_GET['id'];

$func->deleteData($id);

