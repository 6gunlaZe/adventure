// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!
///VIPPPPPPPPPPPP
//////////////// start_character("angioseal", 21); 
var idmap
let delayitem
let skillbua = 0
let run = 1
let datahero
let keyauto
let checkback = 0
let movesuper = 0
game_log("Game vs 1.1");

smart_move({ map: "cave", x: -194, y: -1281 })
start_character("MuaBan", 6);	

setInterval(function() {

if(!parent.party_list.includes("Ynhi") ) start_character("Ynhi", 28);
// if(!parent.party_list.includes("haiz1") ) start_character("haiz1", 32);	
// if(!parent.party_list.includes("6gunlaZe") ) start_character("6gunlaZe", 25);
if(!parent.party_list.includes("6gunlaZe") ) start_character("6gunlaZe", 33);

	
}, 40000);
let timeat = Date.now();
let initialTarget = null
//////////////////////////////////////////
let checkkill = -1
let nhay = 1
let z = 1;  
let bat = 0
let bossA = 0
let nguyhiem = 0
let backk = 0
let runn = 1
let stopp = 0
/// auto ham nguc cryt
setInterval(function() {
if (movesuper == 1)return	
if (character.map != "crypt" && z > 100){
	z = 1
	stop_character("Ynhi")	
	stop_character("6gunlaZe")	
	checkback = 0
}
if (character.map != "crypt") return;


if (smart.moving || is_moving(character) ) return;
if (z > 100)smart_move({ map: "cave", x: -194, y: -1281 })	
let toado = [


{ x: 0, y: -250, z: 1 },
{ x: 0, y: -306.25, z: 2 },
{ x: 0, y: -362.5, z: 3 },
{ x: 0, y: -418.75, z: 4 },
{ x: 0, y: -475, z: 5 },

{ x: -50, y: -481.25, z: 6 },
{ x: -100, y: -487.5, z: 7 },
{ x: -150, y: -493.75, z: 8 },
{ x: -200, y: -500, z: 9 },

{ x: -200, y: -575, z: 10 },
{ x: -200, y: -650, z: 11 },
{ x: -200, y: -725, z: 12 },
{ x: -200, y: -800, z: 13 },

{ x: -200, y: -868.75, z: 14 },
{ x: -200, y: -937.5, z: 15 },
{ x: -200, y: -1006.25, z: 16 },
{ x: -200, y: -1075, z: 17 },

{ x: -132.5, y: -1078.75, z: 18 },
{ x: -65, y: -1082.5, z: 19 },
{ x: 2.5, y: -1086.25, z: 20 },
{ x: 70, y: -1090, z: 21 },

{ x: 142.5, y: -1090, z: 22 },
{ x: 215, y: -1090, z: 23 },
{ x: 287.5, y: -1090, z: 24 },
{ x: 360, y: -1090, z: 25 },

{ x: 450, y: -1090, z: 26 },
{ x: 540, y: -1090, z: 27 },
{ x: 630, y: -1090, z: 28 },
{ x: 720, y: -1090, z: 29 },

{ x: 720, y: -1000, z: 30 },
{ x: 720, y: -930, z: 31 },
{ x: 720, y: -860, z: 32 },
{ x: 720, y: -860, z: 33 },

{ x: 720, y: -742.5, z: 34 },
{ x: 720, y: -682.5, z: 35 },
{ x: 720, y: -625, z: 36 },
{ x: 720, y: -625, z: 37 },

{ x: 825, y: -612.5, z: 38 },
{ x: 825, y: -606.25, z: 39 },
{ x: 930, y: -600, z: 40 },
{ x: 930, y: -600, z: 41 },

{ x: 950, y: -500, z: 42 },
{ x: 950, y: -450, z: 43 },

{ x: 970, y: -400, z: 44 },
{ x: 1127, y: -400, z: 45 },
{ x: 1277, y: -400, z: 46 },

{ x: 377, y: -1294, z: 47 },

{ x: 380, y: -1470, z: 48 },

{ x: 550, y: -1470, z: 49 },
{ x: 550, y: -1470, z: 50 },
{ x: 720, y: -1470, z: 51 },
{ x: 720, y: -1470, z: 52 },

{ x: 885, y: -1470, z: 53 },
{ x: 885, y: -1470, z: 54 },
{ x: 1050, y: -1470, z: 55 },
{ x: 1050, y: -1470, z: 56 },

{ x: 1180, y: -1470, z: 57 },

{ x: 1410, y: -1470, z: 58 },

{ x: 1585, y: -1470, z: 59 },

{ x: 1760, y: -1470, z: 60 },

{ x: 1775, y: -1605, z: 61 },
{ x: 1790, y: -1740, z: 62 },

{ x: 1940, y: -1740, z: 63 },
{ x: 2090, y: -1740, z: 64 },

{ x: 2090, y: -1740, z: 65 },
{ x: 2205, y: -1740, z: 66 },
{ x: 2205, y: -1740, z: 67 },

{ x: 2320, y: -1740, z: 68 }

];
if (character.hp < 3000) parent.api_call("disconnect_character", {name: "haiz"});

	
 let member1 = get_player("6gunlaZe");
 let member2 = get_player("Ynhi");

 if (member1 && member1.target !== initialTarget && (Date.now() < timeat + 10000 ) )return //trở lại khi cung bắt skill shot để chờ 1 thời gian
	
if (member1)initialTarget = member1.target	
timeat = Date.now();


//////////////////Logic new

const mobTypes = ["a0", "a1" , "a2" , "a3", "a4", "a5" , "a6" , "a7", "a8", "vbat"];
const mobsInRange = Object.values(parent.entities)
    .filter(entity => 
        mobTypes.includes(entity.mtype) &&  // Kiểm tra nếu loại mob là "bat" hoặc "bigbird"
        entity.visible &&                    // Kiểm tra nếu thực thể đang hiển thị
        !entity.dead &&                      // Kiểm tra nếu thực thể chưa chết
        distance(character, entity) <= 350  // Kiểm tra nếu khoảng cách từ nhân vật đến mob nhỏ hơn phạm vi của kỹ năng "agitate"
    );
const untargetedMobs = mobsInRange.filter(monster => !monster.target);  // Kiểm tra nếu mob chưa có mục tiêu

	

if(mobsInRange.length == 0){
	runn = 1;
	backk = 0;
}
else if (mobsInRange.length == 1 && untargetedMobs.length == 0)
	{
	backk = 0;
	runn = 0;
	}
else
{
	backk = 1;
	checkback++
	runn = 0;	
}





	




	
/////////////////	

	
 var  targetkill = solobosskill({ max_range: 300}) 
 var  targetNO = solobossNO({ max_range: 330}) 

if (get_NUMber_kill() >= 10 && targetkill.length == 0 || z > 67 || (checkback + z) > 120 ){
	stop_character("Ynhi")	
	stop_character("6gunlaZe")	
	z = 1000
	monsterIds = [];
	smart_move({ map: "cave", x: -194, y: -1281 })
}

	
game_log("checkk boss can kill !!!!!!  "+ targetkill.length   );	
game_log("checkk boss NO kill!!!!!!  "+  targetNO.length  );	

	        var  targetNOsafe1 = solobossNO1({ max_range: 330}) 	///có a2
	        var  targetNOsafe = solobossNO({ max_range: 280}) 
		var currentTarget = get_nearest_monster_solobosskill() 


		if(currentTarget && currentTarget.target && targetNOsafe.length == 0 && currentTarget.mtype == "a2") 
		{
			if (!member1 || !member2) parent.api_call("disconnect_character", {name: "haiz"});
		}

let numberkilll = get_NUMber_kill()	
	

//////////////
if ( checkkill != numberkilll )
{
const token = key_auto;  // Thay bằng token của bạn
const issueBody = `kill = ${numberkilll}`;

ghichu(character.in, issueBody,token)

checkkill = numberkilll
}
/////////////
	
game_log("ZZZ = !!!!!!  "+ z  );	




/////////////////////////////////logic di chuyển

if (runn == 1)
{
      if (z < 68 ) {
        z++;
      }
      let result = toado.find(item => item.z === z);    
      if (result) {
        xmove(result.x, result.y);  // Di chuyển tới vị trí (x, y)
      }

	
}
if(backk == 1)
{
      if (z > 1) {
        z--;
      }
      // Lấy đối tượng có z tương ứng
      let result = toado.find(item => item.z === z);

      if (result) {
        xmove(result.x, result.y);  // Di chuyển tới vị trí (x, y)
      }	
}

///////////////////////////////


	
    if (targetkill.length === 1 && targetNO.length == 0 ) {
      // Lệnh riêng của bạn khi targetkill = 1
	    if (character.mp > 100 &&  can_use("taunt") &&  (targetkill.target == "Ynhi" || targetkill.target == "nhiY" || targetkill.target == "6gunlaZe" ) )
             use_skill("taunt", targetkill);
          nguyhiem = 0
	/////////////////////////////////    
    } else if (targetkill.length === 0 && targetNO.length == 0) {
      // Lấy đối tượng có z tương ứng
      nguyhiem = 0
	    
	if (member2 && member1 && distance(character, member2) < 150  && distance(character, member1) < 150 )
              {}
        else {
		if (!member2 || !member1)
		{
			 let result = toado.find(item => item.z === z);   
if (z == 0) z = 1;
else if (z == 1) z = 2;
else if (z == 2) z = 1;

                   if (result && z <3) {
                  xmove(result.x, result.y);  // Di chuyển tới vị trí (x, y)
                 }
	          }
		
		return
	      }





    } else if (targetkill.length >= 2  || targetNO.length > 0) {
    
    }


	
}, 500);



