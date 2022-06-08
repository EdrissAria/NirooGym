<?php
require('cors.php');
require('objects.php');

$data = json_decode(file_get_contents('php://input'), true);

$agr_id = $data['agr_id'];
$receipt = $data['receipt'];
$wrote_by = "M.Edriss";

$func->addReceipt($agr_id, $receipt, $wrote_by, $date);

