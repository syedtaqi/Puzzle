<?php
    header("Cache-Control: no-cache");
    header("Pragma: no-chache");
    header("Content-Type: text/xml");
	
	require 'mysql.inc';
	require 'games.inc';
	/* 
	PHP scripts expects three input variables transmitted via the GET method:
		foptype - defines the type of operation
		gameHandleU - user id
		score - gameHandleU's game score  - NOTE: must be specified but ignored if foptype is read.
	
	foptype = read
		
		search the db for a userid = gameHandleU
		if an entry exists
			return the user's stats and the top scorer's stats as an XML document
		else
			create an entry
			return the user's stats and the top scorer's stats as an XML document
	
	foptype = update
		
		search the db for a userid = gameHandleU
		if an entry exists
			update the user's stats 
			return user's latest and top scorer's stats as an XML document
		else
			create an entry
			return the user's stats and the top scorer's stats as an XML document
	
	
	*/
	
	
    $ip = $_SERVER['REMOTE_ADDR'];
	
	$foptype = $_GET['foptype'];  // type of operation - read or update
	$fuserid = $_GET['gameHandleU'];  
	$fscore = $_GET['score']; // user score - only relevant when foptype is update but MUST nevertheless be specified.
	
	
	
		// Connection to mysql server
		$con = mysql_connect($mysql_host,$mysql_user,$mysql_password);
		if ($con==false)
		{
		    die('Could not connect: ' . mysql_error());		
		}		

		// Select database
		$dbsel=mysql_select_db($mysql_database, $con);

		if ($dbsel==false)
		{
	  	    $date_ts=date("Y-m-d H:i:s e");
		    $file=fopen("concentration.log","a+");
		    $log_txt="$date_ts, ".$_SERVER['REMOTE_ADDR'].", could not select DB, $foptype, $fuserid, $fscore, ". mysql_error()." \r\n";
		    fwrite($file,$log_txt);
		    fclose($file); 
		    die('Unable to process transaction');		
		}


	
		if ($foptype == "read")	//optype = read
		{
			opread();
		}
		
		
		if ($foptype == "update")	//optype = update
		{
			opupdate();

		}
		
		
		//We known the entry exists, lets read it into $row!
		$sqlqry = "SELECT * FROM `$mysql_commandetbl` WHERE userid = '$fuserid'";
		$result = mysql_query($sqlqry);	
		if ($result==false)
		{
				$date_ts=date("Y-m-d H:i:s e");
				$file=fopen("concentration.log","a");
				$log_txt="$date_ts ,".$_SERVER['REMOTE_ADDR'].", query failed, $foptype, $fuserid, $fscore, ".mysql_error()."\r\n";
				fwrite($file,$log_txt);
				fclose($file); 
				die('Query failed: ' . mysql_error());			
		}		

		$row = mysql_fetch_array($result);  // Push the result to the $row variable
		
		
		// Close connection
		$res_close=mysql_close($con);

		if ($res_close==false)
		{
		    echo ('Error encountered while closing: ' . mysql_error());		
			
		}
	
	
	//Prepare the response as an XML document


    print "<?xml version='1.0' encoding='UTF-8'?>";
	print "<response>";
	print "<userid>".$row['userid']."</userid>";
	print "<Lscore>".$row['lastscore']."</Lscore>";
	print "<Hscore>".$row['highscore']."</Hscore>";
	print "<HighScore>Not implemented</HighScore>";
	print "</response>";	

?>