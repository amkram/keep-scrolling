var miles;
var feet;
var prompt = false;
var inchHeight;
chrome.storage.local.get(["miles"], function(items)
{
	var milesStored = parseInt(items.miles);
	if(items.miles == undefined)
		{
			chrome.storage.local.set({"miles": 0});
			miles = 0;
		}
	else miles = milesStored;
});
chrome.storage.local.get(["feet"], function(items)
{
	var feetStored = parseInt(items.feet);
	if(feetStored == 0 || feetStored == null)
		{
			chrome.storage.local.set({"feet": 0.01});
			feet = .01;
		}
 	else feet = feetStored;
});
chrome.storage.local.get(["height"], function(items)
{
	if(items.height == undefined || items.height == null || items.height == 0 || isNaN(items.height))
		prompt = true;
	else inchHeight = items.height;
});

var height;
chrome.windows.getCurrent(function(w) {
	height = w.height;
});
var scroll_increment = 100;
var pixels_per_inch = height / inchHeight;
var pixels_per_foot = 12 * pixels_per_inch;
var feet_increment = scroll_increment/pixels_per_foot;

chrome.runtime.onMessage.addListener(
  function(request, sender, response)
  {
  	chrome.storage.local.get(["height"], function(items)
	{
		if(!isNaN(items.height))
			inchHeight = items.height;
		else prompt = true;
	});

	pixels_per_inch = height / inchHeight;
	pixels_per_foot = 12 * pixels_per_inch;
	feet_increment = scroll_increment/pixels_per_foot;
  	if(prompt)
		{
			sendMessage("prompt");
			prompt = false;
		}
  	if(request.message == "scroll_event")
  		{
  			if(feet < 5280)
  			{
  				
  				chrome.storage.local.set({"feet": feet+feet_increment});
  				feet = feet + feet_increment;
  				
  			}
  			else 
  				{
  					miles++;
  					
  				}
  			chrome.storage.local.set( { "miles": miles});
  			chrome.storage.local.set( { "feet": feet});
  			chrome.runtime.sendMessage({message: "reload"});
  		}
  	else if(request.message == "popup")
  		sendResponse(miles, feet);
  	
	}
)

function sendResponse(miles, feet)
{
	chrome.runtime.sendMessage({response: miles});
	chrome.storage.local.set({"feet": feet});
}
function sendMessage (msg) {
	chrome.runtime.sendMessage({message: msg});
}