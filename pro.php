<?php

require('config.php');

$sql = "SELECT * FROM costs";
$result = $mysqli->query($sql);
while($row = $result->fetch_array(MYSQLI_ASSOC)){
  $data[] = $row;
  $desc[] =  $row["Description"];
  $cost[] =  $row["Unit_Cost"];
}
$results = ["sEcho" => 1,
        	"iTotalRecords" => count($data),
        	"iTotalDisplayRecords" => count($data),
        	"aaData" => $data
			];
//echo json_encode($results);

?>