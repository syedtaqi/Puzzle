			//Author: Syed Taqi Raza//
			// ----- Information ----- //
			var AppName = "Concentration";
			var VersionNum = "1.3";
			var LastUpdated = "July 27, 2002";
			var Author = "Greg Paskal";
			var Copyright = "© 2002 ThouArt Software";
			// ----- Global Variables ----- //
			var DisplayedImages = Images * 2;
			var PreLoadedImage = new Array();
			var Location = new Array();
			var Found = new Array();
			var RandNum = 0;
			var iFileName = "";
			var ClickNumber = 0;
			var Click1Loc = -1;
			var Click2Loc = -1;
			var Correct = 0;
			var Incorrect = 0;
			var GameStarted=false;


			
			// ----- Preload Images ----- //
			for (i=1 ; i<Images+1 ; i++){
				PreLoadedImage[i] = new Image; PreLoadedImage[i].src = "./img/img_"+i+ImageExt;
			}
			
			PreLoadImgBl = new Image; PreLoadImgBl.src = "./img/img_blank"+ImageExt;
			PreLoadedDefaultImg = new Image; PreLoadedDefaultImg.src = "./img/img_default"+ImageExt;
			PreLoadedWrongImg = new Image; PreLoadedWrongImg.src = "./img/img_wrong"+ImageExt;
			PreLdSpacer = new Image; PreLdSpacer.src = "./img/spacer.gif";
						
			if (UseBorder == 1){
				PreLoadedBorderTL = new Image; PreLoadedBorderTL.src = "border_tl"+ImageExt;
				PreLoadedBorderTM = new Image; PreLoadedBorderTM.src = "border_tm"+ImageExt;
				PreLoadedBorderTR = new Image; PreLoadedBorderTR.src = "border_tr"+ImageExt;
				PreLoadedBorderRM = new Image; PreLoadedBorderRM.src = "border_rm"+ImageExt;
				PreLoadedBorderBR = new Image; PreLoadedBorderBR.src = "border_br"+ImageExt;
				PreLoadedBorderBM = new Image; PreLoadedBorderBM.src = "border_bm"+ImageExt;
				PreLoadedBorderBL = new Image; PreLoadedBorderBL.src = "border_bl"+ImageExt;
				PreLoadedBorderLM = new Image; PreLoadedBorderLM.src = "border_lm"+ImageExt;
			}
												
			// ----- Random Number Generator ----- //
			function RandomNumber(DisplayedImages){
				RandNum = Math.floor(Math.random() * (DisplayedImages));
				return RandNum;
			}
			
			// ----- Randomly Shuffle Cards ----- //
			for (i=1 ; i<Images+1 ; i++){
			
				// ----- Determine location for first card ----- //
				RandNum = RandomNumber(DisplayedImages);
				while (Location[RandNum] != null){
					RandNum = RandomNumber(DisplayedImages);
				}
				Location[RandNum] = i;
				
				// ----- Determine location for second card ----- //
				RandNum = RandomNumber(DisplayedImages);
				while (Location[RandNum] != null){
					RandNum = RandomNumber(DisplayedImages);
				}
				Location[RandNum] = i;				
			}
			
			// -----  Set up the initial screen view ----- //
			function ScreenSetup (){
				var CreatedImages = 0;
				var CountInRow = 0;
				var DynamicLine = "";
				
				window.document.title = Title;
				document.bgColor = StartingBGColor;
				document.write("<center>");
				if (DisplayTitle == 1) document.write("<font face='Verdana, Arial, Helvetica, sans-serif' size='6' color='333333'>" + Title + "</font>");
				document.write("<table width='10' cellpadding='0' border='1' cellspacing='"+WidthBetweenImages+"'>");
				document.write("	<tr>");
				while (CreatedImages < DisplayedImages){
					document.write("		<td>");
					document.write("			<table width='10' cellpadding='0' border='1' cellspacing='0'>");
					if (UseBorder == 1){document.write("				<tr>")};
					if (UseBorder == 1){document.write("					<td><img src='./img/spacer.gif' name='border_tl_"+CreatedImages+"' width='"+BorderCornerWidth+"' height='"+BorderCornerHeight+"' border='1'></td>")};
					if (UseBorder == 1){document.write("					<td><img src='./img/spacer.gif' name='border_tm_"+CreatedImages+"' width='"+BorderHorizontalWidth+"' height='"+BorderCornerHeight+"' border='1'></td>")};
					if (UseBorder == 1){document.write("					<td><img src='./img/spacer.gif' name='border_tr_"+CreatedImages+"' width='"+BorderCornerWidth+"' height='"+BorderCornerHeight+"' border='1'></td>")};
					if (UseBorder == 1){document.write("				</tr>")};
					document.write("				<tr>");
					if (UseBorder == 1){document.write("					<td><img src='./img/spacer.gif' name='border_lm_"+CreatedImages+"' width='"+BorderCornerWidth+"' height='"+BorderVerticalHeight+"' border='1'></td>")};
					if (ImagesBeginAs == 1){document.write("					<td><a href='JavaScript:ImageClicked("+CreatedImages+")'><img src='./img/img_default"+ImageExt+"' id='loc_"+CreatedImages+"' name='loc_"+CreatedImages+"' width='"+ImageWidth+"' height='"+ImageHeight+"' border='1'></a></td>")};
					if (ImagesBeginAs == 2){document.write("					<td><a href='JavaScript:ImageClicked("+CreatedImages+")'><img src='./img/img_"+Location[CreatedImages]+ImageExt+"' id='loc_"+CreatedImages+"' name='loc_"+CreatedImages+"' width='"+ImageWidth+"' height='"+ImageHeight+"' border='1'></a></td>")};
					if (UseBorder == 1){document.write("					<td><img src='./img/spacer.gif' name='border_rm_"+CreatedImages+"' width='"+BorderCornerWidth+"' height='"+BorderVerticalHeight+"' border='1'></td>")};
					document.write("				</tr>");
					if (UseBorder == 1){document.write("				<tr>")};
					if (UseBorder == 1){document.write("					<td><img src='./img/spacer.gif' name='border_bl_"+CreatedImages+"' width='"+BorderCornerWidth+"' height='"+BorderCornerHeight+"' border='1'></td>")};
					if (UseBorder == 1){document.write("					<td><img src='./img/spacer.gif' name='border_bm_"+CreatedImages+"' width='"+BorderHorizontalWidth+"' height='"+BorderCornerHeight+"' border='1'></td>")};
					if (UseBorder == 1){document.write("					<td><img src='./img/spacer.gif' name='border_br_"+CreatedImages+"' width='"+BorderCornerWidth+"' height='"+BorderCornerHeight+"' border='1'></td>")};
					if (UseBorder == 1){document.write("				</tr>")};
					document.write("			</table>");
					document.write("		</td>");					
					CreatedImages = CreatedImages + 1;
					CountInRow = CountInRow + 1;
					
					if (CountInRow == ImagesPerRow){
						document.write("	</tr>");
						document.write("	<tr>");
						CountInRow = 0;
					}
				}
				
				document.write("	</tr>");
				document.write("</table>");
				document.write("	<p style='text-align'> <form id='gameHandleF' name='gameHandleF'> <input type='text' hidden name='donotdelete'>");
				//document.write("    <span id='ghandlemsg'> Click Game Handle to enter your game handle</span><br>");				
				//document.write("    <input type='button' name='gameHandleB' id='gameHandleB' value='Set Game Handle' onclick='setGameHandleU()'> =&nbsp;&nbsp;" );		
				document.write("    Game Handle: <input type='type' name='gameHandleU' id='gameHandleU' size='8' maxlength='8' onblur='setGameHandleU()' onkeydown='if (event.keyCode == 13) {setGameHandleU()} '> <br><span id='errmsg'></span>");
				document.write("    </form></p>" );;		
				document.write("	<p style='text-align:center:center;color:red;'> &nbsp; &nbsp; &nbsp; <span id='ghs'> Watch this area!<span> <br> </p>" );		
				document.write("<form id='ScoreForm' name='ScoreForm'>");
				document.write("	Correct = <input type='text' id='Correct' name='Correct' size='10' onFocus='JavaScript:this.blur()'>"); document.ScoreForm.Correct.value = "0" ;
				document.write("	Incorrect = <input type='text' id='Incorrect' name='Incorrect' size='10' onFocus='JavaScript:this.blur()'>"); document.ScoreForm.Incorrect.value = "0";
				document.write("	Score = <input type='text' id='Score' name='Score' size='10' onFocus='JavaScript:this.blur()'>"); document.forms['ScoreForm']['Score'].value = "0%" ;
				document.write("	Time Elapsed = <input type='text' id='TimeElapsed' name='TimeElapsed' size='10' onFocus='JavaScript:this.blur()'>"); document.getElementById('TimeElapsed').value = "0";
				document.write("	<input type='button' value='Start Game' onClick='JavaScript:StartGame()'>");
				document.write("	<input type='button' value='New Game' onClick='JavaScript:NewGame()'>");

				if (OptionRevealImages == 1) document.write("	<input type='button' value='Reveal Images' onClick='JavaScript:RevealImages()'>");
				document.write("</form>");
				if (DisplayCredits == 1) document.write("<font face='Verdana, Arial, Helvetica, sans-serif' size='2' color='333333'>" + AppName + " version " + VersionNum + " - written by " + Author + " - " + Copyright + "</font>");
				document.write("</center>");
				document.gameHandleF.gameHandleU.disabled=false;	//to ensure that the disabled is reset if the page is reloaded.
				
			}
			
			// ----- Activated when an image is clicked ----- //
			function ImageClicked(ImageNum){
			  if (GameStarted==true){
				if (ClickNumber != 2) {
					if (Found[ImageNum] != "Found"){
						var LocName = "loc_"+ImageNum; document.getElementById(LocName).src = PreLoadedImage[Location[ImageNum]].src;						
						//var LocName = "loc_"+ImageNum; document[LocName].src = PreLoadedImage[Location[ImageNum]].src;
						if (UseBorder == 1){Border (ImageNum, "On")};
						if (ClickNumber == 0){
							Click1Loc = ImageNum;
							ClickNumber = 1;
						}
						else if (ClickNumber == 1){
							if (Click1Loc != ImageNum){
								Click2Loc = ImageNum;
								ClickNumber = 2;
								if (Location[Click1Loc] != Location[Click2Loc]){
									setTimeout("ImageClickedWrong(Click1Loc, Click2Loc)", (1000 * BeforeWrongTimer));
									Score("0","1");
								}
								else{
									Found[Click1Loc] = "Found";
									Found[Click2Loc] = "Found";
									ClickNumber = 0;
									ImageClickedCorrect(Click1Loc, Click2Loc);
									Score("1","0");
									IsGameOver();
								}
							}
						}
					}
				}	
			  }
			  else
			  { alert("Press the Start Game button!");
			  }
			}
			
			// ----- Activated when a match ----- //
			function ImageClickedCorrect(Click1Loc, Click2Loc){
				if (ImagesBeginAs == 2){
					var LocName = "loc_"+Click1Loc; document[LocName].src = PreLoadedDefaultImg.src;
					var LocName = "loc_"+Click2Loc; document[LocName].src = PreLoadedDefaultImg.src;
				}
				if (UseBorder == 1){
					Border (Click1Loc, "Off");
					Border (Click2Loc, "Off");
				}
			}
						
			// ----- Activated when not a match ----- //
			function ImageClickedWrong(Click1Loc, Click2Loc){
				var LocName = "loc_"+Click1Loc; document[LocName].src = PreLoadedWrongImg.src;
				var LocName = "loc_"+Click2Loc; document[LocName].src = PreLoadedWrongImg.src;
				setTimeout("ImageClickedReset(Click1Loc, Click2Loc)", (1000 * WrongTimer));
			}
			
			// ----- Activated to reset incorrect cards ----- //
			function ImageClickedReset(Click1Loc, Click2Loc){
				if (ImagesBeginAs == 1){
					var LocName = "loc_"+Click1Loc; document[LocName].src = PreLoadedDefaultImg.src;
					var LocName = "loc_"+Click2Loc; document[LocName].src = PreLoadedDefaultImg.src;
					ClickNumber = 0;
				}
				if (ImagesBeginAs == 2){
					var LocName = "loc_"+Click1Loc; document[LocName].src = PreLoadedImage[Location[Click1Loc]].src;
					var LocName = "loc_"+Click2Loc; document[LocName].src = PreLoadedImage[Location[Click2Loc]].src;
					ClickNumber = 0;
				}
				if (UseBorder == 1){
					Border (Click1Loc, "Off");
					Border (Click2Loc, "Off");
				}
			}

			// ----- Turn on and off borders ----- //
			function Border(ImageNum, DispOpt){	
				if (DispOpt == "On"){
					var LocName = "border_tl_"+ImageNum; document[LocName].src = PreLoadedBorderTL.src;
					var LocName = "border_tm_"+ImageNum; document[LocName].src = PreLoadedBorderTM.src;
					var LocName = "border_tr_"+ImageNum; document[LocName].src = PreLoadedBorderTR.src;
					var LocName = "border_lm_"+ImageNum; document[LocName].src = PreLoadedBorderLM.src;
					var LocName = "border_rm_"+ImageNum; document[LocName].src = PreLoadedBorderRM.src;
					var LocName = "border_bl_"+ImageNum; document[LocName].src = PreLoadedBorderBL.src;
					var LocName = "border_bm_"+ImageNum; document[LocName].src = PreLoadedBorderBM.src;
					var LocName = "border_br_"+ImageNum; document[LocName].src = PreLoadedBorderBR.src;
				}
				else if (DispOpt == "Off"){
					var LocName = "border_tl_"+ImageNum; document[LocName].src = PreLdSpacer.src;
					var LocName = "border_tm_"+ImageNum; document[LocName].src = PreLdSpacer.src;
					var LocName = "border_tr_"+ImageNum; document[LocName].src = PreLdSpacer.src;
					var LocName = "border_lm_"+ImageNum; document[LocName].src = PreLdSpacer.src;
					var LocName = "border_rm_"+ImageNum; document[LocName].src = PreLdSpacer.src;
					var LocName = "border_bl_"+ImageNum; document[LocName].src = PreLdSpacer.src;
					var LocName = "border_bm_"+ImageNum; document[LocName].src = PreLdSpacer.src;
					var LocName = "border_br_"+ImageNum; document[LocName].src = PreLdSpacer.src;				
				}
			}

			// ----- Score ----- //
			function Score(Correct,Incorrect){
				document.forms['ScoreForm']['Correct'].value = parseFloat(document.forms['ScoreForm']['Correct'].value) + parseFloat(Correct);
				document.getElementById('Incorrect').value = parseFloat(document.getElementById('Incorrect').value) + parseFloat(Incorrect);
				Correct = parseFloat(document.ScoreForm.Correct.value);
				Incorrect = parseFloat(document.ScoreForm.Incorrect.value);
				document.forms['ScoreForm']['Score'].value = (parseInt((100/ (Correct + Incorrect)) * Correct))+"%";
			}
			
			// ----- Reveal all the images ----- //
			function RevealImages(){
				for (i=0 ; i < DisplayedImages ; i++){
					var LocName = "loc_"+i;
					//document[LocName].src = Location[i];
					document[LocName].src = PreLoadedImage[Location[i]].src
				}
			}
			
			// ----- Check if game is over ----- //
			function IsGameOver(){
				if (parseFloat(document.ScoreForm.Correct.value) == Images){
					document.bgColor = CompletedBGColor;
					TimeClock(StartTime,3);
					var useridScore = parseInt(document.ScoreForm.Score.value);
					if (useridScore==100){alert("Congrats, your memory is flawless!");}
					else if (useridScore>=80){alert("Very good memory!");}
					else if (useridScore>=60){alert("Keep practicing.");}
					else if (useridScore>=50){alert("Are you getting enough sleep?");}
					else {alert("Don't quit your day job...");}

				var spaceRE = /\s/;	
				var userid = document.gameHandleF.gameHandleU.value;
				if (!(userid == null || userid == undefined || userid.length != 8 || spaceRE.test(userid) == true)) 
				
				{
					//Ajax - Add call to function that will cause the userid's stats (stored in the server's database) to be updated and displayed in the element with id="ghs".	
				} 	
		
				}
			}
			
			// ----- Start New Game ----- //
			function NewGame(){
				window.location.reload();
	
			}
			
			function StartGame(){
				if (GameStarted==true) {return};  // Exit if game already started!
				var spaceRE = /\s/;
				
				
				var userid = document.gameHandleF.gameHandleU.value;
				
				if (userid == null || userid == undefined || userid.length != 8 || spaceRE.test(userid) == true)   // if game handle not set, allow user to specify game handle 
				{
					var res=confirm("Your Game Handle is not set! \r\n\r\nClick OK to remain anonymous! ");
					
					if (res==false)
					{
						setGameHandleU();
						return;
					}
					
				} else
				
				{
					//Ajax - Add call to function that will cause the userid's stats to be retrieved from the server and displayed in the element with id="ghs"		
				} 
										
				GameStarted=true;
				StartTime = new Date();				
				TimeClock(0,1);
				document.gameHandleF.gameHandleU.disabled=true;
			}

			
			// ----- Go to Games Home Page ----- //
			function GamesHome(){
				var TheURL = "games.html";
				window.location = TheURL;
			}
			
			// ----- Time Clock ----- //
			function TimeClock(StartTime,Option){
				// Option 1 = Start Timeclock
				// Option 2 = Continue Timeclock
				// Option 3 = Stop Timeclock
				
				if (Option == 1){
					var StartTime = new Date();
					TimerID = setTimeout("TimeClock(StartTime,2)", 500);
				} 
				else if (Option == 2){
					var CurrentTime = new Date();
					var ElapsedTime = parseInt(((CurrentTime.getTime()) - (StartTime.getTime()))/1000);
					var ElapsedHours = parseInt(ElapsedTime / 3600);
					var ElapsedMinutes = parseInt((ElapsedTime-(ElapsedHours * 3600)) / 60);
					var ElapsedSeconds = parseInt(ElapsedTime-((ElapsedHours*3600)+(ElapsedMinutes*60)));
					document.getElementById('TimeElapsed').value = ElapsedHours + ":" + ElapsedMinutes + ":" + ElapsedSeconds;
					TimerID = setTimeout("TimeClock(StartTime,2)", 1000);
				}
				else if (Option == 3){
					clearTimeout(TimerID);
				}
			}
			
			

