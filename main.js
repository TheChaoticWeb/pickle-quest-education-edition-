var Game = Object.create(null);
Game.WaitUntil = function(apiKey, promise) {
	promise.then(function(value) {
		Game[apiKey] = value;
	});
	return promise;
}
Game.adManager = Game.WaitUntil("adManager", AdManager.fetchData("ads.json"));
onkeydown = function(event) {
	event.preventDefault();
	if(!$("AdManager").hidden) {
		return false;
	}
	if(Math.random() <= Game.adManager.data.chance) {
		Game.adManager.loadRandomAd();
		return false;
	}
	if(Game.checkInputLocked(event)) {
		return false;
	}
	return false;
}
Game.sleep = function(time) {
	return new Promise(function(resolve) {
		setTimeout(resolve, time);
	});
}
Game.print = function(text) {
	$("CommandLineStatic").innerText = text;
}
Game.slowPrint = async function(text, ...timings) {
	Game.print("");
	var time = timings[0], index = 1;
	for(let i=0; i<text.length; i++) {
		$("CommandLineStatic").innerText += text[i];
		await Game.sleep(time);
		if(i == timings[index]) {
			index += 2;
			time = timings[index-1];
		}
	}
}
Game.slowPrintPlus = async function(texts, timings) {
	Game.print("");
	for(let i=0; i<texts.length; i++) {
		let text = texts[i], time = timings[i];
		for(let c of text) {
			$("CommandLineStatic").innerText += c;
			if(time > 0) await Game.sleep(time);
		}
	}
}

Game.randNum = function(min, max) {
    return Math.floor(Math.random() * max) + min;
}

Game.inputLockToggle = function() {
	if($("CommandLineDynamic").dataset.locked == "locked") {
		$("CommandLineDynamic").dataset.locked = "";
	}
	else {
		$("CommandLineDynamic").dataset.locked = "locked";
	}
}
Game.checkInputLocked = function(ev) {
	if($("CommandLineDynamic").dataset.locked == "locked") {
		return false;
	}
	if((ev.key.length > 1 & ["Backspace", "Enter"].indexOf(ev.key) < 0) || ev.ctrlKey || ev.altKey) {
		return false;
	}
	if(ev.key == "Enter") {
		Game.enterKeyPressed = $("CommandLineDynamic").innerText;
		$("CommandLineDynamic").innerText = "";
		return true;
	}
	if(ev.key == "Backspace") {
		$("CommandLineDynamic").innerText = $("CommandLineDynamic").innerText.slice(0, -1);
		return true;
	}
	$("CommandLineDynamic").innerText += ev.key;
	return true;
}
Game.enterKeyPressed = false;
Game.waitEnterKeyPressed = function() {
	return new Promise(function(resolve) {
		var loop = setInterval(function() {
			if(Game.enterKeyPressed) {
				var result = Game.enterKeyPressed;
				Game.enterKeyPressed = false;
				Game.inputLockToggle();
				clearInterval(loop);
				resolve(result);
			}
		});
	});
}

Game.askQuestion = function() {
        var question;
        var choiceNum = Math.random();
}

