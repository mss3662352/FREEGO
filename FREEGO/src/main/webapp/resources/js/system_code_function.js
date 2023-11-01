var oldOrd ='';
/*코드 경로 함수*/
function codePath(code){
	
	$.ajax({
		url : '/FREEGO/system/code/getCodePath',
		type : 'get',
		data : {
			"code" : code
		},
		success : function(result){
			var data = result;
			$('#code_path span').remove();
			$('#code_path').append("<span id='root'>root</span>");
			for(var i = 0; i < data.length; i++){
				var $span_code = $("<span></span>");
				var $span_arrow = $("<span>&nbsp;&nbsp;&nbsp;&gt;&nbsp;&nbsp;&nbsp;</span>");
				$span_code.append(data[i].name).attr('code', data[i].code);
				$("#code_path").append($span_arrow);
				$("#code_path").append($span_code);
			}
			
			if(licenseCheck()){
				 $('#licenseInput').show();
			 }else{
				 $('#licenseInput').hide();
			 }
		},
		error : function(){
			alert('오류 발생');
		}
	});
}

/*정렬 순서 get 함수*/
function ordList(super_code){
	var resu;
	$.ajax({
		url : '/FREEGO/system/code/getOrdList',
		type : 'get',
		data : {
			"super_code" : super_code
		},
		success : function(result){
			
		},
		error : function(){
			alert('오류 발생');
		}
	});
}

/*코드 list 갱신 함수*/
function renewCodeTable(super_code){
	
	$.ajax({
		url : '/FREEGO/system/code/getCodeList',
		type : 'get',
		data : {
			"super_code" : super_code
		},
		success : function(result){
			$('#codeTable tbody').remove();
			var data = result;
			var $tbody = $("<tbody></tbody>")
			$("#codeTable").append($tbody);
			var $input_ord = $('#input_ord');
			$input_ord.empty();
			for(var i = 0; i < data.length; i++){
				
				var $tr = $("<tr></tr>");
				$tr.append("<td>"+data[i].code+"</td>");
				$tr.append("<td>"+data[i].name+"</td>");
				$tr.append
					("<td class='codeDesc'>"+(data[i].description ?
					(data[i].description).length > 24 ?
					(data[i].description).substr(0, 24)+"..." : data[i].description : "")
					+"</td>");
				$tr.attr('code', data[i].code);
				$tr.attr('spcode', data[i].super_code);
				$tbody.append($tr);
				$input_ord.append($('<option value="'+data[i].ord+'">'+ data[i].name+' 앞 '+'</option>'));
			}
			if(data.length==0){
				$input_ord.append($('<option value="1">1 | 첫번째</option>'));
			}else{
				$input_ord.append($('<option value="'+(data[data.length-1].ord+1)+'">'+' | 마지막 '+'</option>'));
			}
			clearInput();
		},
		error : function(){
			alert('오류 발생');
		}
	});
}

/* 코드 detail 함수 */
function getCodeDetail(code){
	
	$.ajax({
		url : '/FREEGO/system/code/getCodeDetail',
		type : 'get',
		data : {
			"code" : code
		},
		success : function(result){
			console.log(result.ord);
			clearInput();
			$('#input_spcode').val(result.super_code);
			$('#input_code').val(result.code);
			$('#input_name').val(result.name);
			$('#input_desc').val(result.description);
			$('#input_ord').val(result.ord);
			oldOrd = result.ord;
			
		},
		error : function(){
			alert('오류 발생');
		}
	});
}

/* function getCodeDetail(code){
	var code = code;
	
	$.ajax({
		url : 'code/getCodeDetail',
		type : 'get',
		data : {
			"code" : code
		},
		success : function(result){
			var data = result.data;
			
			$('#input_code').val(data.code);
			$('#input_name').val(data.name);
			$('#input_desc').val(data.description);
			$('#input_ord').val(data.ord);
			
		},
		error : function(){
			alert('오류 발생');
		}
	});
} */

/* 자격증 detail 함수 */
function getLicenseDetail(code){
	
	$.ajax({
		url : '/FREEGO/system/code/getLicenseDetail',
		type : 'get',
		data : {
			"code" : code
		},
		success : function(result){
			console.log(result.ord);
			clearInput();
			$('#input_spcode').val(result.super_code);
			$('#input_code').val(result.code);
			$('#input_name').val(result.name);
			$('#input_desc').val(result.description);
			$('#input_ord').val(result.ord);
			oldOrd = result.ord;
		},
		error : function(){
			alert('오류 발생');
		}
	});
}

/* 코드 등록 함수*/
function createCode(spcode, code, name, desc, ord, codeType){
	
	$.ajax({
		url : '/FREEGO/system/code/createCode',
		type : 'post',
		async : false,
		data : {
			"spcode" : spcode,
			"code" : code,
			"name" : name,
			"desc" : desc,
			"ord" : ord,
			"codeType" : codeType
		},
		success : function(result){
			renewCodeTable(spcode);
			$('#onInCodeBtn').show();
			$('#inCodeBtn, #cancelBtn, #randomCodeBtn').hide();
			clearInput();
			$('#msg_btn').text(result.msg);
			$('#msg_btn').css('color', result.color);
		},
		error : function(){
			alert('오류 발생');
		}
	});
}

