

$(document).ready(function(){
	
	let sessCk = $('.emp_num').val();
	if(sessCk != null) {
		sessionCheck();
	}
    $('#id').keydown(function (key) {
        if (key.keyCode == 13) {
        	$('.btn-login').click();
        }
    });
    
    $('#pw').keydown(function (key) {
        if (key.keyCode == 13) {
        	$('.btn-login').click();
        }
    });

	$('.btn-login').click(function(){
		
		let id = $('input[name=employee_number]').val();
		let pw = $('input[name=password]').val();
		
		if(id == null || id ==""){
			alert('아이디를 입력해주세요.');
			return false;
		}
		if(pw == null || pw ==""){
			alert('비밀번호를 입력해주세요.');
			return false;
		}
		
		login();
		
	});
	
	

});

function login(){
	let data = $('#login_form').serialize();
	
	$.ajax({
		url : '/login.do',
		type : 'POST',
		data : data,
		success : function(result){

			if(result.beforeLogout == true) {
				alert("중복 로그인 중입니다. 본인이 아닐 시 관리자에게 문의해주세요.");
			
				location.href = result.location;
				return false;
			}
			
			let data = result.data;
			if(data == true){
				location.href = result.location;
			}else {
				alert(data);
				location.href="/";
			}
		},
		error : function(){
			alert('오류가 발생하였습니다. 관리자에게 문의해주세요.');
		},
		beforeSend : function(){
			$('.text').text('로그인 중입니다.');
			$('#loading_page').show();
		}
		
	});
}


function sessionCheck(){
	$.ajax({
		url : '/sessionCheck.do',
		type : 'GET',
		success : function(result){
			
			let data = result.location;
			if(data != null){
				location.href = data;
			}else {
				$('#loading_page').hide();
			}
			
		},
		error : function(){
			console.log("페이지 이동 오류");
		},
		beforeSend : function(){
			$('.text').text('로딩중');
			$('#loading_page').show();
		}
	});
}