<?php

function opread()

{

				global $mysql_commandetbl;
				global $mysql_database;			
				global $fuserid;
				global $foptype;
				global $fscore;


				// Prepare SQL statement to retrieve userid statistics
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

				

				if (mysql_num_rows($result) == 0) 
				{
					//user does not exist, lets create an entry
					$sql_insert="INSERT INTO $mysql_database.$mysql_commandetbl(userid,lastscore,lasttime,highscore,hightime) VALUES ('$fuserid',0,'00:00:00',0,'00:00:00')";
					//echo($sql_insert);
					$res_ins=mysql_query($sql_insert);
					if ($res_ins==false)
					{
						$date_ts=date("Y-m-d H:i:s e");
						$file=fopen("concentration.log","a");
						$log_txt="$date_ts ,".$_SERVER['REMOTE_ADDR'].", insert failed, $foptype, $fuserid, $fscore, ".mysql_error()."\r\n";
						fwrite($file,$log_txt);
						fclose($file); 
						die('Insert failed: ' . mysql_error());		
					}
					
				}
				
}


function opupdate() 

{

				global $mysql_commandetbl;
				global $mysql_database;			
				global $fuserid;
				global $foptype;
				global $fscore;

				// Prepare SQL statement to retrieve userid statistics				
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

				

				if (mysql_num_rows($result) == 0) 
				{
					//user does not exist, lets create an entry for the user in the database
					$sql_insert="INSERT INTO $mysql_database.$mysql_commandetbl(userid,lastscore,lasttime,highscore,hightime) VALUES ('$fuserid','$fscore','00:00:00','$fscore','00:00:00')";
					//echo($sql_insert);
					$res_ins=mysql_query($sql_insert);
					if ($res_ins==false)
					{
						$date_ts=date("Y-m-d H:i:s e");
						$file=fopen("concentration.log","a");
						$log_txt="$date_ts ,".$_SERVER['REMOTE_ADDR'].", insert failed, $foptype, $fuserid, $fscore, ".mysql_error()."\r\n";
						fwrite($file,$log_txt);
						fclose($file); 
						die('Insert failed: ' . mysql_error());		
					}
				}	
				else
				{
				
					//user exist, lets read in the current values
					
					$row = mysql_fetch_array($result);  // Push the result to the $row variable
					
					//is current score new high score?
					
					if ($fscore > $row['highscore'])
					{
						$fhighscore = $fscore;
					} else
					{
					    $fhighscore = $row['highscore'];
					}
					
					
					
					$sql_update="UPDATE $mysql_commandetbl SET lastscore='$fscore',highscore='$fhighscore' WHERE userid='$fuserid'";
					//echo($sql_insert);
					$res_ins=mysql_query($sql_update);
					if ($res_ins==false)
					{
						$date_ts=date("Y-m-d H:i:s e");
						$file=fopen("concentration.log","a");
						$log_txt="$date_ts ,".$_SERVER['REMOTE_ADDR'].", update failed, $foptype, $fuserid, $fscore, ".mysql_error()."\r\n";
						fwrite($file,$log_txt);
						fclose($file); 
						die('Insert failed: ' . mysql_error());		
					}
				
				}
				
				





}


?>