/* 코드 정보 수정 함수*/
function updateCode(code, name, desc, newOrd, spcode, codeType){
	
	$.ajax({
		url : '/FREEGO/system/code/updateCode',
		type : 'post',
		async : false,
		data : {
			"spcode" : spcode,
			"code" : code,
			"name" : name,
			"desc" : desc,
			"oldOrd" : oldOrd,
			"newOrd" : newOrd,
			"codeType" : codeType
		},
		success : function(result){
			
			renewCodeTable(spcode);
			$('#upCodeBtn, #delCodeBtn').hide();
			clearInput();
			$('#msg_btn').text(result.msg);
			$('#msg_btn').css('color', result.color);
			
		},
		error : function(){
			alert('오류 발생');
		}
	});
}
/* 코드 삭제 함수 */
function deleteCode(code, spcode, codeType){
	
	$.ajax({
		url : '/FREEGO/system/code/deleteCode',
		type : 'post',
		async : false,
		data : {
			"code" : code,
			"codeType" : codeType
		},
		success : function(result){
			
			renewCodeTable(spcode);
			$('#upCodeBtn, #delCodeBtn').hide();
			clearInput();
			$('#msg_btn').text(result.msg);
			$('#msg_btn').css('color', result.color);
		},
		error : function(){
			alert('오류 발생');
		}
	});
}


/* 코드 검색 함수 */
function searchCode(type, word){
	$.ajax({
		url : '/FREEGO/system/code/searchCode',
		type : 'get',
		data : {
			"type" : type,
			"word" : word.replaceAll(' ', ''),
		},
		success : function(result){
			$('#codeTable tbody').remove();
			var data = result;
			var $tbody = $("<tbody></tbody>")
			$("#codeTable").append($tbody);
			
			for(var i = 0; i < data.length; i++){
				
				var $tr = $("<tr></tr>");
				$tr.addClass('searchResult');
				$tr.append("<td>"+data[i].code+"</td>");
				$tr.append("<td>"+data[i].name+"</td>");
				$tr.append
					("<td>"+(data[i].description ?
					(data[i].description).length > 23 ?
					(data[i].description).substr(0, 23)+"..." : data[i].description : "")
					+"</td>");
				$tr.attr('code', data[i].code);
				$tr.attr('spcode', data[i].super_code);
				$tbody.append($tr);
			}
			if(data.length == 0){
				$('#msg_search').text("검색 결과가 없습니다");
				$('#msg_search').css('color','black');
			}else{
				$('#msg_search').text("총 "+data[0].cnt+"개의 코드가 검색되었습니다.");
				$('#msg_search').css('color','blue');
			}
		},
		error : function(){
			alert('오류 발생');
		}
	});
}

/* 코드 중복 체크 함수 */
function codeAlreadyCheck(code){
	var checkCnt;
	$.ajax({
		url : '/FREEGO/system/code/codeAlreadyCheck',
		type : 'get',
		async: false,
		data : {
			"code" : code
		},
		success : function(result){
			checkCnt = result;
		},
		error : function(){
			alert('오류 발생');
		}
	});
	return checkCnt;
}
/*코드code 자동 생성 함수*/
function randomCode() {
	var code;
	do {
	    code = '';
	    for (let i = 0; i < 5; i++) {
	    	code += Math.floor(Math.random() * 36).toString(36);
	    }
	} while(codeAlreadyCheck(code) != 0);
 
    return code.toUpperCase();
};
/* 코드 정보창 초기화 함수 */
function clearInput(){
	$('#input_spcode, #input_code, #input_name, #input_desc, #input_ord').val("");
}

/* 입력값 공백 체크 함수 */
function inputEmptyCheck(){
	if($('#input_code').val().trim()=='' || $('#input_name').val().trim()=='' || $('#input_ord').val().trim()==''){
		return true;
	}else{
		return false;
	}
}
/* 입력값 유효성 검사 */
function inputCheck(code, name){
	if(inputEmptyCheck()){
		$('#msg_btn').text('제대로 입력해주세요');
		$('#msg_btn').css('color', 'red');
		return false;
	}
	var code_pattern = /[a-zA-Z0-9]/;
	if(!code_pattern.test(code)){
		$('#msg_btn').text('코드는 영문자, 숫자만 사용할 수 있습니다');
		$('#msg_btn').css('color', 'red');
		return false;
	}
	if(code.length > 5){
		$('#msg_btn').text('코드는 5자 이하로 정해주세요');
		$('#msg_btn').css('color', 'red');
		return false;
	}
	if(name.length > 29){
		$('#msg_btn').text('코드명은 5자 이하로 정해주세요');
		$('#msg_btn').css('color', 'red');
		return false;
	}
	return true;
}

/* 자격증 하위 항목 여부 (추가정보 입력창 ON) */
function licenseCheck(){
	return (($('#code_path span:nth-child(3)').attr('code') == 'LICEN') && ($('#code_path').children().length) == 5) ? true : false;
}
