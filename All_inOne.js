}, 200);
​
​
​
​
​
​
//////////////////////////////////////////////////////
/////////////////////////////////////////////////////
​
function on_party_request(name) {
if (name == "MuaBan" || name == "haiz1" || name == "nhiY" || name == "Ynhi" || name == "6gunlaZe"  || name == "angioseal") {
            accept_party_request(name);
        }
        if ((name == "haiz" || name == "angioseal") && bosstime == 0 ) {
            accept_party_request(name);
        }   
    
    
    }
​
​
​
​
​
​
let modeYnhi = 1 ///1 = Ynhi //2 = haiz1 // 0 == nhiY
let banktime 
let bosstime = 0 
let timekillboss
const TenMinutesInMs = 10 * 60 * 1000
const Ten7MinutesInMs = 7 * 60 * 1000
let bankk = 0
let trieuhoi = 0
​
​
​
setInterval(function() {
    
    
if (bankk == 1 && Date.now() > banktime + Ten7MinutesInMs)
{
    bankk = 0
    start_character("MuaBan", 6);   
}   
//////////////////////////  Cho 10p danh boss
if (bosstime == 1 && Date.now() > (timekillboss + TenMinutesInMs) )
{   
    bosstime = 0
}   
//////////////////////  
    
    
  if (trieuhoi == 0)
  {
      trieuhoi = 1
if(!parent.party_list.includes("6gunlaZe")) start_character("6gunlaZe", 33);
if(!parent.party_list.includes("MuaBan")) start_character("MuaBan", 6);
      
      
if (modeYnhi == 0)   
{
if(!parent.party_list.includes("nhiY")) start_character("nhiY", 14);
}
else if  (modeYnhi == 1)
{
if(!parent.party_list.includes("Ynhi")) start_character("Ynhi", 27);    
}
else if  (modeYnhi == 2)
{
if(!parent.party_list.includes("haiz1")) start_character("haiz1", 29);  
}
Beta
0 / 0
used queries
1
