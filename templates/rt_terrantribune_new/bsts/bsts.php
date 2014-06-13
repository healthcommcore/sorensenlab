<?php
define('DB', 'sorensen');
define('USER', 'sorensen');
define('PWORD', 'srplease');
define('TABLE', 'jos_bsts');

$db = new mysqli('localhost', USER, PWORD, DB);
if($db->connect_errno) {
	echo "Connection failure";
}

if(isset($_GET['name']) && isset($_GET['institution']) && isset($_GET['country'])) {
	$name = $db->real_escape_string($_GET['name']);
	$inst = $db->real_escape_string($_GET['institution']);
	$country = $db->real_escape_string($_GET['country']);

//	echo "<p>$name<br />$inst<br />$country</p>";
	if(!$stmt = $db->prepare("INSERT INTO " . TABLE . " (date, name, institution, country) " .
	 "VALUES (" . CURRENT_TIMESTAMP . ",'" . $name . "','" . $inst . "','" . $country . "')")){
		 echo "Prepare failed: (" . $db->errno . ") " . $db->error;
	 }

	$date = CURRENT_TIMESTAMP;
	$stmt->bind_param('ssss', $date, $name, $inst, $country);

	if(!$stmt->execute()){
		 echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
	 }
}
?>
