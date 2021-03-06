<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');

class DBController{
    protected $host = "localhost";
    protected $user = "root";
    protected $password = "";
    protected $database = "niroo_db";

    public $con = null;

    public function __construct(){
        $this->con = mysqli_connect($this->host, $this->user, $this->password, $this->database);
        if($this->con->connect_error){
            echo "Failed".$this->con->connect_error;
        }
    }

    public function __destruct(){
        $this->closeConnection();
    }

    public function closeConnection(){
        if($this->con != null){
            $this->con->close();
            $this->con = null;
        }
    }
}