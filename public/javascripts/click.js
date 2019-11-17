window.onload = function(){
	var background = document.getElementById('background');
	var info = document.getElementById('information');
	var modal = document.getElementById('myModal');
	var save = document.getElementById('save');
	var span = document.getElementsByClassName("close")[0];

	var email = document.getElementById('email_change');
	var phone = document.getElementById('phone_change');

	var value = '';

	window.onclick = function(event){
		if (event.target == modal){
			modal.style.display = "none";
		}
	}

	function start_modal(){
		info.textContent = value;
		background.style.display = "block";
		modal.style.display = "block";
	}

	function sendPost(url,params){
		var form = document.createElement('form');
		form.setAttribute('method','post');
		form.setAttribute('action',url);
		for(var val in params){
			var field = document.createElement('input');
			field.setAttribute('type','hidden');
			field.setAttribute('name',val);
			field.setAttribute('value',params[val]);
			form.appendChild(field);
		}
		document.body.appendChild(form);
		form.submit();
	}

	email.addEventListener('click',function(){
		value = "이메일";
		start_modal();
	});

	phone.addEventListener('click',function(){
		value = "연락처";
		start_modal();
	});

	span.onclick = function(){
		background.style.display = "none";
		modal.style.display = "none";
	}

	save.addEventListener('click',function(){
		var text = document.getElementById('info_input').value;
		var params = ['',text];
		alert(text);
		if( value == "이메일"){
			params[0] = "이메일";
		}else if ( value == "연락처"){
			params[0] = "연락처";
		}
		sendPost('/',params);
	});
}
