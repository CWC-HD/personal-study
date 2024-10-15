window.onload = function(){
	// Check login status
	function checkLogin(){
	    var name = sessionStorage.getItem("username"),
	        password = sessionStorage.getItem("password"),
	        email = sessionStorage.getItem("email"),
	        cartnum = sessionStorage.getItem("cartnum") || 0,
	        cartlist = sessionStorage.getItem("cartlist") || [];

	    if(name){
	        document.getElementById("loginbox").style.display = "none";
	        document.getElementById("logoutbox").style.display = "inline-block";
	        document.getElementById("showusername").innerHTML = name;
	    }else{
	        document.getElementById("loginbox").style.display = "inline-block";
	        document.getElementById("logoutbox").style.display = "none";
	    }

	    // show cart
	    document.querySelector(".cartnum").innerHTML = cartnum || 0;

	    let constr = "";
	    if(cartlist.length){
	    	let cartlists = JSON.parse(cartlist);
	    	cartlists.forEach((e,v)=>{
	    		constr += '<div class="shopul"><div class="close" onclick="delete_cart(this,' + v + ')"><img src="./image/trash.png" alt=""></div><div class="title">' + e.name + '</div><div class="time">' + e.time + '</div></div>';//[23]
	    	})
	    }else{
	    	constr = "<p>Shopping cart is empty</p>"
	    }

	    document.querySelector("#cartbox .cartcon").innerHTML = constr;
	}

	checkLogin();

	// sign out
	if(document.getElementById("logout")){
		document.getElementById("logout").onclick = function(){
			if(confirm("Are you sure wanna logged out?")){
				sessionStorage.removeItem("username");
				sessionStorage.removeItem("password");
				sessionStorage.removeItem("email");

				document.location.reload();
			}
		}
	}

	// shopping cart display
	document.querySelector("#cartbox .fl").onmouseenter = function(){
		let cart = document.querySelector("#cartbox .cartcon");
		cart.style.display = 'inline-block';
		setTimeout(function(){
			cart.style.opacity = 1;
		},100)
	}
	// Cart hidden status
	document.querySelector("#cartbox").onmouseleave = function(){
		let cart = document.querySelector("#cartbox .cartcon");
		cart.style.opacity = 0;
		cart.style.display = 'none';
	}

	// Add even to shopping cart
	add_cart = function(title){
		let cartnums = sessionStorage.getItem("cartnum") || 0,
		cartlist = sessionStorage.getItem("cartlist") || [];

		let have = 0,cartnum = 0;
		let cartlists = [];
		let nowdate = new Date();
		let year = nowdate.getFullYear(),
			month = nowdate.getMonth() + 1,
			date = nowdate.getDate();

		if(cartlist.length){
			cartlists = JSON.parse(cartlist);
			cartlists.forEach((e,v)=>{
				if(e.name == title){
					cartlists[v].time = year + '-' + month + '-' + date
					have = 1;
				}
				cartnum = parseInt(cartnum) + 1;
			})
		}

		if(!have){
			cartlists.unshift({
				name: title,
				time: year + '-' + month + '-' + date
			})

			cartnum = parseInt(cartnum) + 1;
		}

		sessionStorage.setItem("cartnum",cartnum);
		sessionStorage.setItem("cartlist",JSON.stringify(cartlists));

		alert("Added");
		document.location.reload();
	}

	// Remove items from shopping cart
	delete_cart = function(obj,index){
		let cartnums = sessionStorage.getItem("cartnum") || 0,
		cartlist = sessionStorage.getItem("cartlist") || [];

		let cartlists = [];
		let cartnum = 0;
		if(cartlist.length){
			cartlists = JSON.parse(cartlist);
			cartlists.splice(index,1)
			cartlists.forEach((e,v)=>{
				if(e.name == title){
					cartlists[v].time = year + '-' + month + '-' + date
					have = 1;
				}
				cartnum = parseInt(cartnum) + 1;
			})
		}

		sessionStorage.setItem("cartnum",cartnum);
		sessionStorage.setItem("cartlist",JSON.stringify(cartlists));

		alert("Deleted");
		document.location.reload();
	}
}


 var flipAndInvertImage = function(image) {
	image.forEach(item=>{
	  item =item.reverse()
	  item.forEach((item1,i,arr)=>{
		arr[i] = item1 ^1
	  })
  })
  return image
  };
  
// Home page expand list
let showhidelist = document.querySelectorAll(".showhide");
showhidelist.forEach(obj => {
	obj.addEventListener("click", function(e) {
		let item = obj.parentNode.querySelector(".hidebox");
		let hideitem = obj.parentNode.querySelector(".hidehide");
		let height = item.style.height;
		obj.style.display = "none";
		hideitem.style.display = "block";
		if(height == 0 || !height || height == '0' || height == '0px'){
			item.style.height = "150px";
		}
	});
})

// Home page shrink list
let hidelist = document.querySelectorAll(".hidehide");
hidelist.forEach(obj => {
	obj.addEventListener("click", function(e) {
		let item = obj.parentNode.querySelector(".hidebox");
		let showitem = obj.parentNode.querySelector(".showhide");
		let height = item.style.height;
		obj.style.display = "none";
		showitem.style.display = "block";
		if(height && height != 0){
			item.style.height = "0";
		}
	});
})

//User operation prompt on the login page, the information cannot be empty//
if(document.getElementsByClassName("logins").length){
    document.getElementsByClassName("logins")[0].onclick = function(){
        let name = document.getElementById("name");
        let password = document.getElementById("password");

        if(!name.value){
            alert("Please enter your name");
            name.focus();
            return;
        }


        if(!password.value){
            alert("Please enter your password");
            password.focus();
            return;
        }

        sessionStorage.setItem("username", name.value);
        sessionStorage.setItem("password", password.value);

        alert("Login successful");
        document.location.href = './index.html';
    }
}
//User operation prompt on the registration page, the information cannot be empty/
if(document.getElementById("registerbtn")){
    document.getElementById("registerbtn").onclick = function(){
        let name = document.getElementById("name");
        let password = document.getElementById("password");
        let email = document.getElementById("email");

        if(!name.value){
            alert("Please enter your name");
            name.focus();
            return;
        }


        if(!password.value){
            alert("Please enter your password");
            password.focus();
            return;
        }


        if(!email.value){
            alert("Enter your Email address");
            email.focus();
            return;
        }
        //Store user information
        sessionStorage.setItem("username", name.value);
        sessionStorage.setItem("password", password.value);
        sessionStorage.setItem("email", password.email);

        alert("Registration success");
        document.location.href = './index.html';
    }
}
