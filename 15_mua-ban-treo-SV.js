if(!parent.party_list.includes("Ynhi")) start_character("Ynhi", 28);
if(!parent.party_list.includes("haiz1")) start_character("haiz1", 32);
//if(!parent.party_list.includes("angioseal")) start_character("angioseal", 28);

	if (!character.party) {
    send_party_request("haiz");
	}


setInterval(function() {
	if (!character.party) {
    send_party_request("haiz");
	}
	
if(!parent.party_list.includes("Ynhi")) start_character("Ynhi", 28);
 if(!parent.party_list.includes("haiz1")) start_character("haiz1", 32);
//if(!parent.party_list.includes("angioseal")) start_character("angioseal", 28);
	
	
}, 40000);
