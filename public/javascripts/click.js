window.onload = function(){
	//관련 element를 id를 이용하여 불러온다.
	var background = document.getElementById('background');
	var info = document.getElementById('information');
	var modal = document.getElementById('myModal');
	var save = document.getElementById('save');
	var span = document.getElementsByClassName("close")[0];

	var email = document.getElementById('email_change');
	var phone = document.getElementById('phone_change');

	//어떤것을 수정할지 저장할 변수
	var value = '';

	//post로 변경할 정보를 전달
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

	//email 양식 검사
	function checkEmail(val){
		var len = val.length;
		var ret =0;
		for(var i =0 ; i < len ; i++){
			ret++;
			if(val[i] == '@'){
				return true;
			}
		}
		return false;
	}

	//연락처 양식 검사
	function checkPhone(val){
		var len = val.length;
		if(len != 13 || val[3] != '-' || val[8] != '-'){
			return false;
		}
		return true;
	}

	//페이지 시작시 modal이 보이지 않도록 해 준다.
	window.onclick = function(event){
		if (event.target == modal){
			modal.style.display = "none";
		}
	}

	//modal pop_up 창을 보일 수 있도록 해 준다.
	function start_modal(){
		info.textContent = value;
		background.style.display = "block";
		modal.style.display = "block";
	}

	//email 수정 버튼을 눌렀을 경우
	email.addEventListener('click',function(){
		value = "이메일";
		start_modal();
	});

	//연락처 수정 버튼을 눌렀을 경우
	phone.addEventListener('click',function(){
		value = "연락처";
		start_modal();
	});

	//modal창 종료 버튼을 누를 경우
	span.onclick = function(){
		background.style.display = "none";
		modal.style.display = "none";
		document.getElementById('info_input').value = '';
	}

	//modal창에 있는 저장하기 버튼을 눌렀을 경우
	save.addEventListener('click',function(){
		var text = document.getElementById('info_input').value;
		var params = [value,text];
		if( value == "이메일"){
			if(!checkEmail(text)){
				alert('이메일 양식을 지켜주십시오');
				return false;
			}
		}else if ( value == "연락처"){
			if(!checkPhone(text)){
				alert('연락처 양식을 지켜주십시오');
				return false;
			}
		}
		sendPost('/',params);
	});
}
