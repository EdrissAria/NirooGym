<?php 
  require('cors.php');
    require('objects.php');

    $response = array();
    $upload_dir = '../FRONTEND/niroo/public/assets/upload/';
    $server_url = 'http://localhost';

 
    $photo_name = $_FILES['photo']['name'];
    $photo_tmp_name = $_FILES["photo"]["tmp_name"];
    $error = $_FILES['photo']['error'];
 
    $func->upload($response, $upload_dir, $server_url, $photo_name, $photo_tmp_name, $error); 