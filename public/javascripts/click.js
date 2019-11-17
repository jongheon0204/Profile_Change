window.onload = function(){
	var background = document.getElementById('background');
	var modal = document.getElementById('myModal');
	var span = document.getElementsByClassName("close")[0];
	var btn = document.getElementById("modal_open");

	var name = document.getElementById('name_change');
	var email = document.getElementById('email_change');
	var phone = document.getElementById('phone_change');

	btn.onclick = function(){
		background.style.display = "block";
		modal.style.display = "block";
	}

	span.onclick = function(){
		background.style.display = "none";
		modal.style.display = "none";
	}

	window.onclick = function(event){
		if (event.target == modal){
			modal.style.display = "none";
		}
	}

	name.addEventListener('click',function(){
	});


	email.addEventListener('click',function(){
		alert('email');
	});

	phone.addEventListener('click',function(){
		alert('phone');
	});
}