function ghichu(title, mess, key_auto1) {
  const token = key_auto1;  // Thay bằng token của bạn
  const repoOwner = '6gunlaZe';  // Tên người sở hữu repo
  const repoName = 'game';  // Tên repository
  const issueTitle = title;
  const newLine = mess;  // Nội dung dòng mới cần thêm vào

  // Tìm kiếm các issue có tiêu đề trùng với title trong repository cụ thể
  fetch(`https://api.github.com/search/issues?q=${encodeURIComponent(issueTitle)}+repo:${repoOwner}/${repoName}`, {
    method: 'GET',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  })
  .then(response => response.json())
  .then(data => {
    if (data.items.length === 0) {
      // Nếu không tìm thấy issue với tiêu đề này, tạo mới issue
      fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${token}`,
        },
        body: JSON.stringify({
          title: issueTitle,
          body: newLine,  // Thêm nội dung dòng mới vào body
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Issue mới đã được tạo:', data);
      })
      .catch(error => {
        console.error('Lỗi khi tạo Issue:', error);
      });
    } else {
      // Nếu đã tồn tại issue, thêm dòng mới vào body của issue đầu tiên tìm được
      const issueNumber = data.items[0].number;  // Lấy số của issue đầu tiên
      const issueUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/issues/${issueNumber}`;

      // Lấy nội dung hiện tại của issue
      fetch(issueUrl, {
        method: 'GET',
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      })
      .then(response => response.json())
      .then(issueData => {
        // Kiểm tra nếu issueData.body có giá trị, nếu không thì khởi tạo giá trị mới
        const updatedBody = (issueData.body || '') + '\n' + newLine; // Thêm dòng mới vào cuối body

        // Cập nhật lại nội dung của issue
        fetch(issueUrl, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
          },
          body: JSON.stringify({
            title: issueData.title, // Giữ nguyên tiêu đề
            body: updatedBody,  // Cập nhật nội dung của issue
          }),
        })
        .then(response => response.json())
        .then(updatedData => {
          console.log('Issue đã được cập nhật:', updatedData);
        })
        .catch(error => {
          console.error('Lỗi khi cập nhật Issue:', error);
        });
      })
      .catch(error => {
        console.error('Lỗi khi lấy nội dung issue:', error);
      });
    }
  })
  .catch(error => {
    console.error('Lỗi khi tìm kiếm issue:', error);
  });
}











let monsterIds = [];
function get_NUMber_kill(args) ///mod
{
	//args:
	// max_att - max attack
	// min_xp - min XP
	// target: Only return monsters that target this "name" or player object
	// no_target: Only pick monsters that don't have any target
	// path_check: Checks if the character can move to the target
	// type: Type of the monsters, for example "goo", can be referenced from `show_json(G.monsters)` [08/02/17]
	var min_d=character.range + 150,target=null;
        var bossarmy=[ "a2" , "a3", "a7", "vbat"]; 
	if(!args) args={};
	if(args && args.target && args.target.name) args.target=args.target.name;
	if(args && args.type=="monster") game_log("get_nearest_monster: you used monster.type, which is always 'monster', use monster.mtype instead");
	if(args && args.mtype) game_log("get_nearest_monster: you used 'mtype', you should use 'type'");

	for(id in parent.entities)
	{
		var current=parent.entities[id];
		if ( (bossarmy.indexOf(current.mtype) == -1)   ) continue
		if (current.hp > 15000)continue
                if (monsterIds.includes(current.id)) continue
	
		if(current.type!="monster" || !current.visible ) continue;
		if(args.type && current.mtype!=args.type) continue;
		if(args.min_xp && current.xp<args.min_xp) continue;
		if(args.max_att && current.attack>args.max_att) continue;
		if(args.target && current.target!=args.target) continue;
		if(args.no_target && current.target && current.target!=character.name) continue;
		if(args.NO_target && current.target) continue;
		if(args.path_check && !can_move_to(current)) continue;
		var c_dist=parent.distance(character,current);
		if(c_dist>min_d) continue
                 monsterIds.push(current.id)
		
	}
	
	game_log("Số lượng quái vật kill: " + monsterIds.length)

	return monsterIds.length;
}




