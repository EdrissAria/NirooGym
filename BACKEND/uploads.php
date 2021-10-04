<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
 

 

$response = array();
$upload_dir = '../FRONTEND/niroo/public/assets/upload/';
$server_url = 'http://localhost';

if($_FILES['photo']){
    $photo_name = $_FILES['photo']['name'];
    $photo_tmp_name = $_FILES["photo"]["tmp_name"];
    $error = $_FILES['photo']['error'];

    if($error > 0){
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error uploading the file"
        );
    }else{
        // $random_name = rand(1000, 1000000)."-".$photo_name;
        $upload_name = $upload_dir.strtolower($photo_name);
        $upload_name = preg_replace('/\s+/', '-', $upload_name);
    }

    if(move_uploaded_file($photo_tmp_name, $upload_name)){
        $response = array(
            "status" => "success",
            "error" => false,
            "message" => "file uploaded successfully",
            "url" => $server_url.'/'.$upload_name
        );
    }else{
        $response = array(
            "status" => "error", 
            "error" => true, 
            "message" => "Error uploading file"
        );
    }
}else{
    $response = array(
        "status" => "error", 
        "error" => true,
        "message" => "no file is selected!"
    );
}

echo json_encode($response);