onload = async function() {
	await Game.slowPrintPlus(["Hello, User", "...", "\n\n", "Welcome back ", "to Pickle Quest: Eduacation Edition!", "\n\n", "We track your progress using your ", "`UserTag`\n", "You will input your `UserTag` right here:","\n> "], [50, 500, 250, 200, 50, 250, 50, 250, 50, 250]);
	Game.inputLockToggle();
	var usertag = await Game.waitEnterKeyPressed();
    var doneTestMode = true;
    if (usertag == "testUser") {
        doneTestMode = false;
        while(doneTestMode == false) {
            await Game.slowPrintPlus(["You have entered: ", "`Test Mode`","\nWhat would you like to do?\n\n~ (E)xit test mode\n~ Test out (a)ds\n~ (J)ump to a specific point in the game\n > "],[50,200,100]);
            Game.inputLockToggle();
            var choice = await Game.waitEnterKeyPressed();
            switch(choice) {
                case "E":
                    doneTestMode = true;
                    break;
				case "a":
					await Game.slowPrintPlus(["Please choose an ad to test\n~ (P)ortal 1 AD\n~ Portal (2) AD\n> "],[100]);
					Game.inputLockToggle();
					var choice = await Game.waitEnterKeyPressed();
					switch (choice) {
						case "P":
							break;
						default:
							break;
					}
					break;
                default:
                    await Game.slowPrintPlus(["Please Choose a vaild option","\n..."],[100,1000]);
                    break;
                    
            }
        }
    }
	if (usertag == "enterHeckerConsole") {
		await Game.slowPrintPlus(["This part is a Work In progress."],[100]);
	}
    
	await Game.slowPrintPlus(["Hello, User...\n\nWelcome back to Pickle Quest!\n\nWe track your progress using your `UserTag`\nYou will input your `UserTag` right here:\n> " + usertag, "\n\n(!) ", "Achivement Unlocked: ", "What's your name again? I forgot.", "\n", "Are you ready, ", usertag, "?", "\n\n", "Your very Owen adventure is about to unfold.", "\n", "Take courage, and leap into the world of SCIENCE! where dreams, baking soda, and vinegar await.", "\n", "I'll be expecting you later.", "\n", "Have fun", "..", "."], [0, 250, 100, 50, 250, 100, 200, 100, 250, 100, 250, 100, 250, 200, 250, 200, 750, 2000]);
	await Game.slowPrintPlus(["Good morning!", "\n", "You have been in sleep mode for", " ", "NINE", " ", "NINE", " ", "NINE", " ", "NINE", " ", "NINE", " ", "NINE", " ", "NI", "-", "\n", "You decided to stop.", "\n\n(!) ", "Achivement Unlocked: ", "Rise and sine!", "\n", "so yea ur awake now :)", "\n", "What would you like to do?", "\n\n", "~ Go back to (s)leep", "\n", "~ (T)urn on your computer", "\n\n", "(Choose s/T)", "\n> "], [50, 250, 100, 750, 25, 500, 25, 500, 25, 500, 25, 500, 25, 750, 25, 500, 25, 100, 250, 100, 250, 100, 50, 250, 100, 250, 100, 250, 50, 250, 50, 250, 100, 250]);
	Game.inputLockToggle();
	var choice = await Game.waitEnterKeyPressed();
	switch(choice) {
		case "s":
			Game.slowPrintPlus(["You \"go back to (s)leep\"", "...", "\n\nYou never wake up.\n", "You may now close the tab."], [200, 750, 250, 100]);
			break;
		case "T":
			await Game.slowPrintPlus(["You turn on your computer", "...\n", "What would you like to do?", "\n\n", "~ (T)urn off your computer", "\n", "~ Pet the (M)ongoose\u2122", "\n\n", "(Choose T/M)", "\n> "], [200, 500, 100, 250, 50, 250, 50, 250, 100, 250]);
			Game.inputLockToggle();
			choice = await Game.waitEnterKeyPressed();
			switch(choice) {
				case "T":
					await Game.slowPrintPlus(["Congratulations! You have successfully trapped yourself in a paradox!!", "\n\n(!) ", "Achivement Unlocked: ",  "paradox", "\n\n", "paradox\n".repeat(10000)], [100, 250, 100, 50, 250, 1]);
					break;
				case "M":
					await Game.slowPrintPlus(["...\n\n", "Why did you just do that...?\n", "No one has ever pet a Mongoose\u2122 and lived to tell the tale.", "\n", "You know what that means", "..", "."], [1000, 250, 100, 250, 100, 500, 2000]);
					await Game.slowPrintPlus(["{{ BOSS BAT", "--", "\n\n", "You just stepped on a lego.\nYour roommate notices that you are not breathing, as (s)he calls for 911\nas you are brought to the emergency room, where we are now", "..", "."], [500, 50, 250, 50, 500, 2000]);
					await Game.slowPrintPlus(["This part is a work in progress. Try again later."], [200]);
					break;
				default:
					await Game.slowPrintPlus(["You didn't enter a valid option, so you just stand around doing nothing.", "\n\n", "One of the sweet Pickles' evil Assassination Drones flies in through your window\nand shoots a giant laser beam causing your house to explode so big\nthe entire solar system explodes, launching you into the sky\nwhere you fall down and die of fall damage.", "\n\nYou may now close the tab."], [50, 250, 50, 250]);
			}
			break;
		default:
			Game.slowPrintPlus(["You refuse to choose a valid option, causing your head to explode; in turn, causing you to die bruitally.", "\n", "The sweet Pickles take over the world and you were the only one who could stop them.", "\n\n", "Too bad; so sad", "...", "\n", "You may now close the tab."], [50, 250, 50, 250, 100, 750, 250, 100]);
	}
}