function get_nearest_monster_solobosskill(args) ///mod
{
	//args:
	// max_att - max attack
	// min_xp - min XP
	// target: Only return monsters that target this "name" or player object
	// no_target: Only pick monsters that don't have any target
	// path_check: Checks if the character can move to the target
	// type: Type of the monsters, for example "goo", can be referenced from `show_json(G.monsters)` [08/02/17]
	var min_d=character.range + 155,target=null;
        var bossarmy=[ "a2" , "a3", "a7", "vbat"]; 
	if(!args) args={};
	if(args && args.target && args.target.name) args.target=args.target.name;
	if(args && args.type=="monster") game_log("get_nearest_monster: you used monster.type, which is always 'monster', use monster.mtype instead");
	if(args && args.mtype) game_log("get_nearest_monster: you used 'mtype', you should use 'type'");

	for(id in parent.entities)
	{
		var current=parent.entities[id];
		if ( (bossarmy.indexOf(current.mtype) == -1)   ) continue
		if(current.type!="monster" || !current.visible || current.dead) continue;
		if(args.type && current.mtype!=args.type) continue;
		if(args.min_xp && current.xp<args.min_xp) continue;
		if(args.max_att && current.attack>args.max_att) continue;
		if(args.target && current.target!=args.target) continue;
		if(args.no_target && current.target && current.target!=character.name) continue;
		if(args.NO_target && current.target) continue;
		if(args.path_check && !can_move_to(current)) continue;
		var c_dist=parent.distance(character,current);
		if(c_dist<min_d) min_d=c_dist,target=current; //lua chon quai vat gan nhat
	}
	return target;
}





// number 0 la an toan
function focusA2safe0(options = {}) { 
    const entities = []
     let number = 0
	var bossarmy=[ "a2" ]; 
	
    for (const id in parent.entities) {
        const entity = parent.entities[id]
        if (entity.type !== "monster") continue
        if (entity.dead || !entity.visible) continue

 if ( distance(character, entity) > 360) continue
if ( distance(character, entity) < 180) continue
 if (options.type && entity.mtype !== options.type) continue
		 if (options.minHP && options.minHP*entity.max_hp > entity.hp) continue
		 if (options.fullHP && entity.hp < entity.max_hp) continue
		
		if ( (bossarmy.indexOf(entity.mtype) == -1)   ) continue
		////khong co trong list thi bo qua
		// game_log(entity.mtype + distance(character, entity));
		///
		if ( options.number &&   (number+1) > options.number ) return entities;
		/// lon hon so luong thi bo qua
			number = 1 + number
        entities.push(entity)
    }


    // We will return all entities, so that this function can be used with skills that target multiple entities in the future
    return number
}






function solobosskill(options = {}) {
    const entities = []
     let number = 0
	var bossarmy=[ "a2" , "a3", "a7", "vbat"]; 
	
    for (const id in parent.entities) {
        const entity = parent.entities[id]
        if (entity.type !== "monster") continue
        if (entity.dead || !entity.visible) continue

 if (options.max_range && distance(character, entity) > options.max_range) continue
if (options.min_range && distance(character, entity) < options.min_range) continue
 if (options.type && entity.mtype !== options.type) continue
		 if (options.minHP && options.minHP*entity.max_hp > entity.hp) continue
		 if (options.fullHP && entity.hp < entity.max_hp) continue
		
		if ( (bossarmy.indexOf(entity.mtype) == -1)   ) continue
		////khong co trong list thi bo qua
		// game_log(entity.mtype + distance(character, entity));
		///
		if ( options.number &&   (number+1) > options.number ) return entities;
		/// lon hon so luong thi bo qua
			number = 1 + number
        entities.push(entity)
    }


    // We will return all entities, so that this function can be used with skills that target multiple entities in the future
    return entities
}

	//////////check cac loai boss
//  var  targetsoloboss = soloboss({ max_range: character.range, number : 1 })  //ham bo dem quai vat
// targetsoloboss.length == 0	





function solobossNO(options = {}) {
    const entities = []
     let number = 0
	var bossarmy=["a0", "a1", "a4", "a5" , "a6" , "a8"]; 
	
    for (const id in parent.entities) {
        const entity = parent.entities[id]
        if (entity.type !== "monster") continue
        if (entity.dead || !entity.visible) continue

 if (options.max_range && distance(character, entity) > options.max_range) continue
if (options.min_range && distance(character, entity) < options.min_range) continue
 if (options.type && entity.mtype !== options.type) continue
		 if (options.minHP && options.minHP*entity.max_hp > entity.hp) continue
		 if (options.fullHP && entity.hp < entity.max_hp) continue
		
		if ( (bossarmy.indexOf(entity.mtype) == -1)   ) continue
		////khong co trong list thi bo qua
		// game_log(entity.mtype + distance(character, entity));
		///
		if ( options.number &&   (number+1) > options.number ) return entities;
		/// lon hon so luong thi bo qua
			number = 1 + number
        entities.push(entity)
    }


    // We will return all entities, so that this function can be used with skills that target multiple entities in the future
    return entities
}

	//////////check cac loai boss
//  var  targetsoloboss = soloboss({ max_range: character.range, number : 1 })  //ham bo dem quai vat
// targetsoloboss.length == 0	




function solobossNO1(options = {}) {
    const entities = []
     let number = 0
	var bossarmy=["a0", "a2", "a1", "a4", "a5" , "a6" , "a8"]; 
	
    for (const id in parent.entities) {
        const entity = parent.entities[id]
        if (entity.type !== "monster") continue
        if (entity.dead || !entity.visible) continue

 if (options.max_range && distance(character, entity) > options.max_range) continue
if (options.min_range && distance(character, entity) < options.min_range) continue
 if (options.type && entity.mtype !== options.type) continue
		 if (options.minHP && options.minHP*entity.max_hp > entity.hp) continue
		 if (options.fullHP && entity.hp < entity.max_hp) continue
		
		if ( (bossarmy.indexOf(entity.mtype) == -1)   ) continue
		////khong co trong list thi bo qua
		// game_log(entity.mtype + distance(character, entity));
		///
		if ( options.number &&   (number+1) > options.number ) return entities;
		/// lon hon so luong thi bo qua
			number = 1 + number
        entities.push(entity)
    }


    // We will return all entities, so that this function can be used with skills that target multiple entities in the future
    return entities
}

	//////////check cac loai boss
//  var  targetsoloboss = soloboss({ max_range: character.range, number : 1 })  //ham bo dem quai vat
// targetsoloboss.length == 0	




