function setGameHandleU()
		{
		
			var spaceRE = /\s/;
			if (GameStarted==true) {return};
			
			document.getElementById("errmsg").innerHTML = "";

			var userid = document.gameHandleF.gameHandleU.value;
			
			if (userid == null || userid == undefined || userid.length != 8 || spaceRE.test(userid) == true)   // if game handle not set, allow user to specify game handle
			{
			
			document.gameHandleF.gameHandleU.focus();
			document.gameHandleF.gameHandleU.value = "";
			document.getElementById("ghs").innerHTML = " *** Game Handle must be 8 characters in length and contain no spaces!!! ***";
			
			} else
			{
				//Ajax - Add call to function that will cause the userid's stats to be retrieved from the server and displayed in element with id="ghs"				
			} 
	
		}


//Ajax code  - retrieves and updates user's game stats!


function createXHR(){
    try{ return new XMLHttpRequest(); }					  catch(e){}
    try{ return new ActiveXObject("Msxml2.XMLHTTP.6.0");} catch(e){}
    try{ return new ActiveXObject("Msxml2.XMLHTTP.3.0");} catch(e){}
    try{ return new ActiveXObject("Msxml2.XMLHTTP");} 	  catch(e){}
    try{ return new ActiveXObject("Microsoft.XMLHTTP");}  catch(e){}

    alert("XMLHeepRequest not supported");
    return null;
}

