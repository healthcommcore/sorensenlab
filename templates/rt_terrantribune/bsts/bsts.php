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
	$name = $_GET['name'];
	$inst = $_GET['institution'];
	$country = $_GET['country'];

//	echo "<p>$name<br />$inst<br />$country</p>";
	$db->query("INSERT INTO " . TABLE . " (date, name, institution, country) " .
	 "VALUES (" . CURRENT_TIMESTAMP . ",'" . $name . "','" . $inst . "','" . $country . "')");

}
/*
 */
?>