/////////////////////////////////////////////
//////////// move gan leader
setInterval(function() {

/////////////////////////
if(parent.party_list.includes("6gunlaZe") ) send_cm("6gunlaZe","crypt")
	
if (character.map == "crypt")	
{
	idmap = character.in
send_cm("haiz1","goo")
send_cm("Ynhi","goo")
	send_cm("6gunlaZe","goo")


send_cm("haiz1",idmap)
send_cm("Ynhi",idmap)
	send_cm("6gunlaZe",idmap)

 //game_log(idmap)

}

}, 2000);

///////////

var draw_debug = true;

function on_draw(){
  if(draw_debug){
      clear_drawings();
/////////
///////////
	        draw_circle(character.real_x, character.real_y, 320);


}
}




	
let lastCallTime = 0; // Biến lưu trữ thời gian mốc
let delayThreshold = 200; // Ngưỡng thời gian 200ms



function checkTimeBetweenCalls(setMoc = 0) {
    const currentTime = Date.now(); // Lấy thời gian hiện tại

    // Nếu setMoc === 1, thì lưu thời gian hiện tại làm thời gian mốc
    if (setMoc === 1) {
        lastCallTime = currentTime;
       // console.log("Thời gian mốc đã được thiết lập: ", currentTime);
        return;
    }

    // Nếu không phải gọi để thiết lập thời gian mốc, kiểm tra thời gian giữa các lần gọi
    if (lastCallTime === 0) {
        // Lần đầu tiên gọi hàm, không có thời gian mốc
        lastCallTime = currentTime;
        return 0; // Lần đầu tiên, không cần kiểm tra
    }

    const timeDiff = currentTime - lastCallTime; // Tính thời gian giữa các lần gọi

    // Nếu thời gian giữa các lần gọi dưới delayThreshold (500ms), trả về 1 để bỏ qua
    if (timeDiff < delayThreshold) {
       // console.log(`Thời gian giữa các lần gọi quá ngắn: ${timeDiff}ms, bỏ qua.`);
        return 1; // Thời gian quá ngắn, bỏ qua
    }

    // Nếu thời gian đủ lâu, trả về 0
   // console.log(`Thời gian giữa các lần gọi là: ${timeDiff}ms, tiếp tục.`);
    return 0;
}








setInterval(function() {
////////////giui vi tri moi 2s
let checkdichuyen = smart;  // checkdichuyen sẽ là smart, đối tượng dữ liệu 
let SM = 0;
if (checkdichuyen.plot && checkdichuyen.plot.some(p => p.x !== undefined && p.y !== undefined)) {
  SM = 1;  // Nếu có ít nhất một điểm có vị trí x, y hợp lệ
}

 game_log(SM)
	
	
if (SM === 1) {
  let x = checkdichuyen.x;
  let y = checkdichuyen.y;
  let map = checkdichuyen.map;

for (let char in parent.party) {
    // Kiểm tra các điều kiện để không gửi thông tin cho chính mình, MuaBan, hoặc nếu không phải là người chơi hợp lệ
    if (char !== character.name && char !== "MuaBan"  ) {
        send_cm(char, {
            message: "location",
            x: x,
            y: y,
            map: map

        });
					// game_log("map" + map)

		        continue;
	}	
	
}
	

	
}	
else
{

/////////////////////	
for (let char in parent.party) {
    // Kiểm tra các điều kiện để không gửi thông tin cho chính mình, MuaBan, hoặc nếu không phải là người chơi hợp lệ
    if (char !== character.name && char !== "MuaBan" && !is_moving(character) ) {
        send_cm(char, {
            message: "location",
            x: character.x,
            y: character.y,
            map: character.map

        });
								// game_log("mapcharacter")

		        continue;

		
	}
	    if (char !== character.name && char !== "MuaBan" && is_moving(character) ) {
        send_cm(char, {
            message: "location",
            x: character.going_x,
            y: character.going_y,
            map: character.map

        });
									// game_log("mapcharacter")

        continue;
    }
}
	//////////////////////////////////
}
}, 1300);








function changeitem(options = {}) {
	

	if ( !options.slot ||  !options.name || !options.level ) return 
	if (character.slots[options.slot])
	{
	if (character.slots[options.slot].name == options.name && character.slots[options.slot].level == options.level) return 
	}	
////////	
	if (delayitem == undefined) delayitem = Date.now()
	if (Date.now() < 300 + delayitem) return 
	delayitem = Date.now()
	checkTimeBetweenCalls(1);  // Thiết lập thời gian mốc

//////////		
	
	
	let vitri = 100
	
	        for (let i = 0; i < character.isize; i++) {
            const item = character.items[i]
            if (!item) continue // No item in this slot

            if (item.name == options.name && item.level == options.level) {
                // This is an item we want to use!
                    vitri = i //tim ra vi tri mon do
            }
				
			}
				
	if (vitri == 100 ) return ///ko co mon do dung yeu cau
	
	
	
	
	if (!character.slots[options.slot] || character.slots[options.slot].name != options.name) { 
        unequip(options.slot);
        equip(vitri, options.slot); 
		 game_log("change: " + options.name)
    }
	

//	changeitem({ slot: "mainhand", name : "firebow", level : 6 });
}
















function chuyendoithongminh(taget)
{
///////////////////////////////////////// dang dame
				// game_log("test 3 !!!!!!");

let rate = 1

if (taget && taget.mtype == "a2" )
{
	rate = 10
}
	else
	{
		rate = 0.75
	}

if(character.hp/character.max_hp< rate )
{
	changeitem({ slot: "gloves", name : "xgloves", level : 6 });
		changeitem({ slot: "helmet", name : "hhelmet", level : 7 });

}
else
	{
		changeitem({ slot: "gloves", name : "mittens", level : 9 });
			changeitem({ slot: "helmet", name : "helmet1", level : 8 });

	}
/////////////////////////////////////////////////// hut mauuuu
	if(character.s["hardshell"] )
	{
	changeitem({ slot: "chest", name : "mcape", level : 8 });	
	}
else
{
changeitem({ slot: "chest", name : "sweaterhs", level : 8 });
}
///////////////////////////////////	 defffffffff
if (character.hp/character.max_hp >= 0.2 && skillbua == 0 && taget && taget.mtype == "a222" )
{	
changeitem({ slot: "mainhand", name : "fireblade", level : 9 });
if (checkluck == 0)changeitem({ slot: "offhand", name : "sshield", level : 8 });	
}	
else if (character.hp/character.max_hp >= 0.2 && skillbua == 0 && taget && taget.mtype != "franky")
{	
changeitem({ slot: "mainhand", name : "fireblade", level : 9 });
if (checkluck == 0)changeitem({ slot: "offhand", name : "fireblade", level : 9 });	
}
	else if (character.hp/character.max_hp >= 0.2 && skillbua == 0 && taget && taget.mtype == "franky")
	{
changeitem({ slot: "mainhand", name : "fireblade", level : 9 });
changeitem({ slot: "offhand", name : "ololipop", level : 9 });		
	}
else if (character.hp/character.max_hp < 0.2 && skillbua == 0 && checkluck == 0 )
	{
changeitem({ slot: "mainhand", name : "fireblade", level : 9 });		
changeitem({ slot: "offhand", name : "exoarm", level : 1 });		
	}
///////////////////////////////	tang dame

	if ( skillbua == 1 && checkluck == 0){
		if (character.esize == 0){
		 skillbua = 0
			 game_log("fulll tui do !!!!!!");
			return
			
		}
		if (character.slots["offhand"] )unequip( "offhand");

        changeitem({ slot: "mainhand", name : "basher", level : 7 });
		
			if (character.slots["mainhand"] && character.slots["mainhand"].name == "basher")use_skill("stomp");
				       
	}
	
	
		if ( skillbua == 1 &&  is_on_cooldown("stomp")){
		          skillbua = 0
	      }
		
		
	
	
	
	
//////////////////////////////
}



