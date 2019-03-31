<?php
$to = "somebody@example.com";
$subject = "ur subject";
$txt = $_POST['content'];
$headers = "From: webmaster@example.com" . "\r\n" .
"CC: somebodyelse@example.com";

mail($to,$subject,$txt,$headers);
?>