let modeboss = 0
let modehero = 0
let reset = 0


if(!parent.party_list.includes("Ynhi")) start_character("Ynhi", 28);
if(!parent.party_list.includes("haiz1")) start_character("haiz1", 32);
//if(!parent.party_list.includes("angioseal")) start_character("angioseal", 28);

	if (!character.party) {
    send_party_request("haiz");
	}

/////////////////
setInterval(function() {
	if (!character.party) {
    send_party_request("haiz");
	}

if (reset == 1)
{
stop_character("haiz1") 
stop_character("Ynhi") 
stop_character("6gunlaZe") 	
}



	
if (modeboss = 0) return
	
if(!parent.party_list.includes("Ynhi") && modehero == 1 ) start_character("Ynhi", 28);
 if(!parent.party_list.includes("haiz1") && modehero == 2) start_character("haiz1", 32);
//if(!parent.party_list.includes("angioseal") && modehero == 1) start_character("angioseal", 28);
if(!parent.party_list.includes("6gunlaZe") && modehero == 3 ) start_character("6gunlaZe", 25);
	
reset = 0	
}, 40000);


function on_cm(name, data) {


/////////////////////		
	    if(name == "haiz" )
	{
       if(data == "tieptuc")modeboss = 1
       if(data == "dunglai")modeboss = 0
       if(data == "reset")reset = 1
       if(data == "mode1")modehero = 1
       if(data == "mode2")modehero = 2
       if(data == "mode3")modehero = 3







		

	
	}
}









