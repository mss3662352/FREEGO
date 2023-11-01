$(document).ready(function(){
	
	$('#btn-password-change').click(function(){
		passChange();
	});
	
	$('.pw-change').click(function(){
		$('#pwModal').show();
	});
	
	$('#btn-password-change-cancel').click(function(){
		$('#pwModal').hide();
		$('#password_form').find('input').val('');
	});	
	
	sampleImageSnb(); // rtw
	
    var profileImgData1 = $('#sidepro').val();
    
    if(profileImgData1 != null && profileImgData1 != ""){
    	var callPath = location.protocol + '//' + location.host + profileImgData1;
		var img = $('<img id="callProfile1" src="'+ callPath +'"onerror="this.src=\'/resources/img/common/error-img-sample.png\'">');

		$('.ps_profile_sample_image').remove(); // rtw
		$('#side_profile').append(img);
    }
    console.log(profileImgData1);
    
  
    // 프리랜스 통합검색 엔터 또는 검색 아이콘 클릭 시 임직원 검색 페이지로 이동하는 코드
	$('#searchButton').click(function() {
        var keyword = $('#searchInput').val();
        console.log('검색어:', keyword);
        localStorage.setItem('keyword', keyword);
        // 검색어를 사용하여 검색/조회 페이지로 이동
        window.location.href = '/FREEGO/free/list';
    });

	$('#searchInput').on('keyup', function(event) {
	    if (event.keyCode === 13) {    	
	        var keyword = $('#searchInput').val();
	        localStorage.setItem('keyword', keyword);
	        window.location.href = '/FREEGO/free/list';
	    }
	});
	SNBClickListener();
});


function passChange(){
        		
	var data = $('#password_form').serialize();
	var pw = $('#password').val();
	var pwch = $('#passwordCh').val();
	var pwchFocus = $('#passwordCh');
	var pwchck = $('#passwordChCk').val();
	console.log(data);
	
	if(pw == null || pw == ""){
		alert("현재 비밀번호를 입력해주세요.");
		return false;
	}else if (pwch == null || pwch == ""){
		alert("변경하실 비밀번호를 입력해주세요.");
		return false;
	}else if (pwchck == null || pwchck == ""){		
		alert("비밀번호 확인을 입력해주세요.");
		return false;
	}
	
	if(pwch.length < 8){
		alert("비밀번호는 최소 입력 8자리를 이상입니다.");
		return false;
	}else if(pwchck.length > 15){
		alert("비밀번호는 최대 입력 15자리 미만입니다.");
		return false;
	}
	const alphabetPattern = /[a-zA-Z]/;
	const specialCharacterPattern = /[!@#\$%\^&\*\(\)_\+\-\.,;:]/;
    // 비밀번호 정규식 검사
    if (!alphabetPattern.test(pwch)) { // 영어 대소문자
        alert("비밀번호에 영어 대문자 또는 소문자를 포함해주세요.");
        pwchFocus.focus();
        return false;
    } else if (!specialCharacterPattern.test(pwch)) { // 특수 기호 문자
        alert("비밀번호에 특수문자를 포함해주세요.");
        pwchFocus.focus();
        return false;
    }
	$.ajax({
		url : '/FREEGO/password.do',
		type : 'POST',
		data : data,
		success : function(result){
			
			console.log(result);
			var massage = result.data;
			
			if(massage == true){
				alert("비밀번호 변경이 완료되었습니다.");
				$('#pwModal').hide();
				$('#password_form')[0].reset();
			}else if(massage == false){
				alert("현재 비밀번호가 일치하지않습니다.");
				$('#password_form')[0].reset();
			}else if(massage == 'fail'){
				alert("변경 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
			}

		},
		error : function(){
			alert('오류가 발생하였습니다. 관리자에게 문의해주세요.');
		}
	});    		

        		
}

function sessionEndCheck(){
	
	$.ajax({
		
		url : '/FREEGO/emp/sessionEndCheck',
		type : 'post',
		success : function(result){
			
			alert("로그아웃되었습니다.");
			location.href = "/";
		},
		error : function(error){
			console.log("세션만료 오류 : " + error)
		}
		
	});
}

/* 프사 기본 사진 _rtw */
function sampleImageSnb() {
	var sampleImgSbs = $('<img class="ps_profile_sample_image" src="/resources/img/common/sample-img.png">');
	$('.side_prof_img').append(sampleImgSbs);
}

// SNB 클릭 리스너 적용
function SNBClickListener() {
	$('.lnb-menu2 .lnb-dep1.SP001, .lnb-menu2 .lnb-dep1.SP002, .lnb-menu2 .lnb-dep1.SP003, .lnb-menu2 .lnb-dep1.SP004, .lnb-menu2 .lnb-dep1.SP005, .lnb-menu2 .lnb-dep1.SYSAD').click(function(e) {
		console.log($(this).attr('class'));
		console.log($('#expandable-menu .' + $(this).attr('class').replace(' ', '.')).get(0));
		expandContract();
		e.stopPropagation();
		var $this = $('#expandable-menu .' + $(this).attr('class').replace(' ', '.')), $depthTarget = $this
				.next(), $siblings = $this.parent()
				.siblings();

		$this.parent('li').find('ul li').removeClass(
				'on');
		$siblings.removeClass('on');
		$siblings.find('ul').slideUp(250);

		if ($depthTarget.css('display') == 'none') {
			$this.parent().addClass('on');
			$depthTarget.slideDown(300);
		}
	});
}