/*
Function that is called to trigger the Ajax code:

ALL function arguments MUST be present for the call to succeed.

  foptype:  read or update.  
	if set to read, the server will return as an XML message the game stats for the specified gameHandleU. 
	if set to update, the server will update gameHandleU's stats with the value provided in score and will return as an XML message gameHandleU's stats.
  gameHandleU:  User's game handle
  score:  gameHandleU's score.  Only relevant for an update operation, BUT must nevertheless be specified for foptype=read.

*/
function sendRequest(foptype,gameHandleU,score){
	var xhr = createXHR();
	if(xhr){
		// open( method, location, isAsynchronous )
		if (foptype.length == 0 || gameHandleU.length == 0 || score.length == 0)
		{ 
		return;  // exit as we cannot proceed. 
		}
		paramsv="foptype="+foptype+"&gameHandleU="+gameHandleU+"&score="+score;
		xhr.open("GET", "./php/Games.php?"+paramsv, true);
		// bind call back function
		xhr.onreadystatechange = function(){ handleResponse(xhr);};
		// actually send the Ajax request

		xhr.send(); // null because this is a get method
	}
}

function handleResponse(xhr){
	if(xhr.readyState == 4 && xhr.status == 200){
		var msg = "";
		var parsedResponse = xhr.responseXML;
		var userid = parsedResponse.getElementsByTagName('userid')[0].firstChild.nodeValue;
		var Lscore = parsedResponse.getElementsByTagName('Lscore')[0].firstChild.nodeValue;
		var Hscore = parsedResponse.getElementsByTagName('Hscore')[0].firstChild.nodeValue;
		var TopScorer = parsedResponse.getElementsByTagName('HighScore')[0].firstChild.nodeValue;

		var msg = "Your last and high scores are: "+ Lscore+", "+Hscore+" ";
		var msg = msg + " The top scorer's statistics are: "+TopScorer;


		var responseOutput = document.getElementById("ghs");
		responseOutput.innerHTML = msg;
	}
}			
						