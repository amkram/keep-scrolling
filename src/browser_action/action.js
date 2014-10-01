var miles = 0;
var feet = 0;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	console.log(request);
	chrome.storage.local.get(["feet"], function (items){
  		feet = items.feet;
  		console.log(feet);
  		
  		if(request.response > -1)
  	{
	    miles = request.response;

	    var newDiv = document.createElement( "popup" );
	    chrome.storage.local.set({"feet": feet});
		newDiv.className = "popupStyle";
		newDiv.innerHTML = "You Have Scrolled " + miles + " Miles and <br>" + feet.toFixed(1) + " Feet!";
		
		document.getElementById("popupStyle").appendChild( newDiv );

  	}
  	if(request.message == "prompt")
  	{
  		var newDiv = document.createElement( "update" );

		newDiv.className = "popupStyle";
		newDiv.innerHTML = "Screen Height Updated.";
		document.getElementById("popupStyle").appendChild( newDiv );
  		
  		var input = prompt("Initial Setup: \nPlease enter your screen's height in inches: ");
  		chrome.storage.local.set({"height": input});
  	}

  	if(request.message == "reload")
  	{

  		var div = document.getElementById("popupStyle");
  		div.innerHTML = "You Have Scrolled " + miles + " Miles and <br>" + feet.toFixed(1) + " Feet!";

	}
  	console.log(request.feet_increment);
  	});

  	 
	


  });
chrome.runtime.sendMessage({message: "popup"});
