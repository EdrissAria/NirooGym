<?php 

class Functions{
    
    public $db = null;
    // constactor function
    public function __construct(DBController $db){
        if(!isset($db->con)){
            return null;
        }else{
            $this->db = $db;
        }
    }

    // getting data 
    public function getData($table = 'users'){
        $result = $this->db->con->query("SELECT * FROM {$table}");
        if($result){
            $arr = [];
            while($row = mysqli_fetch_assoc($result)){
                $arr[] = $row;
            }
            return $arr;
        }
    }
    // getting reguler time
    public function getRegtime($status,$table1 = 'custommer',$table2 = 'reguler_time', $pid = 'custommer.custommer_id',$fid = 'reguler_time.custommer_id'){
        if($status === 'finish'){
            $query = "SELECT * FROM {$table1} INNER JOIN {$table2} ON {$pid} = {$fid} WHERE status = '$status' OR status = 'cancel'";
            $result = $this->db->con->query($query);
        }else{
            $query = "SELECT * FROM {$table1} INNER JOIN {$table2} ON {$pid} = {$fid} WHERE status = '$status'";
            $result = $this->db->con->query($query);
        }
        if($result){
            $arr = [];
            while($row = mysqli_fetch_assoc($result)){
                $arr[] = $row;
            }
            return $arr;
        }
    }
    // getting reguler time
    public function getAgrtime($status,$table1 = 'custommer',$table2 = 'agreement_time', $pid = 'custommer.custommer_id',$fid = 'agreement_time.custommer_id'){
        if($status === 'finish'){
            $query = "SELECT * FROM {$table1} INNER JOIN {$table2} ON {$pid} = {$fid} WHERE status = '$status' OR status = 'cancel'";
            $result = $this->db->con->query($query);
        }else{
            $query = "SELECT * FROM {$table1} INNER JOIN {$table2} ON {$pid} = {$fid} WHERE status = '$status'";
            $result = $this->db->con->query($query);
        }
        if($result){
            $arr = [];
            while($row = mysqli_fetch_assoc($result)){
                $arr[] = $row;
            }
            return $arr;
        }else{
            echo 'something went wrong';
        }
    }
    // getting the type of earn by specific earning
    public function getEarn($earn, $table="earnings"){
        if($earn != null){
            $result = $this->db->con->query(
                "SELECT * FROM {$table} WHERE type = '$earn' AND (status = 'finish' OR status = 'cancel');"
            );
            if($result){
                $arr = [];
                while($row = mysqli_fetch_assoc($result)){
                    $arr[] = $row;
                }
                return $arr;
            }else{
                echo 'failed';
            }
        }else{
            echo 'something went wrong';
        }
    }