//////////////////////////////////////////////

function kite(taget, kite_range)
{

	const radius = kite_range ;
const  angle = Math.PI / 5.5 ;
    if (can_move_to(taget.real_x, taget.real_y)) {
        const angleFromCenterToCurrent = Math.atan2(character.y - taget.real_y, character.x - taget.real_x)
        const endGoalAngle = angleFromCenterToCurrent + angle
        const endGoal = { x: taget.real_x + radius * Math.cos(endGoalAngle), y: taget.real_y + radius * Math.sin(endGoalAngle) }
        move(endGoal.x, endGoal.y)

	
	}
 
	

}



function kiteSP(taget)
{


		//////////// dung skill
	if(character.hp > 1500 && character.mp > 100 && !is_on_cooldown("taunt") && taget && taget.target != "haiz" )
            {
                use_skill("taunt", taget);
				 game_log("phan no kite !!!!!!");
            }	
 
	
	////
		if(character.mp > 100 && !is_on_cooldown("charge") && taget )
            {
				   const dist1 = distance(character, taget);
    if (dist1 >  character.range + 10)
	{
		                use_skill("charge");
		 game_log("toc do kite !!!!!!");
	}

            }	
 //////
	////
		if( character.hp > 12000 && character.mp > 840 && !is_on_cooldown("warcry") && taget )
            {
				   const dist1 = distance(character, taget);
    if (dist1 > character.range)
	{
		use_skill("warcry");
				 game_log("war !!!!!!");
	}
		
	
            }	
 //////
	 /////////////////////
		if ( taget && !is_on_cooldown("hardshell") && taget.hp >5000 )
	{
		const dist1 = distance(character, taget);
    if (dist1 <= character.range + 5 && taget.target == "haiz")
	{
		use_skill("hardshell");
				 game_log("war hardshell !!!!!!");
		//if(is_moving(character))stop()
	}
		
	}	

      //////////////
	
//	 !currentTarget.s["cursed"]
   	if( !character.s["hardshell"] && character.hp < 11000 && character.mp > 340 &&  skillbua == 0 &&  !is_on_cooldown("stomp") && taget){
		skillbua = 1

			}
		


	
	///////////
//	!character.s.hasOwnProperty("massproductionpp")


///////////////////
}



function getBestTargets(options = {}) {
    const entities = []

    for (const id in parent.entities) {
        const entity = parent.entities[id]
        if (entity.type !== "monster") continue
        if (entity.dead || !entity.visible) continue

 if (options.max_range && distance(character, entity) > options.max_range) continue
if (options.min_range && distance(character, entity) < options.min_range) continue
 if (options.type && entity.mtype !== options.type) continue
		 if (options.minHP && options.minHP*entity.max_hp > entity.hp) continue
		
		
        entities.push(entity)
    }


    // We will return all entities, so that this function can be used with skills that target multiple entities in the future
    return entities
}








function soloboss(options = {}) {
    const entities = []
     let number = 0
	var bossarmy=["a0", "a1" , "a2" , "a3", "a4", "a5" , "a6" , "a7", "a8", "bat"]; 
	
    for (const id in parent.entities) {
        const entity = parent.entities[id]
        if (entity.type !== "monster") continue
        if (entity.dead || !entity.visible) continue

 if (options.max_range && distance(character, entity) > options.max_range) continue
if (options.min_range && distance(character, entity) < options.min_range) continue
 if (options.type && entity.mtype !== options.type) continue
		 if (options.minHP && options.minHP*entity.max_hp > entity.hp) continue
		 if (options.fullHP && entity.hp < entity.max_hp) continue
		
		if ( (bossarmy.indexOf(entity.mtype) == -1)   ) continue
		////khong co trong list thi bo qua
		// game_log(entity.mtype + distance(character, entity));
		///
		if ( options.number &&   (number+1) > options.number ) return entities;
		/// lon hon so luong thi bo qua
			number = 1 + number
        entities.push(entity)
    }


    // We will return all entities, so that this function can be used with skills that target multiple entities in the future
    return entities
}

	//////////check cac loai boss
//  var  targetsoloboss = soloboss({ max_range: character.range, number : 1 })  //ham bo dem quai vat
// targetsoloboss.length == 0	







///////////////////////////////////////


function use_hp_or_mp1()
{
	if(safeties && mssince(last_potion)<min(200,character.ping*3)) return resolving_promise({reason:"safeties",success:false,used:false});
	var used=true;
	if(is_on_cooldown("use_hp")) return resolving_promise({success:false,reason:"cooldown"});
	
	
if (character.mp < 600 && character.hp > 2500 ) use_skill("use_mp");
  else if (character.hp/character.max_hp< 0.97 && character.mp > 100 ) use_skill("use_hp");
  else if (character.mp/character.max_mp < 0.75) use_skill("use_mp");

	
	else used=false;
	if(used)
		last_potion=new Date();
	else
		return resolving_promise({reason:"full",success:false,used:false});
}


function on_party_request(name) {
        if (name == "MuaBan" || name == "nhiY" || name == "Ynhi" || name == "angioseal"  || name == "6gunlaZe"  || name == "haiz1") {
            accept_party_request(name);
        }
    }
//////////////////////////////////////////////////////////////////////////
var attack_mode= true

