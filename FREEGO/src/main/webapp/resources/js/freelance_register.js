/* global variable */
let insertSkills = []; // 스킬들어갈 빈 array
let today = new Date(); // 오늘 날짜
/* gv end */

/* 신규등록  */
$(document).ready(function(){ // 모달창이 열리면 활성    
	autoPhoneNumberFormat('#telephone'); // 전화번호 id 속성에 정규표현식 적용
//	autoNumPosit('#price'); // 채용단가 id 속성에 정규표현식 적용
	
    // 입력 정규식 활성
    $(document).on('click','#insertButton', function(){ //  insert 버튼 클릭 시
        if (!passCondition()) { // if 문 정규식 조건
            return; // passCondition 함수가 false를 반환하면 작동 중단
        }
        console.log('#insertButton')
        insertFreelance(); // 위 정규식을 반환이 true면 함수작동
        $('#fnModal').hide(); // 신규등록 모달을 숨김
        $('#freelanceRegist').reset(); // 신규등록 모달의 폼을 리셋함
        
    });
    
    // 업로드 선택창
    $('#fn_image_sel').click(function(){ // 사진 첨부 클릭 시 
		$('#fn_Upload_Image').click(); // 이미지 업로드(fn_Upload_Image)id 클릭
	});
    $('#fn_Upload_Image').on("change", img_exa); // 이미지 업로드와 증명사진 업로드 함수와 묶음
    
    modalfn(); // 모달 제어함수 실행
    
    $('#exse-search').off('click');
    
    $('.exse-search').click(function() {
//    	insertSkills = [];// jsp 파일의 exse-search id 속성이 클릭 시 발동
		$('#insertExprtModal').show(); // 전문분야 모달창 보여줌
		freeInsertSkill(); // 프리랜서 전문분야 함수 작동
	});
    
//    $('#btn-add-row').click(function() {// 행 추가 버튼 클릭 트리거
//    	rowAdd_btn();
//    });
    
    /* 생년월일 컷 */
    /* YYYY-MM-DD 형식으로 날짜를 포맷 */ 
    var year = today.getFullYear();
    var month = (today.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 두 자리로 포맷
    var day = today.getDate().toString().padStart(2, '0'); // 날짜를 두 자리로 포맷
    var formattedDate = year + '-' + month + '-' + day;

	/* HTML 요소를 찾고 max 속성 설정 */
	var dateInput = $('.birthday');
	dateInput.attr('max', formattedDate);
    
    /* 경력 1행 공백 시 행 추가 불가 */
    $('#btn-add-row').click(function() {
        var passedC = true;

        $('.addedRow').each(function() {
            var funcSelTitle = $(this).find('.title').val();
            var funcSelStd = $(this).find('.std').val();
            var funcSelEnd = $(this).find('.end').val();

            if (!funcSelTitle && !funcSelStd && !funcSelEnd) {
                passedC = false;
                alert("이미 공백 행이 있습니다 기입 후 추가할 수 있습니다");
                return false; // 중단하기 위해 false 반환
            }
        });

        if (passedC) {
            rowAdd_btn();
        }
    });

});


/* 프리랜서 모달 제어 */
function modalfn() {
    $('.btn-modal-open').click(function () { // 프리랜서 리스트,현황 페이지의 프리랜서 신규등록 버튼 클릭 시
    	$('form').each(function(){// x 클릭 시 입력내용 초기화 반복
        	this.reset(); // each 반복에서 form 요소를 리셋합니다
        	$('#image_Ex').remove(); // 올라간 증명사진 미리보기 제거
        	$("#adr tr.addedRow").remove(); // adr id를 가진 필드의 addedRow class 속성을 가진 tr 태그에 적용되는 제거 (아래 경력행 추가)
        	insertSkills = [];
            $('input[type="checkbox"]').prop('checked', false);
            $('input[type="radio"]').prop('checked', false);
            $('#insert_skill_list').empty();
        	count = 2; // 경력행 추가 시 증가하는 수 취소를 클릭하면 2로 초기화
        })
        getTaskHTML()
        .then(function (taskHTML) {
            $('#task').html(taskHTML);
            $('#fnModal').show();
        })
        .catch(function (error) {
            console.log(error);
        });
    	sample_img(); // 초기 프로필 이미지 활성

    return false;
    });
    $('.btn-close').click(function () { // 팝업 모달 상단부 x 클릭시 발동될 트리거
        $('#fnModal').hide(); // 모달창을 숨김
        $('form').each(function(){// x 클릭 시 입력내용 초기화 반복
        	this.reset(); // each 반복에서 form 요소를 리셋합니다
        	$('#image_Ex').remove(); // 올라간 증명사진 미리보기 제거
        	$("#adr tr.addedRow").remove(); // adr id를 가진 필드의 addedRow class 속성을 가진 tr 태그에 적용되는 제거 (아래 경력행 추가)
            $('input[type="checkbox"]').prop('checked', false);
            $('input[type="radio"]').prop('checked', false);
        	$('#insert_skill_list').empty();
        	count = 2; // 경력행 추가 시 증가하는 수 취소를 클릭하면 2로 초기화
        	$('.image_Ex').remove(); // 초기 샘플 이미지 제거
        })
        return false;
    });
    $('.btn-popup-cancel').click(function () { // 팝업 모달 하단부 취소 버튼 클릭 시 발동될 트리거
        $('#fnModal').hide(); // 모달창 숨김
        $('form').each(function(){// cancel 시 입력내용 초기화 반복
        	this.reset(); // each 반복에서 form 요소를 리셋합니다.
        	$('#image_Ex').remove(); // 증명사진 미리보기 제거
        	$("#adr tr.addedRow").remove(); // adr id를 가진 필드의 addedRow class 속성을 가진 tr 태그에 적용되는 제거 (아래 경력행 추가)
            $('input[type="checkbox"]').prop('checked', false);
            $('input[type="radio"]').prop('checked', false);
        	$('#insert_skill_list').empty();
        	count = 2; // 경력행 추가 시 증가하는 수 취소를 클릭하면 2로 초기화
        	$('.image_Ex').remove(); // 초기 샘플 이미지 제거
        })
        return false;
    });
    
}

var index = 0;
function rowAdd_btn(){
	
	$.ajax({
		type: "GET",
		url: "/FREEGO/free/getTask.do",
		dataType: "json",
		success: function(data) {
			var html ="";

			var rowCount = $("#adr tr").length + 1; // adr id를 가진 tr 태그들의 수를 구하고 +1
			let taskVal = ""
				
			for(let i =0; i<data.commonList.length; i++){
				taskVal += `<option value="${data.commonList[i].code}">${data.commonList[i].name}</option>`;
			}
			html +='<tr class="addedRow">';
			html +='<td>'+rowCount+'</td>';
			html +='<td><input type="text" id="title" maxlength="30" class="title"></td>';
			html +='<td><input type="date" id="start_date" class="std"></td>';
			html +='<td><input type="date" id="end_date" class="end"></td>';
			html +='<td><input type="text" id="client" maxlength="28"></td>';
			html +='<td><select id="task">';
			html +='<option value="">선택</option>';
			html +=`${taskVal}`
			html +='</select></td>'
			html +='<td><input type="text" id="comment" maxlength="100"></td>';
			html +='<td><a type="button" class="btn_delete xo"> x</a></td>';
			html +='</tr>';
			
			
			index++
			$('#adr').append(html);	 

		},
		error: function(data){
		}
	});
	
}

/* 기본 프로필 */
function sample_img() {
	var samImg = $('<img class="image_Ex" src="/resources/img/common/sample-img.png">');
	$('.sample-bg').append(samImg);
}


/* 수행내역 행 추가 */
//function add_row(){
//   
//    var addedTr = ''; // 행 추가 시 추가될 구성 태그들을 담기위해 빈 변수 초기화
//
//    var rowCount = $("#adr tr").length + 1; // adr id를 가진 tr 태그들의 수를 구하고 +1
//
//    // 위 선언한 addedTr 변수에 담길 문자열 태그 내용
//    addedTr += '<tr id="ex" class="addedRow">';
//    addedTr += '<td>'+ rowCount +'</td>';
//    addedTr += '<td>';
//    addedTr += '<input type="text" id="title" maxlength="30" class="title">';
//    addedTr += '</td>';
//    addedTr += '<td>';
//    addedTr += '<input type="date" id="start_date" class="std">';
//    addedTr += '</td>';
//    addedTr += '<td>';
//    addedTr += '<input type="date" id="end_date" class="end">';
//    addedTr += '</td>';
//    addedTr += '<td>';
//    addedTr += '<input type="text" id="client" maxlength="28">';
//    addedTr += '</td>';
//    addedTr += '<td>';
//    addedTr += '<input type="text" id="task" maxlength="20">';
//    addedTr += '</td>';
//    addedTr += '<td>';
//    addedTr += '<input type="text" id="comment" maxlength="100">';
//    addedTr += '</td>';
//    addedTr += '<td>';
//    addedTr += '<a type="button" class="btn_delete xo"> x</a>';
//    addedTr += '</td>';
//    addedTr += '</tr>';
//
//    $("#adr").append(addedTr); // adr id를 가진 addedTr 변수에 해당내용을 추가
//}

// 프로젝트 수행경력 행 제거
$(document).on("click",".btn_delete", function() { // 행 제거 버튼을 클릭 트리거에 바인딩
      $(this).closest("tr").remove(); // 가장 가까운 상위 tr태그 엘리먼트 제거함
      updateRowNumbers(); // 행을 제거한 후 순번을 업데이트
});

// 행을 추가한 후 순번을 업데이트하는 함수
function updateRowNumbers() {
  $("#adr tr").each(function (index) { // adr id속성을 가진 tr 태그들에 대해 반복
    $(this).find("td:first").text(index + 1); // 각 행의 첫 번째 td 순번 열의 내용 최신화
  });
}


/* 전화번호 형식 실시간 적용 */
function autoPhoneNumberFormat(inputId) {
    $(inputId).on("propertychange change keyup paste input", function () {
        var phone = $(inputId).val();

        var tel1 = phone
            .replace(/[^0-9]/g, '') // 정규표현식 숫자와 - 을 제외한 입력을 무시
            .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`); // 전화번호 형식 적용 정규표현식

        $(inputId).val(tel1);
    });
}


/* 금액 comma */
//function autoNumPosit(inputNumb) {
//    $(inputNumb).on("input", function () {
//        var numPosit = $(inputNumb).val();
//
//        var inpS = numPosit.replace(/[^0-9]/g, '') .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"); // comma 자동 생성
//
//        $(inputNumb).val(inpS);
//    });
//}

/* 정규표현식 , 조건 */
function passCondition() { // 클래스 속성 사용할 것
	var nameVal = $('.name').val(); // name이라는 클래스 속성에 든 값을 nameVal에 초기화
	var telephoneVal = $('.telephone').val();
	var birthdayVal = $('.birthday').val();
	var emailVal = $('.email').val();
	var priceVal = $('.price').val();
	var locVal = $('.location').val();
	
		
	var krPattern = /^[가-힣]*$/; // 한글 가 ~ 힣 정규식
	var NamePattern = /^(?:[가-힣]{2,5}|[a-zA-Z]{3,20})$/; // 한글 가~힣 2~5 자, 영문 A~z 3~10자 정규식
	var numPattern = /^[0-9]*$/; // 숫자 0~9
	var phoneTelPattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/; // 전화번호 000-0000-0000 or 00-000-0000 형식 정규식
	var emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/; // 이메일 정규식 아래 참고
	
	
	/* 이름~ */
	if(!nameVal) { // nameVal 변수에 든 값이 없다면
		alert("이름을 입력하세요"); // 경고창
		$('#name').focus();
		return false; // 거짓을 반환
	} else if(!NamePattern.test(nameVal)){
		alert("완성형 한글 2~5자, 영문 3~20자로 입력하세요");
		$('#name').focus();
		return false;
	}
	
	/* 전화번호~ */
	if(!telephoneVal) {
		alert("전화번호를 입력하세요");
		$('#telephone').focus();
		return false;
	} else if(telephoneVal.length > 13) {
		alert("전화번호가 너무 깁니다.");
		$('#telephone').focus();
		return false;
	} else if(!phoneTelPattern.test(telephoneVal)) {
		alert("전화번호의 형식을 맞춰주세요 ( - 하이폰 포함)")
		$('#telephone').focus();
		return false;
	}
	
	/* 생년월일 유효성 검사 */
	var birthdayDate = new Date(birthdayVal);
	
	if (!birthdayVal) {
	    alert("생년월일을 입력하세요");
	    $('#birthday').focus();
	    return false;
	}else if(birthdayDate > today) {
		alert("생년월일을 다시 확인하세요");
		$('#birthday').focus();
		return false;
	}
	
	/* 이메일~ (xxxx @ xxxx . xxx 형식) */
	if (!emailVal) {
	    alert("이메일 주소를 입력하세요");
	    $('#email').focus();
	    return false;
	} else if(emailVal.length < 9) {
		alert("이메일이 너무 짧습니다");
		$('#email').focus();
		return false;
	} else if(!emailPattern.test(emailVal)) {
		alert("유효하지 않은 이메일 주소입니다.");
		$('#email').focus();
		return false;
	}
	
	/* 채용단가~ */
	if(!priceVal) {
		alert("채용단가를 기입하세요");
		$('#price').focus();
		return false;
	} else if(!numPattern.test(priceVal)) {
		alert("채용단가를 다시 확인하세요");
		$('#price').focus();
		return false;
	}
	
	/* 전문분야~ */
	if(insertSkills.length < 1) {
		alert("스킬을 최소 한 개 이상 선택하세요")
		$('.skill8').focus();
		return false;
	}
	
	/* 근무가능 지역~ */
	if(!locVal) {
		alert("근무가능지역을 입력하세요");
		$('#location').focus();
		return false;
	} else if(locVal.length > 9) {
		alert("근무가능지역이 너무 깁니다");
		$('#location').focus();
		return false;
	}
	
	/* 프리랜서 커리어 입력기준 */
	// 미기재 시 true, 누락항목에 프로젝트이름, 참여기간이 누락된 경우 false, 수행프로젝트와 참여기간이 누락되지 않았을 때 true
	var allValid = true;
    $('.addedRow').each(function(index, object) {
        var cTilVal = $(this).find('.title').val();
        var cStdVal = $(this).find('.std').val();
        var cEndVal = $(this).find('.end').val();
        
        console.log('addedRow', cTilVal, cStdVal, cEndVal);
        
		if (!cTilVal && !cStdVal && !cEndVal) {
		} else if (!cTilVal) {
			allValid = false;
			alert("프로젝트 수행 경력의 " + (index + 1) + "번 행의 '프로젝트 명'을 입력해주세요");
			$(this).find('.title').focus(); //해당 행에 focus줌
			return false;
		} else if (!cStdVal) {
			allValid = false;
			alert("프로젝트 수행 경력의 " + (index + 1) + "번 행의 '시작일'을 입력해주세요");
			$(this).find('.std').focus();
			return false;
		} else if (!cEndVal) {
			allValid = false;
			alert("프로젝트 수행 경력의 " + (index + 1) + "번 행의 '종료일'을 입력해주세요");
			$(this).find('.end').focus();
			return false;
		}
		
		/* 경력 시작~종료일 */
		var cStdValDate = new Date(cStdVal);
		var cEndValDate = new Date(cEndVal);
		if(cStdValDate > cEndValDate){
			allValid = false;
	        alert("시작기간과 종료기간을 다시 확인하세요");
	        $(this).find('.std').focus();
	        return false;
	    }
		
		/* 생일, 참여기간 비교 */
		if(cStdValDate < birthdayDate) {
			allValid = false;
			alert("프로젝트 참여기간이 생년월일보다 빠릅니다");
			$(this).find('.std').focus();
			return false;
		}
		
    });
    
    return allValid;
	
}



/* ajax 요청 (FL 신규등록) */
function insertFreelance() {
//	console.log("insertFreelance");
	var name = $("#name").val(); // name id속성에 입력받은 값을 name 변수에 초기화
	var telephone = $("#telephone").val();
	var birthday = $("#birthday").val();
	var gender = $("#gender").val();
	var email = $("#email").val();
	var location = $("#location").val();
	var price = $("#price").val();
	var project = $("#project").val();
	
	var insertData = { // insertData 변수에 배열 생성
			name: name,
			telephone: telephone,
			birthday: birthday,
			gender: gender,
			email: email,
			location: location,
			price: price,
			project: project
	};
	
//	console.log("인적사항",insertData);
	
/* form json 변환 */
	$.ajax({ // ajax 요청
		type: "POST", // post 타입
		url: "/FREEGO/free/regist.do", // http 요청을 보낼 url
		data: JSON.stringify(insertData), // 객체를 json으로 변환
		contentType: "application/json;charset=UTF-8", // 인코딩
		dataType: "json", // json으로 변환
		success: function(response) {
			// response는 insert한 freelance의 id값임.
			console.log(response);
			insertImage(response); // freelance의 id 값을 formdata에 담아서 이미지 추가
			insertFreelanceCareer(response); // freelance의 id를 커리어 배열에 담음
			insertSkillList(insertSkills, response) // id를 스킬리스트 배열에 담음
			alert("등록 완료");
			getList(currentPage, option, keyword); // 페이지 리로드
		},
        error: function(error) { // 에러를 반환
        	console.log(error);
        }
	});
}



/* 증명사진 미리보기 */
function img_exa(e) {
	
//	console.log('img_exa');
	
//	console.log($('#image_Ex'));
//	console.log($('#callProfile'));
	
	$('.image_Ex').remove(); // 초기 샘플 이미지 제거
	$('#image_Ex').remove(); // 받은 미리보기 이미지 제거
//	console.log($('#image_Ex'));
	$('#callProfile').remove(); // 
//	console.log($('#callProfile'));
	var files = e.target.files; // files 변수에 이벤트 헨들러 파일 가져옴
//	console.log(files);

	$(files).each(function() { // 파일 업로드를 지속할 수 있게 반복
//		console.log(this);
		
		// 이미지 확장자 확인
		if(!this.type.match('image.*')) { // 받은 파일이 이미지 확장자가 아니면
			alert('이미지 파일이 아닙니다. 이미지 파일을 업로드 하십시오.'); // 알림창 표시
			return;
		}
		
		
		var reader = new FileReader(); // 파일리더 객체를 변수로 초기화
		reader.onload = function(e) { // 
//			console.log(e);
			let img = $('<img id="image_Ex" >'); // img 변수에 img 태그와 id속성으로 image_Ex를 초기화
//			console.log(img);
			img.attr("src", e.target.result); // img 변수에 src와 이벤트 핸들러로 받은 파일을 묶음
//			console.log(img);
			
//			console.log($('#fn_Image').html());
			$('#fn_Image').append(img); // 위 img 태그에서 받은 이미지 파일을 fn_Image id를 가진 태그에 추가
//			console.log($('#fn_Image').html());
		}
		var result = reader.readAsDataURL(this); // reader 변수의 FileReader의 readAsDataURL을 사용해서 파일의 URL을 읽어 들임
//		console.log(result);
		
	});
}

/* 프래린서 등록 증명사진 업로드  */
function insertImage(id) {
	// 이미지를 가져와서 사용자가 업로드하고자 하는 이미지가 있는지 확인합니다.
	var formData = new FormData(); // 폼데이터 변수 초기화
	var uploadImage = $('input[name="sendImage" ]')[0].files[0]; // jquery를 사용해 input jsp에 name 태그에 sendImage를 사용하는 태그에서 받은 파일 수를 확인
    
//		id와 upload_Image의 값을 확인합니다.
//    console.log('id를 먹었나: ' + id);
//    console.log('upload_Image 파일을 먹었나: ' + uploadImage);
	
	// 서버로 보낼 formData를 생성합니다.
	formData.append('id', id); // formData에 id를 추가합니다.
    formData.append('upload_Image', uploadImage); // formData에 사용자가 업로드하고자 하는 파일을 추가합니다.

//    console.log('폼 데이터 id N 파일 : ' + formData);
	
	if(uploadImage !=null) { // uploadImage 변수가 null이 아니라면 아래 ajax 요청
		// ajax를 이용하여 서버에 form을 보냅니다.
		$.ajax({
			type: "POST", // post 방식
			url: "/FREEGO/free/regist_image.do", // http 요청할 url
			data: formData, // 추가된 데이터를 포함한 변수
			processData: false,
			contentType: false,
			success: function(response) { // 성공시 반환
				console.log("response: " + response); // 결과를 콘솔에 출력합니다.
			},
	        error: function(result) {
	        	console.log("- 안됨: " + result);
	        }
		});
	}

}



/* 프리랜서 경력 json */
function insertFreelanceCareer(id) { // 매개변수로 id값을 받음 위 response 참고
	// 여기서 경력 값들고 오기
//	console.log("insertFreelance: id: " + id);
	
	// 경력 데이터 배열을 초기화
	var careerArray = [];
	
	// tbody에 있는 값을 입력받는 행(tr) 가져옴
	var careerRows = $('#adr tr');
	
	// careerRows에 있는 모든 tr요소를 object로 사용하며 반복 
	careerRows.each(function(index, object) {
		// console.log(careerRows);
		// find는 jquery에서 선택한 요소 내부에서 다시 요소를 찾는 함수
		console.log($(object).find('#title').val());
		var title = $(object).find("#title").val(); // object 변수에 jquery를 사용하여 title id 속성을 받는 값들을 찾아서 title이라는 변수에 넣는 부분
		var start_date = $(object).find("#start_date").val();
		var end_date = $(object).find("#end_date").val();
		var client = $(object).find("#client").val();
		var task = $(object).find("#task").val();
		var comment = $(object).find("#comment").val();
		
		var insertCareer = { // 배열을 담는 변수
			title: title,
			start_date: start_date,
			end_date: end_date,
			client: client,
			task: task,
			comment: comment,
			freelance_id: id
		};
		
		// 배열에 경력 데이터를 추가
		careerArray.push(insertCareer);
//		console.log(insertCareer);
//		console.log(careerArray);
		
	});
	
	$.ajax({
		type: "POST", // post 방식
		url: "/FREEGO/free/regist_career.do", // http 요청을 보낼 url
		data: JSON.stringify(careerArray), // 객체를 json으로 변환
		contentType: "application/json;charset=UTF-8",
		dataType: "json",
		success: function(response) {
			console.log(response);
		},
	    error: function(error) {
	    	console.log(error);
	    }
	});

}


// 프리랜서 전문분야
function freeInsertSkill() {
	$.ajax({
        type: "GET", // get 방식
        url: "/FREEGO/free/freeSkillInsert.do", // http 요청을 보낼 url
        dataType: "json",
        success: function(data) { // 성공 시 받은 데이터를 매개변수 data에 받습니다.
//        	$('#insert_skill_list').empty(); // insert_skill_list라는 id를 가진 태그를 비움
        	let prevCategory = null; // prevCategory 변수를 null로 초기화
        	$('#insert_skill_list').html('');
	    	for(let i =0; i < data.skillListData.length; i++){ // i가 data에 포함된 skillListData의 길이 보다 적을 때 i의 값을 1+ 합니다.
	    		
	        	let skillCategory = data.skillListData[i].skill_category.replace(/\s+/g, '_');
	        	data.skillListData[i].code = data.skillListData[i].code.trim();
	        	//data.skillListData 배열의 공백을  _ 로 대체
	        	
	    		if(prevCategory !== skillCategory){
	    			prevCategory = skillCategory;
	    			
	    			let skillTable = // DOM 형식 태그와 
	    				`<p>${data.skillListData[i].skill_name}</p>
	    				<table class="table-type02 free_skill_table">
	        				<caption>${data.skillListData[i].skill_name} 테이블</caption>
		        				<col class="wp50">
		                        <col class="wp50">
	                        </colgroup>
	                        <thead>
		                        <th>전문분야</th>
		                        <th>기술레벨</th>
		                    </thead>
		                    <tbody id="insert_${skillCategory}">
		                    </tbody>
	                    </table>`
	    			$('#insert_skill_list').append(skillTable);
	    		}
	
	    		let skillTbody = `<tr>
					                <td>
					                    <input type="checkbox" name="check1_${data.skillListData[i].code}" id="check1_${data.skillListData[i].code}" value="${data.skillListData[i].name}">
					                    <label for="check1_${data.skillListData[i].code}">${data.skillListData[i].name}</label>
					                <td>
					                    <input type="radio" name="skill1_${data.skillListData[i].code}" id="A_${data.skillListData[i].code}">
					                    <label for="A_${data.skillListData[i].code}">상</label>
					                    <input type="radio" name="skill1_${data.skillListData[i].code}" id="B_${data.skillListData[i].code}">
					                    <label for="B_${data.skillListData[i].code}">중</label>
					                    <input type="radio" name="skill1_${data.skillListData[i].code}" id="C_${data.skillListData[i].code}">
					                    <label for="C_${data.skillListData[i].code}">하</label>
					                </td>
					            </tr>`;
	    		$('#insert_'+skillCategory).append(skillTbody);
	    	}
	    	console.log('insertSkills');
	    	// insertSkills가 있는 경우 체크하기
//	    	insertSkills.forEach(function(item) {
//	    		console.log(item);
//	    		$('#check1_'+item.code).attr('checked', true);
//	    		$('#'+item.level+'_'+item.code).attr('checked', true);
//	    	});
	    	console.log(insertSkills);
	    	$.each(insertSkills, function() {
	    		console.log(this);
	    		$('#check1_'+this.code).attr('checked', true)
	    		$('#'+this.level+'_'+this.code).attr('checked', true);
	    	});
	    	
        	$('#free_skill_insert').off('click');
        	$('#insert_skill_cancel').off('click');
        	
        	$('#insert_skill').click(function(){
	        	insertCheckedSkills();
	        	$('#insertExprtModal').hide();
    		
        	});
        	
        	checkRadio_insert()
        	
        	$('.insert_skill_cancel').click(function(){
        		$('#insertExprtModal').hide();
        	});
        },
        error: function(data) {
        	console.log(data);
        }
 	});

}

function insertCheckedSkills() {
    
	insertSkills = [];
	let displaySelect = [];
    $('input[type="checkbox"]').each(function() {
        if ($(this).is(":checked")) {
            let code = $(this).attr("id").replace("check1_", "");
            let level = $('input[name="skill1_' + code + '"]:checked').attr("id").replace("_"+code,"");
            
            
            let value = $(this).val(); // 현재 체크된 항목의 값
            if (!displaySelect.includes(value)) {
            	insertSkills.push({ code: code, level: level, freelance_id: 0});
                displaySelect.push(value);
            }
        }
    });
    
    console.log(insertSkills);
    let displaySelectSkills = displaySelect.join(', ');
    // diskills 클래스 속성에 선택된 항목들을 붙여 넣음
    $('.diskills').val(displaySelectSkills);
    
    
//    let selectedSkills = [];
//    $('input:checkbox, input:radio').each(function()) {
//    	
//    }
    
}

function checkRadio_insert(){
	
	$('input[type="checkbox"]').on('change', function () {
        let code = $(this).attr("id").replace("check1_", "");
        
        if ($(this).is(":checked")) {
            // 체크박스가 선택된 경우 해당 스킬 라디오 버튼도 선택
            $('input[name="skill1_' + code + '"]').first().prop('checked', true);
        } else {
            // 체크박스가 선택 해제된 경우 해당 스킬 라디오 버튼도 선택 해제
            $('input[name="skill1_' + code + '"]').prop('checked', false);
        }
    });
	
	$('input[type="radio"]').on('change', function() {
		let code = $(this).attr('id').split('_')[1]; // _ 다음에 오는 부분을 추출 후 변수로 초기화
        let level = $(this).attr('id').split('_')[0]; // _ 이전에 오는 부분을 추출 후 변수로 초기화
        if ($(this).is(':checked')) {
            // 라디오 버튼이 선택된 경우 해당 스킬 체크박스도 선택
            $('input[name="check1_' + code +'"]').prop('checked', true);
//            console.log('code :' + code);
//            console.log('level :' + level);
        }
    });
}

function insertSkillList(insertSkills ,freelance_id){
	
	for(let i = 0; i<insertSkills.length; i++){
		insertSkills[i].freelance_id = freelance_id

		console.log('insertSkills['+i+'].code : ' + insertSkills[i].code);
		console.log('insertSkills['+i+'].level : ' + insertSkills[i].level);
		console.log('insertSkills['+i+'].freelance_id : ' + insertSkills[i].freelance_id);
	}
	$.ajax({
		type: "POST",
		url: "/FREEGO/free/insertSkillList.do",
		data: JSON.stringify(insertSkills),
		contentType: "application/json;charset=UTF-8",
		dataType: "json",
		success: function(data) {
//			insertSkills = []
			console.log(data)
		},
		error :function(error) {
	    	console.log(error);
		}
		
	});
}

/* 프리랜서 경력 담당업무 드랍박스 */
function getTaskHTML() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: "/FREEGO/free/getTask.do",
            dataType: "json",
            success: function (data) {
                let getTask = '<option value="">선택</option>';
                for (let i = 0; i < data.commonList.length; i++) {
                    getTask += `<option value="${data.commonList[i].code}">${data.commonList[i].name}</option>`;
                }

                resolve(getTask);
            },
            error: function (data) {
                reject(data);
            }
        });
    });
}