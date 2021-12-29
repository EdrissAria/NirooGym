<?php
ini_set('display_errors', 1);
// include jwt 
require 'api/vendor/autoload.php';

use \Firebase\JWT\JWT;

class Functions
{

    public $db = null;
    // constactor function
    public function __construct(DBController $db)
    {
        try {
            if (!isset($db->con)) {
                return null;
            } else {
                $this->db = $db;
            }
        } catch (Exception $e) {
            echo $e->getMessage(); 
        }
    }

    // getting data 
    public function getData($table = 'users')
    {
        try{
        $result = $this->db->con->query("SELECT * FROM {$table}");
        if ($result) {
            $arr = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $arr[] = $row;
            }
            return $arr;
        } 
    }catch(Exception $e){
        http_response_code(404); 
        echo json_encode(array([
            "status" => 0, 
            "message" => $e->getMessage()
        ]));
    }
    }
    // getting regular time
    public function getRegtime($status, $table1 = 'custommer', $table2 = 'regular_time', $pid = 'custommer.custommer_id', $fid = 'regular_time.custommer_id')
    {
        if ($status === 'finish') {
            $query = "SELECT * FROM {$table1} INNER JOIN {$table2} ON {$pid} = {$fid} WHERE status = '$status' OR status = 'cancel'";
            $result = $this->db->con->query($query);
        } else {
            $query = "SELECT * FROM {$table1} INNER JOIN {$table2} ON {$pid} = {$fid} WHERE status = '$status'";
            $result = $this->db->con->query($query);
        }
        if ($result) {
            $arr = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $arr[] = $row;
            }
            return $arr;
        }
    }
    // getting regular time
    public function getAgrtime($status, $table1 = 'custommer', $table2 = 'agreement_time', $pid = 'custommer.custommer_id', $fid = 'agreement_time.custommer_id')
    {
        if ($status === 'finish') {
            $query = "SELECT * FROM {$table1} INNER JOIN {$table2} ON {$pid} = {$fid} WHERE status = '$status' OR status = 'cancel'";
            $result = $this->db->con->query($query);
        } else {
            $query = "SELECT * FROM {$table1} INNER JOIN {$table2} ON {$pid} = {$fid} WHERE status = '$status'";
            $result = $this->db->con->query($query);
        }
        if ($result) {
            $arr = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $arr[] = $row;
            }
            return $arr;
        } else {
            echo 'something went wrong';
        }
    }
    // getting the type of earn by specific earning
    public function getEarn($earn, $table = "earnings")
    {
        if ($earn != null) {
            $result = $this->db->con->query(
                "SELECT * FROM {$table} WHERE type = '$earn' AND (status = 'finish' OR status = 'cancel');"
            );
            if ($result) {
                $arr = [];
                while ($row = mysqli_fetch_assoc($result)) {
                    $arr[] = $row;
                }
                return $arr;
            } else {
                echo 'failed';
            }
        } else {
            echo 'something went wrong';
        }
    }
    // getting single time 
    public function getSingleTime($id, $earn)
    {
        if ($id && $earn) {
            if ($earn === 'regular_time') {
                $query = "SELECT * FROM custommer INNER JOIN {$earn} ON custommer.custommer_id = regular_time.custommer_id WHERE reg_id = {$id}";
            } else {
                $query = "SELECT * FROM custommer INNER JOIN {$earn} ON custommer.custommer_id = agreement_time.custommer_id WHERE agr_id = {$id}";
            }
            $result = $this->db->con->query($query);
            if ($result) {
                $row = mysqli_fetch_assoc($result);
                return json_encode($row);
            } else {
                echo 'failed to get data';
            }
        } else {
            echo 'something went wrong';
        }
    }
    // add users into database 
    public function insertUser($name, $password, $position, $photo, $created_by, $date, $table = 'users')
    {
        if ($name && $password && $position && $photo && $created_by && $date) {
            $query = "INSERT INTO {$table} (username, password, position, photo, created_by, created_at) 
            VALUES ('$name', '$password', '$position', '$photo', '$created_by', '$date');";
            $result = $this->db->con->query($query);
            if ($result) {
                http_response_code(200);
                echo json_encode(array([
                    "status" => 1,
                    "message" => "User Added Successfully"
                ]));
            } else {
                http_response_code(404);
                echo json_encode(array([
                    "status" => 0,
                    "message" => "There is a probem,please try again"
                ]));
            }
        } else {
            echo json_encode(array([
                "status" => 0,
                "message" => "all feild are required"
            ]));
        }
    }
    // insert staff into database 
    public function addStaff($name, $job, $salary, $phone, $work_time, $created_by, $date, $table = 'staff')
    {
        if ($name && $job && $salary && $phone && $work_time && $created_by && $date) {
            $query = "INSERT INTO {$table} (name, job, salary, phone, work_time, created_by, created_at)
            VALUES ('$name','$job', $salary,'$phone','$work_time','$created_by', '$date')";
            $result = $this->db->con->query($query);
            if ($result) {
                echo 'success';
            } else {
                echo 'failed';
            }
        } else {
            echo 'something went wrong';
        }
    }
    // insert park tax into database 
    public function addPark($vehicle, $amount, $date, $table = 'parking')
    {
        if ($vehicle && $amount && $date) {
            $query = "INSERT INTO {$table} (vehicle, amount, date) VALUES('$vehicle', $amount, '$date');";
            $result = $this->db->con->query($query);
            if ($result) {
                $select = $this->db->con->query("SELECT * FROM {$table} ORDER BY park_id DESC LIMIT 1");
                $row = mysqli_fetch_assoc($select);
                $query = "INSERT INTO earnings (park_id, type, amount, status, write_by, date) 
                VALUES ({$row['park_id']},'$table', {$amount}, 'finish', 'M.Edriss', '$date');";
                $insertEarn = $this->db->con->query($query);
                if ($insertEarn) {
                    $this->addBank($date, 'earn');
                    echo 'success earn';
                } else {
                    echo 'failed earn';
                }
            } else {
                echo 'failed';
            }
        } else {
            echo 'something went wrong';
        }
    }
    // insert book tax into database 
    public function addBook($userId, $amount, $description, $take_by, $date, $table = 'cache_book')
    {
        if ($amount && $description && $take_by && $date) {
            // get total money in bank 
            $command = "SELECT total FROM bank ORDER BY bank_id DESC LIMIT 1";
            $execute = $this->db->con->query($command);
            $total = mysqli_fetch_assoc($execute);
            if ($amount <= $total['total']) {
                $query = "INSERT INTO {$table} (user_id, amount, description, take_by, date) VALUES($userId, $amount, '$description','$take_by', '$date');";
                $result = $this->db->con->query($query);
                if ($result) {
                    $this->addBank($date, 'none');
                    echo 'success';
                } else {
                    echo 'failed';
                }
            } else {
                echo 'out of money';
            }
        } else {
            echo 'something went wrong';
        }
    }
    // insert Expenses into database 
    public function addExpense($expense, $amount, $write_by, $date, $table = 'expenses')
    {
        if ($expense && $amount && $write_by && $date) {
            $query = "INSERT INTO {$table} (type, amount, write_by, date) VALUES('$expense', $amount, '$write_by','$date');";
            $result = $this->db->con->query($query);
            if ($result) {
                $this->addBank($date, 'expense');
                echo 'success';
            } else {
                echo 'failed';
            }
        } else {
            echo 'something went wrong';
        }
    }
    // insert regular time into database
    public function addRegtime($name, $phone, $amount, $recived, $reminder, $time, $write_by, $playDate, $date)
    {
        if ($name && $phone && $amount && $time && $write_by && $playDate && $date) {
            $select = $this->db->con->query("SELECT * FROM custommer WHERE phone = '$phone';");
            $selectRow = mysqli_fetch_assoc($select);
            if ($selectRow) {
                $query = "INSERT INTO regular_time 
                (custommer_id, amount, recived, reminder, status, entry_date, play_date, time, wrote_by)
                VALUES ({$selectRow['custommer_id']}, {$amount}, {$recived}, {$reminder}, 'waiting', '$date', 
                '$playDate', '$time', '$write_by')";
                $insertTime = $this->db->con->query($query);
                if ($insertTime) {
                    $select = $this->db->con->query("SELECT * FROM regular_time ORDER BY reg_id DESC LIMIT 1");
                    $row = mysqli_fetch_assoc($select);
                    $insertEarn = $this->db->con->query(
                        "INSERT INTO earnings (reg_id, type, amount, status, write_by, date) VALUES(
                            {$row['reg_id']},'regular_time', {$amount}, 'waiting', 'M.Edriss', '$date');"
                    );
                    if ($insertEarn) {
                        echo 'earn add successfully';
                    } else {
                        echo 'failed to add earn';
                    }
                } else {
                    echo 'failed to add regular time';
                }
            } else {
                $query = "INSERT INTO custommer (name, phone, created_at) VALUES ('$name', '$phone', '$date')";
                $addCustommer = $this->db->con->query($query);
                if ($addCustommer) {
                    $select = $this->db->con->query("SELECT * FROM custommer ORDER BY custommer_id DESC LIMIT 1");
                    $row = mysqli_fetch_assoc($select);
                    if ($select) {
                        $query = "INSERT INTO regular_time 
                        (custommer_id, amount, recived, reminder, status, entry_date, play_date, time, wrote_by)
                        VALUES ({$row['custommer_id']}, {$amount}, {$recived}, {$reminder}, 'waiting', '$date', 
                        '$playDate', '$time', '$write_by')";
                        $insertTime = $this->db->con->query($query);
                        if ($insertTime) {
                            $select = $this->db->con->query("SELECT * FROM regular_time ORDER BY reg_id DESC LIMIT 1");
                            $row = mysqli_fetch_assoc($select);
                            $insertEarn = $this->db->con->query(
                                "INSERT INTO earnings (reg_id, type, amount, status, write_by, date) VALUES(
                                    {$row['reg_id']},'regular_time', {$amount}, 'waiting', 'M.Edriss', '$date');"
                            );
                            if ($insertEarn) {
                                echo 'earn add successfully';
                            } else {
                                echo 'failed to add earn';
                            }
                        } else {
                            echo 'failed to add regular time';
                        }
                    } else {
                        echo 'failed';
                    }
                }
            }
        } else {
            echo 'all field must be fill in';
        }
    }
    // insert agreement time into database
    public function addAgrtime($name, $phone, $amount, $recived, $startDate, $playDays, $endDate, $time, $wrote_by, $date)
    {
        if ($name && $phone && $amount && $startDate && $playDays && $time && $wrote_by && $date) {
            $select = $this->db->con->query("SELECT * FROM custommer WHERE phone = '$phone';");
            $selectRow = mysqli_fetch_assoc($select);
            if ($selectRow) {
                $query = "INSERT INTO agreement_time (custommer_id, amount_per_hour, recived, entry_date, start_date, end_date, play_days, time, status, wrote_by, total) 
            VALUES ({$selectRow['custommer_id']}, {$amount}, {$recived}, '$date', '$startDate', '$endDate', {$playDays}, '$time','waiting','$wrote_by', {$recived});";
                $insertTime = $this->db->con->query($query);
                if ($insertTime) {
                    $select = $this->db->con->query("SELECT * FROM agreement_time ORDER BY agr_id DESC LIMIT 1");
                    $row = mysqli_fetch_assoc($select);
                    // determine the regular time payament
                    $query = "INSERT INTO earnings (agr_id, type, amount, status, write_by, date) VALUES (
                    {$row['agr_id']},'agreement_time', {$recived}, 'finish', '$wrote_by', '$date');";
                    $insertEarn = $this->db->con->query($query);
                    while (mysqli_next_result($this->db->con)) {;
                    }
                    if ($insertEarn) {
                        $this->addBank($date, 'earn');
                        echo 'earn add successfully';
                    } else {
                        echo 'failed to add earn';
                    }
                } else {
                    echo 'failed to add agreement time';
                }
            } else {
                $query = "INSERT INTO custommer (name, phone, created_at) VALUES ('$name', '$phone', '$date')";
                $addCustommer = $this->db->con->query($query);
                if ($addCustommer) {
                    $select = $this->db->con->query("SELECT * FROM custommer ORDER BY custommer_id DESC LIMIT 1");
                    $row = mysqli_fetch_assoc($select);
                    if ($select) {
                        $query = "INSERT INTO agreement_time (custommer_id, amount_per_hour, recived,entry_date, start_date, end_date, play_days, time, status, wrote_by, total) 
                            VALUES ({$row['custommer_id']}, {$amount}, {$recived}, '$date', '$startDate', '$endDate', {$playDays}, '$time','waiting','$wrote_by', {$recived});";
                        $insertTime = $this->db->con->query($query);
                        if ($insertTime) {
                            $select = $this->db->con->query("SELECT * FROM agreement_time ORDER BY agr_id DESC LIMIT 1");
                            $row = mysqli_fetch_assoc($select);
                            $query = "INSERT INTO earnings (agr_id, type, amount, status, write_by, date) VALUES (
                                    {$row['agr_id']},'agreement_time', {$recived}, 'finish', '$wrote_by', '$date');";
                            $insertEarn = $this->db->con->query($query);
                            while (mysqli_next_result($this->db->con)) {;
                            }
                            if ($insertEarn) {
                                $this->addBank($date, 'earn');
                                echo 'earn add successfully';
                            } else {
                                echo 'failed to add earn';
                            }
                        } else {
                            echo 'failed to add agreement time';
                        }
                    } else {
                        echo 'failed';
                    }
                }
            }
        } else {
            echo 'all field must be fill in';
        }
    }
    // add regular time for scecific agreement time 
    public function addRegAgrtime($agr_id, $custommer_id, $name, $phone, $amount, $recived, $reminder, $entry_date, $playDate, $time, $wrote_by, $date)
    {
        if ($agr_id && $custommer_id && $name && $phone && $amount && $time && $wrote_by && $playDate) {
            $query = "INSERT INTO regular_time 
            (custommer_id, agr_id, amount, recived, reminder, status, entry_date, play_date, time, wrote_by)
            VALUES ({$custommer_id},{$agr_id}, {$amount}, {$recived}, {$reminder}, 'finish', '$entry_date', 
            '$playDate', '$time', '$wrote_by')";
            $insertTime = $this->db->con->query($query);
            if ($insertTime) {
                $select = $this->db->con->query("SELECT * FROM regular_time ORDER BY reg_id DESC LIMIT 1");
                $row = mysqli_fetch_assoc($select);
                $query = "INSERT INTO earnings (reg_id, type, amount, status, write_by, date) VALUES(
                    {$row['reg_id']},'regular_time', {$recived}, 'finish', 'M.Edriss', '$date');";
                $query .= "UPDATE agreement_time SET total = ({$recived} + total) WHERE agr_id = {$agr_id};";
                $insertEarn = $this->db->con->multi_query($query);
                while (mysqli_next_result($this->db->con)) {;
                }
                if ($insertEarn) {
                    $this->addBank($date, 'earn');
                    echo 'earn add successfully';
                } else {
                    echo 'failed to add earn';
                }
            } else {
                echo 'failed to add regular time';
            }
        }
    }
    // add loans 
    public function addLoan($loaner, $phone, $amount, $description, $date)
    {
        if ($loaner && $phone && $amount && $date) {
            $select = $this->db->con->query("SELECT * FROM custommer WHERE phone = '$phone'");
            $row = mysqli_fetch_assoc($select);
            if ($row) {
                $query = "INSERT INTO loans (custommer_id, amount, description) VALUES ({$row['custommer_id']},{$amount},'$description');";
                $result = $this->db->con->query($query);
                if ($result) {
                    $this->addBank($date, 'none');
                    echo 'loan added';
                } else {
                    echo 'failed to add loan';
                }
            } else {
                echo 'custommer does not exist';
            }
        }
    }
    // removing user from database
    public function deleteData($id = null, $table = 'users')
    {
        if ($id != null) {
            $result = $this->db->con->query("DELETE FROM {$table} WHERE user_id = {$id}");
            if ($result) {
                echo 'deleting has been done';
            } else {
                echo 'failed to delete data';
            }
        } else {
            echo 'something went wrong';
        }
    }
    // removing staff from database 
    public function deleteStaff($id = null, $table = 'staff')
    {
        if ($id != null) {
            $result = $this->db->con->query("DELETE FROM {$table} WHERE staff_id = {$id}");
            if ($result) {
                echo 'deleting has been done';
            } else {
                echo 'failed to delete data';
            }
        } else {
            echo 'something went wrong';
        }
    }
    // remove paid loans 
    public function deleteLoan($id = null, $date, $table = 'loans')
    {
        if ($id != null) {
            $result = $this->db->con->query("DELETE FROM {$table} WHERE loan_id = {$id}");
            if ($result) {
                $this->addBank($date, 'none');
                echo 'deleting has been done';
            } else {
                echo 'failed to delete data';
            }
        } else {
            echo 'something went wrong';
        }
    }
    // getting singel user from database 
    public function getSingleUser($id = null, $table = 'users')
    {
        if ($id != null) {
            $result = $this->db->con->query("SELECT * FROM {$table} WHERE user_id = {$id}");
            if ($result) {
                $row = mysqli_fetch_assoc($result);
                return json_encode($row);
            } else {
                echo 'failed to get data';
            }
        } else {
            echo 'something went wrong';
        }
    }
    // getting singel staff from database 
    public function getSingleStaff($id = null, $table = 'staff')
    {
        if ($id != null) {
            $result = $this->db->con->query("SELECT * FROM {$table} WHERE staff_id = {$id}");
            if ($result) {
                $row = mysqli_fetch_assoc($result);
                return json_encode($row);
            } else {
                echo 'failed to get data';
            }
        } else {
            echo 'something went wrong';
        }
    }
    // getting single regular time from database 
    public function getSingleReg($id, $table = 'regular_time')
    {
        if ($id != null) {
            $result = $this->db->con->query("SELECT * FROM {$table} WHERE reg_id = {$id};");
            if ($result) {
                $row = mysqli_fetch_assoc($result);
                return json_encode($row);
            } else {
                echo 'failed to get data';
            }
        } else {
            echo 'something went wrong';
        }
    }
    // get single agreement time 
    public function getSingleAgr($id, $table = 'agreement_time')
    {
        if ($id) {
            $query = "SELECT * FROM {$table} WHERE agr_id = {$id}";
            $result = $this->db->con->query($query);
            if ($result) {
                $row = mysqli_fetch_assoc($result);
                return json_encode($row);
            } else {
                echo 'failed to get data';
            }
        } else {
            echo 'something went wrong';
        }
    }
    // get regular times by agreement id 
    public function getAgrReg($id, $table = 'regular_time')
    {
        if ($id) {
            $query = "SELECT * FROM {$table} WHERE agr_id = {$id}";
            $result = $this->db->con->query($query);
            if ($result) {
                $arr = [];
                while ($row = mysqli_fetch_assoc($result)) {
                    $arr[] = $row;
                }
                return $arr;
            } else {
                echo 'failed to get data';
            }
        } else {
            echo 'something went wrong';
        }
    }
    // get all loans 
    public function getLoan($table1 = 'custommer', $table2 = 'loans')
    {
        $query = "SELECT * FROM {$table1} INNER JOIN {$table2} ON custommer.custommer_id = loans.custommer_id";
        $result = $this->db->con->query($query);
        if ($result) {
            $arr = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $arr[] = $row;
            }
            return $arr;
        } else {
            echo 'failed to get data';
        }
    }
    // updating user 
    public function updateUser($id, $username, $password, $new_password, $position, $photo, $table = "users")
    {
        if ($id != null && $username != null && $password != null && $position != null && $photo != null) {
            $match = "SELECT * FROM {$table} WHERE user_id = {$id} AND password = '$password'";
            $user = $this->db->con->query($match);
            $row = mysqli_num_rows($user);
            if ($row > 0) {
                $result = $this->db->con->query("UPDATE {$table} SET username = '$username', password='$new_password',
                position='$position', photo='$photo' WHERE {$id} = user_id");
                if ($result) {
                    echo "success";
                } else {
                    echo "failed";
                }
            } else {
                http_response_code(404); 
                echo json_encode(array(
                    "status" => 0, 
                    "message" => "The old password is wrong"
                )); 
            }
        } else {
            "something went wrong";
        }
    }

    //updating staff 
    public function updateStaff($id, $name, $job, $phone, $salary, $worktime, $table = "staff")
    {
        if ($id != null && $name != null && $job != null && $phone != null && $salary != null && $worktime != null) {
            $result = $this->db->con->query("UPDATE {$table} SET name = '$name', job='$job',
                phone='$phone', salary= $salary , work_time = '$worktime' WHERE {$id} = staff_id");
            if ($result) {
                echo "staff updated";
            } else {
                echo "failed to update";
            }
        } else {
            "something went wrong";
        }
    }
    //updating regular times 
    public function updateReg($id, $amount, $recived, $reminder, $date, $time, $table = "regular_time")
    {
        if ($id != null && $amount != null && $date != null && $time != null) {
            $query = "UPDATE {$table} SET amount = {$amount}, recived = {$recived}, reminder = {$reminder},
                play_date = '$date', time = '$time' WHERE reg_id = {$id};";
            $result = $this->db->con->query($query);
            if ($result) {
                echo "regular time updated";
            } else {
                echo "failed to update";
            }
        } else {
            "all fields must be filled in";
        }
    }
    //updating regular time status 
    public function updateRegStatus($id, $status, $date, $table = 'regular_time')
    {
        if ($id && $status) {
            if ($status == "cancel") {
                $result = $this->db->con->query("UPDATE {$table} SET status = '$status' WHERE reg_id = {$id}");
                $select = $this->db->con->query("SELECT * FROM {$table} WHERE status = 'cancel' AND reg_id = {$id}");
                $row = mysqli_fetch_assoc($select);
                if ($result) {
                    $query = "UPDATE earnings SET status = '$status', amount = {$row['recived']}, date = '$date' WHERE reg_id = {$id};";
                    $result = $this->db->con->query($query);
                    while (mysqli_next_result($this->db->con)) {
                    }
                    if ($result) {
                        $this->addBank($date, 'earn');
                        echo ' earn updated successfully';
                    }
                } else {
                    echo 'failed to update status';
                }
            } else {
                $query = "UPDATE {$table} SET status = '$status' WHERE reg_id = {$id};";
                $query .= "UPDATE earnings SET status = '$status', date = '$date' WHERE reg_id = {$id};";
                $result = $this->db->con->multi_query($query);
                while (mysqli_next_result($this->db->con)) {
                }
                if ($result) {
                    $this->addBank($date, 'earn');
                    echo ' status updated';
                } else {
                    echo 'failed to update status';
                }
            }
        } else {
            echo 'something went wrong';
        }
    }
    //updating agreement time status 
    public function updateAgrStatus($id, $status, $date, $table = 'agreement_time')
    {
        if ($id && $status) {
            if ($status == "cancel") {
                $query = "UPDATE {$table} SET status = '$status' WHERE agr_id = {$id};";
                $result = $this->db->con->query($query);
                $select = $this->db->con->query("SELECT * FROM {$table} WHERE status = 'cancel' AND agr_id = {$id}");
                $row = mysqli_fetch_assoc($select);
                if ($result) {
                    $query = "UPDATE earnings SET status = '$status', amount = {$row['recived']}, date = '$date' WHERE agr_id = {$id};";
                    $result = $this->db->con->query($query);
                    if ($result) {
                        echo 'earn updated successfully';
                    } else {
                        echo 'failed to update earn';
                    }
                } else {
                    echo 'failed to update status';
                }
            } else {
                $query = "UPDATE {$table} SET status = '$status' WHERE agr_id = {$id};";
                $query .= "UPDATE earnings SET status = '$status', date = '$date' WHERE agr_id = {$id};";
                $result = $this->db->con->multi_query($query);
                if ($result) {
                    echo 'status updated';
                } else {
                    echo 'failed to update status';
                }
            }
        } else {
            echo 'something went wrong';
        }
    }

    // update agreement time 
    public function updateAgr($id, $amount, $recived, $startDate, $playDays, $endDate, $time, $wrote_by, $date)
    {
        if ($id && $amount && $startDate && $playDays && $time && $wrote_by && $date) {
            $query = "UPDATE agreement_time SET amount_per_hour = {$amount}, recived = {$recived}, start_date = '$startDate',
            end_date = '$endDate', play_days = {$playDays}, time = '$time' WHERE agr_id = {$id};";
            $query .= "UPDATE earnings SET amount = {$recived}, date = '$date' WHERE agr_id = {$id};";
            $updateTime = $this->db->con->multi_query($query);
            if ($updateTime) {
                echo 'agreement time updated successfully';
            } else {
                echo 'failed';
            }
        } else {
            echo 'all field must be fill in';
        }
    }

    // get data and update bank
    public function addBank($date, $type)
    {
        $earn = 0;
        $expense = 0;
        // get total earnings
        if ($type === 'earn') {
            $getEarn = $this->db->con->query("SELECT amount AS earn FROM earnings WHERE status = 'finish' OR status = 'cancel' ORDER BY date DESC LIMIT 1");
            $earn = mysqli_fetch_assoc($getEarn);
            $earn = $earn['earn'];
            if ($earn == null) {
                $earn = 0;
            }
        }
        if ($type === 'expense') {
            // get total expenses
            $getExpense = $this->db->con->query("SELECT amount AS expense FROM expenses ORDER BY date DESC LIMIT 1");
            $expense = mysqli_fetch_assoc($getExpense);
            $expense = $expense['expense'];
            if ($expense == null) {
                $expense = 0;
            }
        }

        // get total earnings
        $getTotalEarn = $this->db->con->query("SELECT SUM(amount) AS earn FROM earnings WHERE status = 'finish' OR status = 'cancel'");
        $totalEarn = mysqli_fetch_assoc($getTotalEarn);
        if ($totalEarn['earn'] == null) {
            $totalEarn['earn'] = 0;
        }
        // get total expenses
        $getTotalExpense = $this->db->con->query("SELECT SUM(amount) AS expense FROM expenses");
        $totalExpense = mysqli_fetch_assoc($getTotalExpense);
        if ($totalExpense['expense'] == null) {
            $totalExpense['expense'] = 0;
        }
        // get total picks
        $getPick = $this->db->con->query("SELECT SUM(amount) AS pick FROM cache_book");
        $pick = mysqli_fetch_assoc($getPick);
        if ($pick['pick'] == null) {
            $pick['pick'] = 0;
        }
        // get total loans
        $getLoan = $this->db->con->query("SELECT SUM(amount) AS loan FROM loans");
        $loan = mysqli_fetch_assoc($getLoan);
        if ($loan['loan'] == null) {
            $loan['loan'] = 0;
        }
        // calculate the gains and losses 


        $totalMoney = $totalEarn['earn'] - ($totalExpense['expense'] + $pick['pick'] + $loan['loan']);
        if ($totalMoney < 0) {
            $totalMoney = 0;
        }

        $query = "INSERT INTO bank (earn, expense, total, updated_at) VALUES 
        ($earn, $expense, {$totalMoney}, '$date');";
        $result = $this->db->con->query($query);
        if ($result) {
            echo 'success bank';
        } else {
            echo 'failed bank';
        }
    }
    // get bank data from database 
    public function getBank()
    {
        // get total earnings, expenses, gains, losses
        $getdata = $this->db->con->query("SELECT SUM(earn) as earn ,SUM(expense) as expense ,updated_at FROM bank");
        $getTotalMoney = $this->db->con->query("SELECT total FROM bank ORDER BY bank_id DESC LIMIT 1");
        $total = mysqli_fetch_assoc($getTotalMoney);
        $data = mysqli_fetch_assoc($getdata);
        $earn = $data['earn'];
        $expense = $data['expense'];
        $loss = 0;
        $gain = 0;
        if (($earn - $expense) < 0) {
            $loss = abs($earn - $expense);
        } else {
            $gain = $earn - $expense;
        }
        // get total picks
        $getPick = $this->db->con->query("SELECT SUM(amount) AS pick FROM cache_book");
        $pick = mysqli_fetch_assoc($getPick);
        if ($pick['pick'] == null) {
            $pick['pick'] = 0;
        }
        // get total loans
        $getLoan = $this->db->con->query("SELECT SUM(amount) AS loan FROM loans");
        $loan = mysqli_fetch_assoc($getLoan);
        if ($loan['loan'] == null) {
            $loan['loan'] = 0;
        }

        $bankArray = [
            'earn' => $earn,
            'expense' => $expense,
            'gain' => $gain,
            'loss' => $loss,
            'pick' => $pick['pick'],
            'loan' => $loan['loan'],
            'total' => $total['total']
        ];

        return json_encode($bankArray);
    }
    // get dashboard information from database 
    public function getInfo()
    {
        // get total picks
        $getBank = $this->db->con->query("SELECT SUM(earn) as earn ,SUM(expense) as expense ,updated_at FROM bank");
        $data = mysqli_fetch_assoc($getBank);

        $earn = $data['earn'];
        $expense = $data['expense'];
        $loss = 0;
        if (($earn - $expense) < 0) {
            $loss = abs($earn - $expense);
        }

        // get total regular times 
        $regular = $this->db->con->query("SELECT * FROM regular_time WHERE status = 'finish'");
        $regArray = [];
        while ($countReg = mysqli_fetch_assoc($regular)) {
            $regArray[] = $countReg;
        };

        // get total cancel reguler times 
        $regularCancel = $this->db->con->query("SELECT * FROM regular_time WHERE status = 'cancel'");
        $regCancelArray = [];
        while ($countRegCancel = mysqli_fetch_assoc($regularCancel)) {
            $regCancelArray[] = $countRegCancel;
        };

        // get total agreement times 
        $agreement = $this->db->con->query("SELECT * FROM agreement_time WHERE status = 'finish'");
        $agrArray = [];
        while ($countAgr = mysqli_fetch_assoc($agreement)) {
            $agrArray[] = $countAgr;
        };

        // get total cancel agreement times 
        $agreementCancel = $this->db->con->query("SELECT * FROM agreement_time WHERE status = 'cancel'");
        $agrCancelArray = [];
        while ($countAgrCancel = mysqli_fetch_assoc($agreementCancel)) {
            $agrCancelArray[] = $countAgrCancel;
        };
        // get total waiting agreement times 
        $agreementWaiting = $this->db->con->query("SELECT * FROM agreement_time WHERE status = 'waiting'");
        $agrWaitArray = [];
        while ($countAgrWait = mysqli_fetch_assoc($agreementWaiting)) {
            $agrWaitArray[] = $countAgrWait;
        };
        // get total waiting regular times 
        $regularWaiting = $this->db->con->query("SELECT * FROM regular_time WHERE status = 'waiting'");
        $regWaitArray = [];
        while ($countRegWait = mysqli_fetch_assoc($regularWaiting)) {
            $regWaitArray[] = $countRegWait;
        };
        //variables 
        $totalCancelation = count($agrCancelArray) + count($regCancelArray);

        $totalPlays = count($agrArray) + count($regArray);

        $totalWaiting = count($agrWaitArray) + count($regWaitArray);
        $now = new DateTime(); 

        $info = [
            'earn' => $earn,
            'expense' => $expense,
            'loss' => $loss,
            'totalPlays' => $totalPlays,
            'totalCancel' => $totalCancelation,
            'totalWait' => $totalWaiting,
            'date' => $now
        ];

        return json_encode($info);
    }
    public function getWiseData($date)
    {
        $year = substr($date, 0, 4);
        $yearArray = [];
        for ($i = 1; $i <= 12; $i++) {
            switch ($i) {
                case 1:
                    $data = $this->db->con->query("SELECT (SUM(earn) - SUM(expense)) AS gain FROM bank WHERE updated_at LIKE('$year-1-%') ORDER BY bank_id DESC LIMIT 1");
                    $january = mysqli_fetch_assoc($data);
                    $january == null || $january['gain'] < 0 ? $january['gain'] = 0 : $january['gain'];
                    array_push($yearArray, $january['gain']);
                    break;
                case 2:
                    $data = $this->db->con->query("SELECT (SUM(earn) - SUM(expense)) AS gain FROM bank WHERE updated_at LIKE('$year-2-%') ORDER BY bank_id DESC LIMIT 1");
                    $february = mysqli_fetch_assoc($data);
                    $february == null || $february['gain'] < 0 ? $february['gain'] = 0 : $february['gain'];
                    array_push($yearArray, $february['gain']);
                    break;
                case 3:
                    $data = $this->db->con->query("SELECT (SUM(earn) - SUM(expense)) AS gain FROM bank WHERE updated_at LIKE('$year-3-%') ORDER BY bank_id DESC LIMIT 1");
                    $march = mysqli_fetch_assoc($data);
                    $march == null || $march['gain'] < 0 ? $march['gain'] = 0 : $march['gain'];
                    array_push($yearArray, $march['gain']);
                    break;
                case 4:
                    $data = $this->db->con->query("SELECT (SUM(earn) - SUM(expense)) AS gain FROM bank WHERE updated_at LIKE('$year-4-%') ORDER BY bank_id DESC LIMIT 1");
                    $april = mysqli_fetch_assoc($data);
                    $april == null || $april['gain'] < 0 ? $april['gain'] = 0 : $april['gain'];
                    array_push($yearArray, $april['gain']);
                    break;
                case 5:
                    $data = $this->db->con->query("SELECT (SUM(earn) - SUM(expense)) AS gain FROM bank WHERE updated_at LIKE('$year-5-%') ORDER BY bank_id DESC LIMIT 1");
                    $may = mysqli_fetch_assoc($data);
                    $may == null || $may['gain'] < 0 ? $may['gain'] = 0 : $may['gain'];
                    array_push($yearArray, $may['gain']);
                    break;
                case 6:
                    $data = $this->db->con->query("SELECT (SUM(earn) - SUM(expense)) AS gain FROM bank WHERE updated_at LIKE('$year-6-%') ORDER BY bank_id DESC LIMIT 1");
                    $june = mysqli_fetch_assoc($data);
                    $june == null || $june['gain'] < 0 ? $june['gain'] = 0 : $june['gain'];
                    array_push($yearArray, $june['gain']);
                    break;
                case 7:
                    $data = $this->db->con->query("SELECT (SUM(earn) - SUM(expense)) AS gain FROM bank WHERE updated_at LIKE('$year-7-%') ORDER BY bank_id DESC LIMIT 1");
                    $july = mysqli_fetch_assoc($data);
                    $july == null || $july['gain'] < 0 ? $july['gain'] = 0 : $july['gain'];
                    array_push($yearArray, $july['gain']);
                    break;
                case 8:
                    $data = $this->db->con->query("SELECT (SUM(earn) - SUM(expense)) AS gain FROM bank WHERE updated_at LIKE('$year-8-%') ORDER BY bank_id DESC LIMIT 1");
                    $august = mysqli_fetch_assoc($data);
                    $august == null || $august['gain'] < 0 ? $august['gain'] = 0 : $august['gain'];
                    array_push($yearArray, $august['gain']);
                    break;
                case 9:
                    $data = $this->db->con->query("SELECT (SUM(earn) - SUM(expense)) AS gain FROM bank WHERE updated_at LIKE('$year-9-%') ORDER BY bank_id DESC LIMIT 1");
                    $september = mysqli_fetch_assoc($data);
                    $september == null || $september['gain'] < 0 ? $september['gain'] = 0 : $september['gain'];
                    array_push($yearArray, $september['gain']);
                    break;
                case 10:
                    $data = $this->db->con->query("SELECT (SUM(earn) - SUM(expense)) AS gain FROM bank WHERE updated_at LIKE('$year-10-%') ORDER BY bank_id DESC LIMIT 1");
                    $october = mysqli_fetch_assoc($data);
                    $october == null || $october['gain'] < 0 ? $october['gain'] = 0 : $october['gain'];
                    array_push($yearArray, $october['gain']);
                    break;
                case 11:
                    $data = $this->db->con->query("SELECT (SUM(earn) - SUM(expense)) AS gain FROM bank WHERE updated_at LIKE('$year-11-%') ORDER BY bank_id DESC LIMIT 1");
                    $nevember = mysqli_fetch_assoc($data);
                    $nevember == null || $nevember['gain'] < 0 ? $nevember['gain'] = 0 : $nevember['gain'];
                    array_push($yearArray, $nevember['gain']);
                    break;
                case 12:
                    $data = $this->db->con->query("SELECT (SUM(earn) - SUM(expense)) AS gain FROM bank WHERE updated_at LIKE('$year-12-%') ORDER BY bank_id DESC LIMIT 1");
                    $december = mysqli_fetch_assoc($data);
                    $december == null || $december['gain'] < 0 ? $december['gain'] = 0 : $december['gain'];
                    array_push($yearArray, $december['gain']);
                    break;
            }
        }
        return json_encode($yearArray);
    }

    // searching for data 
    public function search($search)
    {
        if ($search) {
            $query = "SELECT * FROM custommer INNER JOIN regular_time ON custommer.custommer_id = regular_time.custommer_id
            WHERE name LIKE('%$search%') OR phone LIKE('%$search%') OR created_at LIKE('%$search%') OR amount LIKE('%$search%') OR
            recived LIKE('%$search%') OR status LIKE('%$search%') OR entry_date LIKE('%$search%') OR play_date LIKE('%$search%') OR time LIKE('%$search%')
            OR wrote_by LIKE('%$search%');";

            $result = $this->db->con->query($query);

            $searchArray = [];

            if ($result) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $searchArray[] = $row;
                }
            }

            return json_encode($searchArray);
        }
    }
    public function loginHandler($username, $password, $table = 'users')
    {
        if (!empty($username) && !empty($password)) {
            $Username = mysqli_real_escape_string($this->db->con, $username);
            $Password = mysqli_real_escape_string($this->db->con, $password);
            $check = $this->db->con->query("SELECT * FROM {$table} WHERE username = '$Username' AND password = '$Password'");

            if (mysqli_num_rows($check) > 0) {
                $row = mysqli_fetch_assoc($check);
                $user_id = $row['user_id'];
                $username = $row['username'];
                $position = $row['position'];
                $photo = $row['photo'];


                $iss = 'localhost';
                $iat = time();
                $nbf = $iat + 1;
                $exp = $iat + (60 * 60 * 24);
                $aud = 'myusers';
                $user_arr_data = array(
                    "id" => $user_id,
                    "username" => $username,
                    "position" => $position,
                    "photo" => $photo,
                );

                $payload_info = array(
                    "iss" => $iss,
                    "iat" => $iat,
                    "nbf" => $nbf,
                    "exp" => $exp,
                    "aud" => $aud,
                    "data" => $user_arr_data
                );
                $secret_key = 'eeedrisss123';

                $token = JWT::encode($payload_info, $secret_key, 'HS384');

                http_response_code(200);
                echo json_encode(array(
                    "status" => 1,
                    "token" => $token,
                    "expireAt" => $exp,
                    "user" => $user_arr_data,
                    "message" => 'You login successfully!'
                ));
            } else {
                echo json_encode(array(
                    "status" => 0,
                    "message" => 'invalid username or password'
                ));
            }
        } else {
            echo json_encode(array(
                "status" => 0,
                "message" => "all fields are needed"
            ));
        }
    }
    public function auth($token)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            try {
                if (!empty($token)) {
                    $jwt = str_replace('Barear ', '', $token);
                    $secret_key = 'eeedrisss123';
                    $decode_data = JWT::decode($jwt, $secret_key, array('HS384'));
                    $data = $decode_data->data;
                    http_response_code(200);
                    echo json_encode(array(
                        "status" =>  1,
                        "user" => $data,
                        "message" => 'success'
                    ));
                } else {
                    echo json_encode(array(
                        "status" => 0,
                        "message" => "Login required!"
                    ));
                }
            } catch (Exception $e) {
                echo json_encode(array(
                    "status" =>  0,
                    "message" => $e->getMessage()
                ));
            }
        } else {
            echo json_encode(array(
                "status" => 0,
                "message" => "this method is not supported"
            ));
        }
    }
    //uploading images 
    public function upload($response, $upload_dir, $server_url, $photo_name, $photo_tmp_name, $error){
        $getPhoto = $this->db->con->query("SELECT * FROM users WHERE photo = '$photo_name'");
        $rows = mysqli_num_rows($getPhoto);

        if($rows < 1){
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
                    "url" => $server_url.'/'.$upload_name,
                    'image' => $photo_name
                );
            }else{
                $response = array(
                    "status" => "error", 
                    "error" => true, 
                    "message" => "Error uploading file"
                );
            }
            }elseif($rows > 0){
                $response = array(
                    "status" => "normal", 
                    "error" => false,
                    "message" => "this image uploaded once!"
                );
            }elseif(!$photo_name){
                $response = array(
                    "status" => "error", 
                    "error" => true,
                    "message" => "no file is selected!"
                );
            }

            echo json_encode($response);
    }
}