setInterval(function(){

	//use_hp_or_mp();
	use_hp_or_mp1();
	//loot();
	
	//if(character.s["hardshell"] && is_moving(character) ) stop();
	
	if(!attack_mode || character.rip ||  is_moving(character)) return;
	
if (checkTimeBetweenCalls() === 1) return;
if (nguyhiem == 1)return

	const entity1 = get_entity(character.target) // co the doi taget thu cong
	
	 var currentTarget
	
	if (entity1) {
		currentTarget = entity1
	}
	
	
	
///////////////////////////////////////////////	
	if(!currentTarget)
	{
		var currentTarget = get_nearest_monster_solobosskill() 
		if(currentTarget) {
			change_target(currentTarget);
			// game_log("test 1 !!!!!!");
		}
	}	




	
////////////////////////////////
chuyendoithongminh(currentTarget)	
//kiteSP(currentTarget)	
	var f001 = get_player("6gunlaZe")
var f00 = get_player("haiz1")
let rateskill
if (currentTarget && currentTarget.attack >8000 )
{
	rateskill = 1.1
}
else
{
	rateskill = 0.9
}

if (currentTarget && f00 )VIPSuP(currentTarget,rateskill)
if (currentTarget && !f00 ) soloTANK(currentTarget)
if (run == 1 && currentTarget && currentTarget.attack >8000 ) return //quai manh qua thi ne ra	
if (skillbua == 1) return	
//	if(!can_attack(currentTarget) && currentTarget && !character.s["hardshell"] )kite(currentTarget,character.range + 15);
//////////////////////////////////////////////	

	if( currentTarget && !is_in_range(currentTarget))
	{
		//////////// dung skill
		            if(character.mp > 100 && !is_on_cooldown("taunt") && (currentTarget.target == "Ynhi" || currentTarget.target == "6gunlaZe" ))
            {
                use_skill("taunt", currentTarget);
				 game_log("phan no !!!!!!");
            }
		else
		{

			
if (movesuper == 0 && f001){
		move(
			character.x+(f001.x-character.x)/2,
			character.y+(f001.y-character.y)/2
			);
		// Walk half the distance
	
}
			
		}



	}
	else if(can_attack(currentTarget))
	{

		
		
		
		/////////
		set_message("Attacking");
		//attack(currentTarget);
	}
	

		
	
	

	
},1000/6); // Loops every 1/4 seconds.





//////////////////
function get_nearest_playerV(currentTarget)
{
	// Just as an example
	var min_d=2000,target=0;

	for(id in parent.entities)
	{
		var current=parent.entities[id];
		if(!current.player) continue;
		if(current.target == currentTarget.id) target +=1;
	}
	game_log("so luong nguoi choi kill boss la: " + target)
	return target;
}

/////////////////////////////////////



function VIPSuP(taget,rate)
{

var f0 = get_player("haiz1")
var targetboss = taget	
var supBOSS
let safetank = 1
let ratehp = rate	
if (targetboss.target && targetboss.target == "haiz1" && !f0.s["hardshell"] && distance(f0, targetboss) < (targetboss.range + 10) && !is_on_cooldown("taunt") && !is_on_cooldown("hardshell") && character.mp > 600 && f0.hp/f0.max_hp < ratehp ) use_skill("taunt", targetboss);
	
if (targetboss.target && targetboss.target == "haiz1" && !f0.s["hardshell"] && distance(f0, targetboss) < (targetboss.range + 10) && !is_on_cooldown("taunt") &&  character.s["hardshell"] && character.mp > 600 && character.hp > 7500 && f0.hp/f0.max_hp < ratehp ) use_skill("taunt", targetboss);	
	
if (targetboss.target && targetboss.target == "haiz1" && !f0.s["hardshell"] && distance(f0, targetboss) < (targetboss.range + 10) && !is_on_cooldown("taunt") && character.mp > 600 && f0.hp/f0.max_hp < 0.4 ) use_skill("taunt", targetboss); //chi co o main tank	
	
if (targetboss.target && targetboss.target == "haiz" && !character.s["hardshell"] && distance(character, targetboss) < (targetboss.range + 14) && !is_on_cooldown("hardshell") && character.mp > 500 && !targetboss.s["stunned"] && character.hp/character.max_hp < ratehp && focusA2safe0() == 0 ) use_skill("hardshell");
	
if (targetboss.target && targetboss.target == "haiz1" && !f0.s["hardshell"] && distance(f0, targetboss) < (targetboss.range + 10) && is_on_cooldown("taunt") && is_on_cooldown("hardshell") && !character.s["hardshell"] && character.mp > 900 && f0.hp/f0.max_hp < ratehp && !is_on_cooldown("warcry") &&  !character.s["warcry"] )use_skill("warcry"); //support them rieng cho thang de
	
	
if (targetboss.target && targetboss.target == "haiz" && !character.s["hardshell"] && is_on_cooldown("hardshell") && targetboss.range <120 ) 
{
	kite(targetboss,targetboss.range + 50);
	run = 1
}
		else
	{
		run = 0;
	}
	
	
	
if (is_on_cooldown("hardshell") || character.mp < 550)safetank = 0	

	
if ( f0.hp/f0.max_hp < ratehp )	
{	
if ( targetboss.target && targetboss.target == "haiz" && !character.s["hardshell"] && character.mp > 200 && !is_on_cooldown("stomp") && distance(character, targetboss) < (targetboss.range + 7) && is_on_cooldown("hardshell") )skillbua = 1
	
if (character.mp > 900 && is_on_cooldown("hardshell") && !is_on_cooldown("stomp") && !f0.s["hardshell"] && !targetboss.s["stunned"] && distance(f0, targetboss) < (targetboss.range + 20))skillbua = 1
	
if ( character.mp > 1200 && !is_on_cooldown("stomp") && !targetboss.s["stunned"] && !f0.s["hardshell"] && !character.s["hardshell"]  ) skillbua = 1	
}	
	
	
if (run == 1 && supBOSS )	
{
			var target3 = get_nearest_monster({type: supBOSS});
             if(target3 && is_in_range(target3))attack(target3);
}		
	
	

	
///////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////

		if(character.mp > 100 && !is_on_cooldown("charge") && run == 1 && safetank == 0 )use_skill("charge");



if( character.mp > 1400 && !is_on_cooldown("warcry") && taget &&  !character.s["warcry"] )use_skill("warcry");


	///////////
//	!character.s.hasOwnProperty("massproductionpp")


///////////////////
}