    // add users into database 
    public function insertUser($name, $password, $position, $photo, $created_by, $date, $table = 'users'){
        if($name && $password && $position && $photo && $created_by && $date){
            $query = "INSERT INTO {$table} (username, password, position, photo, created_by, created_at) 
            VALUES ('$name', '$password', '$position', '$photo', '$created_by', '$date');";
            $result = $this->db->con->query($query);
            if($result){
                echo "success";
            }else{
                echo "failed";
            }
        }else{
            echo 'something went wrong';
        }
    }
    // insert staff into database 
    public function addStaff($name, $job, $salary, $phone, $work_time, $created_by, $date, $table='staff'){
        if($name && $job && $salary && $phone && $work_time && $created_by && $date){
            $query = "INSERT INTO {$table} (name, job, salary, phone, work_time, created_by, created_at)
            VALUES ('$name','$job', $salary,'$phone','$work_time','$created_by', '$date')";
            $result = $this->db->con->query($query);
            if($result){
                echo 'success';
            }else{
                echo 'failed';
            }
        }else{
            echo 'something went wrong';
        }
    }
    // insert park tax into database 
    public function addPark($vehicle, $amount, $date, $table = 'parking'){
        if($vehicle && $amount && $date){
            $query = "INSERT INTO {$table} (vehicle, amount, date) VALUES('$vehicle', $amount, '$date');";
            $result = $this->db->con->query($query);
            if($result){
                $select = $this->db->con->query("SELECT * FROM {$table} ORDER BY park_id DESC LIMIT 1");
                $row = mysqli_fetch_assoc($select);
                $insertEarn = $this->db->con->query(
                    "INSERT INTO earnings (type, amount, status, write_by, date) VALUES(
                        '$table', {$amount}, 'finish', 'M.Edriss', '$date');"
                );
                if($insertEarn){
                    echo 'success earn';
                }else{
                    echo 'failed earn';
                }
            }else{
                echo 'failed';
            }
        }else{
            echo 'something went wrong';
        }
    }
    // insert book tax into database 
    public function addBook($userId, $amount, $description, $take_by, $date, $table = 'cache_book'){
        if($amount && $description && $take_by && $date){
            $query = "INSERT INTO {$table} (user_id, amount, description, take_by, date) VALUES($userId, $amount, '$description','$take_by', '$date');";
            $result = $this->db->con->query($query);
            if($result){
                echo 'success';
            }else{
                echo 'failed';
            }
        }else{
            echo 'something went wrong';
        }
    }
    // insert Expenses into database 
    public function addExpense($expense, $amount, $write_by, $date, $table = 'expenses'){
        if($expense && $amount && $write_by && $date){
            $query = "INSERT INTO {$table} (type, amount, write_by, date) VALUES('$expense', $amount, '$write_by','$date');";
            $result = $this->db->con->query($query);
            if($result){
                echo 'success';
            }else{
                echo 'failed';
            }
        }else{
            echo 'something went wrong';
        }
    }
    // insert regular time into database
    public function addRegtime($name, $phone, $amount, $recived, $reminder, $time, $write_by, $playDate, $date){
        if($name && $phone && $amount && $time && $write_by && $playDate && $date){
            $query = "INSERT INTO custommer (name, phone, created_at) VALUES ('$name', '$phone', '$date')";
            $addCustommer = $this->db->con->query($query);
            if($addCustommer){
                $select = $this->db->con->query("SELECT * FROM custommer ORDER BY custommer_id DESC LIMIT 1");
                $row = mysqli_fetch_assoc($select);
                if($select){
                    $query = "INSERT INTO reguler_time 
                    (custommer_id, amount, recived, reminder, status, entry_date, play_date, time, write_by)
                    VALUES ({$row['custommer_id']}, {$amount}, {$recived}, {$reminder}, 'waiting', '$date', 
                    '$playDate', '$time', '$write_by')";
                    $insertTime = $this->db->con->query($query);
                    if($insertTime){
                        $select = $this->db->con->query("SELECT * FROM reguler_time ORDER BY reg_id DESC LIMIT 1");
                        $row = mysqli_fetch_assoc($select);
                        $insertEarn = $this->db->con->query(
                            "INSERT INTO earnings (reg_id, type, amount, status, write_by, date) VALUES(
                                {$row['reg_id']},'regular_time', {$amount}, 'waiting', 'M.Edriss', '$date');"
                        ); 
                        if($insertEarn){
                            echo 'earn add successfully';
                        }else{
                            echo 'failed to add earn';
                        }
                    }else{
                       echo 'failed to add reguler time';  
                    }
                }else{
                    echo 'failed';
                }
                
            }
        }else{
            echo 'all field must be fill in';
        }
    }
     // insert agreement time into database
     public function addAgrtime($name, $phone, $amount, $recived, $reminder, $total, $startDate, $playDays, $endDate, $time, $wrote_by , $date){
        if($name && $phone && $amount && $startDate && $playDays && $time && $wrote_by && $date){
            $query = "INSERT INTO custommer (name, phone, created_at) VALUES ('$name', '$phone', '$date')";
            $addCustommer = $this->db->con->query($query);
            if($addCustommer){
                $select = $this->db->con->query("SELECT * FROM custommer ORDER BY custommer_id DESC LIMIT 1");
                $row = mysqli_fetch_assoc($select);
                if($select){
                    $query = "INSERT INTO agreement_time (custommer_id, amount_per_hour, recived, reminder, total_amount, entry_date, start_date, end_date, play_days, time, status, wrote_by) VALUES ({$row['custommer_id']}, {$amount}, {$recived}, {$reminder}, {$total}, '$date', '$startDate', '$endDate', {$playDays}, '$time','waiting','$wrote_by');";
                    $insertTime = $this->db->con->query($query);
                    if($insertTime){
                        $select = $this->db->con->query("SELECT * FROM agreement_time ORDER BY agr_id DESC LIMIT 1");
                        $row = mysqli_fetch_assoc($select);
                        $query = "INSERT INTO earnings (agr_id, type, amount, status, write_by, date) VALUES (
                            {$row['agr_id']},'agreement_time', {$recived}, 'finish', '$wrote_by', '$date');";
                        $query .= "INSERT INTO receipts (agr_id, receipt, pay_date, wrote_by) VALUES (
                            {$row['agr_id']}, {$recived}, '$date', '$wrote_by');";
                        $insertEarn = $this->db->con->multi_query($query); 
                        if($insertEarn){
                            echo 'earn add successfully';
                        }else{
                            echo 'failed to add earn';
                        }
                    }else{
                       echo 'failed to add agreement time';  
                    }
                }else{
                    echo 'failed';
                }
                
            }
        }else{
            echo 'all field must be fill in';
        }
    }
    // add receipt of agreement time in database 
    public function addReceipt($id, $receipt, $wrote_by, $date){
        if($id && $receipt && $wrote_by && $date){
            $addearn = $this->db->con->query("INSERT INTO earnings (agr_id, type, amount, status, write_by, date) 
            VALUES ($id, 'agreement_time', $receipt, 'finish', 'M.Edriss', '$date')");
            $query = "INSERT INTO receipts (agr_id, receipt, pay_date, wrote_by) VALUES ({$id}, {$receipt}, '$date', '$wrote_by');";
            $query .= "UPDATE agreement_time SET recived = (recived + {$receipt}) WHERE agr_id = {$id};";
            $result = $this->db->con->multi_query($query);
            if($addearn && $result){     
                echo 'success add earn reciept';
            }else{
                echo 'receipt fails to add';
            }
        }else{
            echo 'all fields are required';
        }
    }
    // removing user from database
    public function deleteData($id = null, $table = 'users'){
        if($id != null){
            $result = $this->db->con->query("DELETE FROM {$table} WHERE user_id = {$id}");
            if($result){
                echo 'deleting has been done';
            }else{
                echo 'failed to delete data';
            }
        }else{
            echo 'something went wrong';
        }
    }
    // removing staff from database 
    public function deleteStaff($id = null, $table = 'staff'){
        if($id != null){
            $result = $this->db->con->query("DELETE FROM {$table} WHERE staff_id = {$id}");
            if($result){
                echo 'deleting has been done';
            }else{
                echo 'failed to delete data';
            }
        }else{
            echo 'something went wrong';
        }
    }
    // getting singel user from database 
    public function getSingleUser($id=null, $table = 'users'){
        if($id != null){
            $result = $this->db->con->query("SELECT * FROM {$table} WHERE user_id = {$id}");
            if($result){
                $row = mysqli_fetch_assoc($result);
                return json_encode($row);
            }else{
                echo 'failed to get data';
            }
        }else{
            echo 'something went wrong';
        }
    }
    // getting singel staff from database 
    public function getSingleStaff($id=null, $table = 'staff'){
        if($id != null){
            $result = $this->db->con->query("SELECT * FROM {$table} WHERE staff_id = {$id}");
            if($result){
                $row = mysqli_fetch_assoc($result);
                return json_encode($row);
            }else{
                echo 'failed to get data';
            }
        }else{
            echo 'something went wrong';
        }
    }
    // getting single reguler time from database 
    public function getSingleReg($id, $table1 = 'custommer', $table2 = 'reguler_time'){
        if($id != null){
            $result = $this->db->con->query("SELECT * FROM {$table1} INNER JOIN {$table2} 
            ON {$table1}.custommer_id = {$table2}.custommer_id WHERE {$table1}.custommer_id = {$id};");
            if($result){
                $row = mysqli_fetch_assoc($result);
                return json_encode($row);
            }else{
                echo 'failed to get data';
            }
        }else{
            echo 'something went wrong';
        }
    }
    // get single agreement time 
    public function getSingleAgr($id, $table1 = 'custommer', $table2 = 'agreement_time'){
        if($id){
            $query = "SELECT * FROM {$table1} INNER JOIN {$table2} ON custommer.custommer_id = agreement_time.custommer_id
            WHERE custommer.custommer_id = {$id}";
            $result = $this->db->con->query($query);
            if($result){
                $row = mysqli_fetch_assoc($result);
                return json_encode($row);
            }else{
                echo 'failed to get data';
            }
        }else{
            echo 'something went wrong';
        }
    }
    // get receipts by agreement id 
    public function getReceipts($id, $table1 = 'receipts'){
        if($id){
            $query = "SELECT * FROM {$table1} WHERE agr_id = {$id}";
            $result = $this->db->con->query($query);
            if($result){
                $arr = [];
                while($row = mysqli_fetch_assoc($result)){
                    $arr[] = $row;
                }
                return $arr;
            }else{
                echo 'failed to get data';
            }
        }else{
            echo 'something went wrong';
        }
    }
    // updating user 
    public function updateUser($id, $username, $password, $new_password, $position, $photo, $table="users"){

        if($id != null && $username != null && $password != null && $position != null && $photo != null){
            $match = "SELECT * FROM {$table} WHERE user_id = {$id} AND password = '$password'";
            $user = $this->db->con->query($match);
            $row = mysqli_num_rows($user);
            if($row == 1){
                $result = $this->db->con->query("UPDATE {$table} SET username = '$username', password='$new_password',
                position='$position', photo='$photo' WHERE {$id} = user_id");
                if($result){
                    echo "success";
                }else{
                    echo "failed";
                }
            }else{
                echo "password does not match";
            }
        }else{
            "something went wrong";
        }
    }

    //updating staff 
    public function updateStaff($id, $name, $job, $phone, $salary, $worktime, $table="staff"){
        if($id != null && $name != null && $job != null && $phone != null && $salary != null && $worktime != null){
             $result = $this->db->con->query("UPDATE {$table} SET name = '$name', job='$job',
                phone='$phone', salary= $salary , work_time = '$worktime' WHERE {$id} = staff_id");
                if($result){
                    echo "staff updated";
                }else{
                    echo "failed to update";
                }
        }else{
            "something went wrong";
        }
    }
    //updating reguler times 
    public function updateReg($id, $name, $phone, $amount, $recived, $reminder,$date, $time, $table1="custommer", $table2="reguler_time"){
        if($id != null && $name != null && $amount != null && $phone != null && $date != null && $time != null){
                $query = "UPDATE {$table1} SET name = '$name', phone = '$phone' WHERE custommer_id = {$id};";
                $query .= "UPDATE {$table2} SET amount = {$amount}, recived = {$recived}, reminder = {$reminder}, play_date = '$date', time = '$time' WHERE custommer_id = {$id};";
                $result = $this->db->con->multi_query($query); 
                if($result){
                    echo "reguler time updated";
                }else{
                    echo "failed to update";
                }
        }else{
            "all fields must be filled in";
        }
    }  
    //updating reguler time status 
    public function updateRegStatus($id, $status, $table = 'reguler_time'){
        if($id && $status){
            if($status == "cancel"){
                $query = "UPDATE {$table} SET status = '$status' WHERE reg_id = {$id};";
                $result = $this->db->con->query($query);
                $select = $this->db->con->query("SELECT * FROM {$table} WHERE status = 'cancel' AND reg_id = {$id}");
                $row = mysqli_fetch_assoc($select);
                if($result){
                     $query = "UPDATE earnings SET status = '$status', amount = {$row['recived']} WHERE reg_id = {$id};";
                     $result = $this->db->con->query($query);
                     if($result){
                         echo 'earn updated successfully';
                     }
                }else{
                    echo 'failed to update status';
                }
            }else{
            $query = "UPDATE {$table} SET status = '$status' WHERE reg_id = {$id};";
            $query .= "UPDATE earnings SET status = '$status' WHERE reg_id = {$id};";
            $result = $this->db->con->multi_query($query); 
            if($result){
                echo 'status updated';
            }else{
                echo 'failed to update status';
            }
        }
        }else{
            echo 'something went wrong';
        }
    }
    //restore raddled reguler times  
    public function restoreReg($id, $table = 'reguler_time'){
        if($id != null){
            $query = "UPDATE {$table} SET status = 'waiting' WHERE reg_id = {$id};";
            $query .= "UPDATE earnings SET status = 'waiting' WHERE reg_id = {$id};";
            $result = $this->db->con->multi_query($query); 
            if($result){
                echo 'status updated';
            }else{
                echo 'failed to update status';
            }
        }else{
            echo 'something went wrong';
        }
    }
    // update agreement time 
    public function updateAgr($id, $name, $phone, $amount, $recived, $reminder, $total, $startDate, $playDays, $endDate, $time, $wrote_by , $date){
        if($name && $phone && $amount && $startDate && $playDays && $time && $wrote_by && $date){
            $query = "UPDATE custommer SET name = '$name', phone = '$phone' WHERE custommer_id = {$id};";
            $updateCustommer = $this->db->con->query($query);
            if($updateCustommer){
                    $query = "UPDATE agreement_time SET amount_per_hour = {$amount}, recived = {$recived}, reminder = {$reminder}, total_amount = {$total}, start_date = '$startDate', end_date = '$endDate', play_days = {$playDays}, time = '$time' WHERE custommer_id = {$id};";
                    $updateTime = $this->db->con->query($query);
                    if($updateTime){
                        echo 'agreement time updated successfully';
                }else{
                    echo 'failed';
                }
                
            }
        }else{
            echo 'all field must be fill in';
        }
    }



}