function soloTANK(taget)
{
 
			// game_log("test 2 !!!!!!");

		if(character.mp > 100 && !is_on_cooldown("charge") && taget )
            {
				   const dist1 = distance(character, taget);
    if (dist1 >  character.range)
	{
		                use_skill("charge");
		 game_log("toc do kite !!!!!!");
	}

            }	
 //////
	////

		    if (taget.target && taget.mtype == "a2" && taget.target == "haiz" &&  !is_on_cooldown("hardshell") && character.mp > 600 && distance(character, taget) < character.range )
	{

		use_skill("hardshell");
				 game_log("war hardshell !!!!!!");

	}	

      //////////////
	
	if (character.mp > 1300 &&  !is_on_cooldown("warcry") && !character.s["warcry"] )
	{
		use_skill("warcry");
				 game_log("war kite !!!!!!");
	}	
	
	
	 //////////////////////////////////
 	////

 //////

if ( taget.target && taget.target == "haiz" && !character.s["hardshell"] && character.mp > 200 && !is_on_cooldown("stomp") && distance(character, taget) < (taget.range + 7) && is_on_cooldown("hardshell") )skillbua = 1
	
if (character.mp > 900  && !is_on_cooldown("stomp")  && taget.target && taget.target != "haiz"  )skillbua = 1
	
if ( character.mp > 1200 && !is_on_cooldown("stomp") && taget.target ) skillbua = 1	

if ( taget.target && taget.target != "haiz" && !is_on_cooldown("taunt") && !taget.s["stunned"] && character.mp > 400 )use_skill("taunt", taget);

	
}
////////////////////////






let checkluck = 0
setInterval(async () => {
  await shift(0, 'goldbooster')
  for(const id in parent.chests) loot(id)
	
const mobTypes = ["a2" , "a3", "a7","a0","a1","a5","a4","a6","a8","a9","a10"];	
const mobsInRange = Object.values(parent.entities)
    .filter(entity => 
        mobTypes.includes(entity.mtype) &&  // Kiểm tra nếu loại mob là "bat" hoặc "bigbird"
        entity.visible &&                    // Kiểm tra nếu thực thể đang hiển thị
        !entity.dead &&                      // Kiểm tra nếu thực thể chưa chết
        entity.hp < 21000 && entity.target == "haiz" 
    );
if ( mobsInRange.length >= 1)
{
	checkluck = 1
changeitem({ slot: "offhand", name : "mshield", level : 7 });		
}
	else
{
	checkluck = 0
}
	
  await shift(0, 'luckbooster')
}, 1000)


















const targetNames = ["6gunlaZe", "Ynhi","haiz", "nhiY"];


async function attackLoop() {
	//if (character.moving)return
    let delay = null; // Default delay
    try {
        let nearest = null;

        // Find the nearest monster based on the targetNames
        for (let i = 0; i < targetNames.length; i++) {
            nearest = get_nearest_monster_v2({
                target: targetNames[i],
                check_min_hp: true,  // Checking for monster with minimum HP
                max_distance: character.range,  // Consider monsters within 50 units
                statusEffects: ["cursed"], // Check for these debuffs
            });
            if (nearest) break;
        }

	    
        if (!nearest) {
            for (let i = 0; i < targetNames.length; i++) {
                nearest = get_nearest_monster_v2({
                    target: targetNames[i],
                    max_distance: character.range,
                    check_min_hp: true,
                });
                if (nearest) break;
            }
        }


 if (!nearest) {

	      
	const entity1 = get_entity(character.target) // co the doi taget thu cong
	if (entity1) {
		nearest = entity1
	}
	if(!nearest)
	{
		 nearest = get_nearest_monster_solobosskill() 
		if(nearest) {
			change_target(nearest);
		}
	}	

     
  }

        // If a monster is found and is in range, execute the attack
        if (nearest && is_in_range(nearest)) {
            await attack(nearest); // Initiate attack
            delay = ms_to_next_skill("attack"); // Calculate delay for the next attack
        }

	    
    } catch (e) {
        //console.error(e);
    }
	 setTimeout(attackLoop, delay || 250); // Default delay if undefined
}

attackLoop();






function get_nearest_monster_v2(args = {}) {
    let min_d = 999999, target = null;
    let optimal_hp = args.check_max_hp ? 0 : 999999999; // Set initial optimal HP based on whether we're checking for max or min HP

    for (let id in parent.entities) {
        let current = parent.entities[id];
        if (current.type != "monster" || !current.visible || current.dead) continue;
        if (args.type && current.mtype != args.type) continue;
        if (args.min_level !== undefined && current.level < args.min_level) continue;
        if (args.max_level !== undefined && current.level > args.max_level) continue;
        if (args.target && !args.target.includes(current.target)) continue;
        if (args.no_target && current.target && current.target != character.name) continue;

        // Status effects (debuffs/buffs) check
        if (args.statusEffects && !args.statusEffects.every(effect => current.s[effect])) continue;

        // Min/max XP check
        if (args.min_xp !== undefined && current.xp < args.min_xp) continue;
        if (args.max_xp !== undefined && current.xp > args.max_xp) continue;

        // Attack power limit
        if (args.max_att !== undefined && current.attack > args.max_att) continue;

        // Path check
        if (args.path_check && !can_move_to(current)) continue;

        // Distance calculation
        let c_dist = args.point_for_distance_check
            ? Math.hypot(args.point_for_distance_check[0] - current.x, args.point_for_distance_check[1] - current.y)
            : parent.distance(character, current);

        if (args.max_distance !== undefined && c_dist > args.max_distance) continue;

        // Generalized HP check (min or max)
        if (args.check_min_hp || args.check_max_hp) {
            let c_hp = current.hp;
            if ((args.check_min_hp && c_hp < optimal_hp) || (args.check_max_hp && c_hp > optimal_hp)) {
                optimal_hp = c_hp;
                target = current;
            }
            continue;
        }

        // If no specific HP check, choose the closest monster
        if (c_dist < min_d) {
            min_d = c_dist;
            target = current;
        }
    }
    return target;
}




function ms_to_next_skill(skill) {
    const next_skill = parent.next_skill[skill]
    if (next_skill == undefined) return 0
    const ms = parent.next_skill[skill].getTime() - Date.now() - Math.min(...parent.pings) - character.ping;
    return ms < 0 ? 0 : ms;
}



















////////////////////////////////////////////////////////////////////////////////
// Extra range to add to a monster's attack range to give more wiggle room
const rangeBuffer = 5;

// How far away we want to consider monsters
const calcRadius = 300;

// Types of monsters we want to avoid
const avoidTypes = ["a0","a1","a2","a4","a6","a8","a9","a10"];

const avoidPlayers = false; // Set to false to not avoid players at all
const playerBuffer = 0; // Additional range around players
const avoidPlayersWhitelist = []; // Players to avoid differently
const avoidPlayersWhitelistRange = 30; // Set to null to not avoid whitelisted players
const playerRangeOverride = 3; // Overrides how far to avoid, set to null to use player range
const playerAvoidIgnoreClasses = ["merchant"]; // Classes we don't want to avoid

// Tracking when we send movements to avoid flooding the socket
let lastMove;

// Whether we want to draw the various calculations visually
const drawDebug = false;


function avoidance() {
	if (smart.moving)return
    if (drawDebug) {
        clear_drawings();
    }

    // Try to avoid monsters
    const avoiding = avoidMobs();

    if (avoiding) {
movesuper = 1
    }
	else 
    {
movesuper = 0   
    }

}
setInterval(avoidance, 100);

function avoidMobs() {
    let maxWeight = -Infinity;
    let maxWeightAngle = 0;

    const monstersInRadius = getMonstersInRadius();
    const avoidRanges = getAnglesToAvoid(monstersInRadius);
    const inAttackRange = isInAttackRange(monstersInRadius);

    // If we are in attack range or need to avoid monsters, find the safest direction to move
    if (inAttackRange || (!can_move_to(character.real_x, character.real_y))) {
        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 60) {
            let weight = 0;

            const position = pointOnAngle(character, angle, 75);

            if (can_move_to(position.x, position.y)) {
                let rangeWeight = 0;
                let inRange = false;

                for (const id in monstersInRadius) {
                    const entity = monstersInRadius[id];
                    const monsterRange = getRange(entity);
                    const distToMonster = distanceToPoint(position.x, position.y, entity.real_x, entity.real_y);
                    const charDistToMonster = distanceToPoint(character.real_x, character.real_y, entity.real_x, entity.real_y);

                    if (charDistToMonster < monsterRange) {
                        inRange = true;
                        if (distToMonster > charDistToMonster) {
                            rangeWeight += distToMonster - charDistToMonster;
                        }
                    }
                }

                if (inRange) {
                    weight = rangeWeight;
                }

                const intersectsRadius = angleIntersectsMonsters(avoidRanges, angle);
                if (!can_move_to(character.real_x, character.real_y)) {
                    weight -= distanceToPoint(position.x, position.y, character.real_x, character.real_y) / 10;
                }

                if (!intersectsRadius) {
                    if (weight > maxWeight) {
                        maxWeight = weight;
                        maxWeightAngle = angle;
                    }
                }
            }
        }

        const movePoint = pointOnAngle(character, maxWeightAngle, 20);
        if (!lastMove || new Date() - lastMove > 100) {
            lastMove = new Date();
            move(movePoint.x, movePoint.y);
        }

        if (drawDebug) {
            draw_line(character.real_x, character.real_y, movePoint.x, movePoint.y, 2, 0xF20D0D);
        }

        return true;
    }

    return false;
}

function getRange(entity) {
    if (entity.type !== "character") {
        return (parent.G.monsters[entity.mtype]?.range || 100) + rangeBuffer;
    } else {
        if (avoidPlayersWhitelist.includes(entity.id) && avoidPlayersWhitelistRange != null) {
            return avoidPlayersWhitelistRange;
        } else if (playerRangeOverride != null) {
            return playerRangeOverride + playerBuffer;
        } else {
            return (entity.range || 100) + playerBuffer;
        }
    }
}

function isInAttackRange(monstersInRadius) {
    return monstersInRadius.some(monster => {
        const monsterRange = getRange(monster);
        const charDistToMonster = distanceToPoint(character.real_x, character.real_y, monster.real_x, monster.real_y);
        return charDistToMonster < monsterRange;
    });
}

function angleIntersectsMonsters(avoidRanges, angle) {
    return avoidRanges.some(range => isBetween(range[1], range[0], angle));
}

function getAnglesToAvoid(monstersInRadius) {
    const avoidRanges = [];
    for (const id in monstersInRadius) {
        const monster = monstersInRadius[id];
        const monsterRange = getRange(monster);
        const tangents = findTangents({ x: character.real_x, y: character.real_y }, { x: monster.real_x, y: monster.real_y, radius: monsterRange });

        if (!isNaN(tangents[0].x)) {
            const angle1 = angleToPoint(character, tangents[0].x, tangents[0].y);
            const angle2 = angleToPoint(character, tangents[1].x, tangents[1].y);
            avoidRanges.push(angle1 < angle2 ? [angle1, angle2] : [angle2, angle1]);

            if (drawDebug) {
                draw_line(character.real_x, character.real_y, tangents[0].x, tangents[0].y, 1, 0x17F20D);
                draw_line(character.real_x, character.real_y, tangents[1].x, tangents[1].y, 1, 0x17F20D);
            }
        }

        if (drawDebug) {
            draw_circle(monster.real_x, monster.real_y, monsterRange, 1, 0x17F20D);
        }
    }
    return avoidRanges;
}

function getMonstersInRadius() {
    return Object.values(parent.entities).filter(entity => {
        const distanceToEntity = distanceToPoint(entity.real_x, entity.real_y, character.real_x, character.real_y);
        const range = getRange(entity);
        return (entity.type === "monster" && avoidTypes.includes(entity.mtype) && distanceToEntity < calcRadius) ||
            (avoidPlayers && entity.type === "character" && !entity.npc && !playerAvoidIgnoreClasses.includes(entity.ctype) &&
                (!avoidPlayersWhitelist.includes(entity.id) || avoidPlayersWhitelistRange != null) &&
                (distanceToEntity < calcRadius || distanceToEntity < range));
    });
}

function normalizeAngle(angle) {
    return Math.atan2(Math.sin(angle), Math.cos(angle));
}

function isBetween(angle1, angle2, target) {
    if (angle1 <= angle2) {
        return angle2 - angle1 <= Math.PI ? angle1 <= target && target <= angle2 : angle2 <= target || target <= angle1;
    } else {
        return angle1 - angle2 <= Math.PI ? angle2 <= target && target <= angle1 : angle1 <= target || target <= angle2;
    }
}

function findTangents(point, circle) {
    const dx = circle.x - point.x;
    const dy = circle.y - point.y;
    const dd = Math.sqrt(dx * dx + dy * dy);
    const a = Math.asin(circle.radius / dd);
    const b = Math.atan2(dy, dx);

    const ta = { x: circle.x + circle.radius * Math.sin(b - a), y: circle.y - circle.radius * Math.cos(b - a) };
    const tb = { x: circle.x - circle.radius * Math.sin(b + a), y: circle.y + circle.radius * Math.cos(b + a) };

    return [ta, tb];
}

function offsetToPoint(x, y) {
    const angle = angleToPoint(x, y) + Math.PI / 2;
    return angle - characterAngle();
}

function pointOnAngle(entity, angle, distance) {
    return { x: entity.real_x + distance * Math.cos(angle), y: entity.real_y + distance * Math.sin(angle) };
}

function entityAngle(entity) {
    return (entity.angle * Math.PI) / 180;
}

function angleToPoint(entity, x, y) {
    const deltaX = entity.real_x - x;
    const deltaY = entity.real_y - y;
    return Math.atan2(deltaY, deltaX) + Math.PI;
}

function characterAngle() {
    return (character.angle * Math.PI) / 180;
}

function distanceToPoint(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}




























// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
// NOTE: If the tab isn't focused, browsers slow down the game
// NOTE: Use the performance_trick() function as a workaround
