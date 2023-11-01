$(document).ready(function() {
    	$('#onInCodeBtn, #inCodeBtn, #cancelBtn, #upCodeBtn, #delCodeBtn').hide();
    	$('#code_path').append("<span id='root'>root</span>");
    	renewCodeTable("TOP");
    });
/*클릭 초기화 변수*/
let clicked = false;

/* 경로 클릭 */
$(document).on('click', '#code_path span[code]', function(){
	 let super_code = $(this).attr('code');
	 renewCodeTable(super_code);
	 codePath(super_code);
	 $('#onInCodeBtn').show();
	 $('#inCodeBtn, #upCodeBtn, #delCodeBtn, #cancelBtn').hide();
	 clearInput();
	 $('#msg_search').text("");
});
$(document).on('click', '#root', function(){
	$('#code_path span').remove();
	$('#code_path').append("<span id='root'>root</span>");
	renewCodeTable("TOP");
	$('#onInCodeBtn').show();
	$('#inCodeBtn, #upCodeBtn, #delCodeBtn, #cancelBtn,').hide();
	clearInput();
	$('#msg_search').text("");
});

/* 코드 클릭 or 더블클릭 */
$(document).on('click', '#codeTable tbody tr', function(){
	/* 클릭 (detail 호출) */
	if(!clicked){
		$('#onInCodeBtn, #upCodeBtn, #delCodeBtn').show();
		$('#inCodeBtn, #cancelBtn').hide();
		$('#input_code').attr("disabled", true);
		$(this).siblings('tr').removeClass('active');
		$(this).addClass('active');
		let code = $(this).attr('code');
		getCodeDetail(code);
		clicked = true;
		setTimeout(function(){clicked=false;}, 235);
		if($(this).attr('class')=='searchResult active'){
			let spcode = $(this).attr('spcode');
			if(spcode == 'TOP  '){
				$('#code_path span').remove();
				$('#code_path').append("<span id='root'>root</span>");
			}else{
				codePath(spcode);			
			}
		}
	/*더블클릭 (하위코드 진입)*/
	}else if(clicked){
		let super_code = $(this).attr('code');
		renewCodeTable(super_code);
		codePath(super_code);
		$('#upCodeBtn, #delCodeBtn').hide();
		$('#onInCodeBtn').show();
		//clearInput();
		$('#msg_search').text("");
	}
});

/* 수정 버튼 클릭 */
$('#upCodeBtn').click(function(){
	if($('#code_path span:nth-child(3)').attr('code') == 'DPART'){
		alert('부서 코드 관리는 조직도 관리 페이지에서 해주십시오.');
		return;
	}
	let code = $('#input_code').val();
	let name = $('#input_name').val();
	if(inputCheck(code, name)){
		if(confirm('정말 수정하시겠습니까?')){
			let spcode = $('#input_spcode').val();
			let desc = $('#input_desc').val();
			let newOrd = $('#input_ord').val();
			let codeType = "normal";
	    	updateCode(code, name, desc, newOrd, spcode, codeType);
		}
	}
});
/* 삭제 버튼 클릭 */
$('#delCodeBtn').click(function(){
	if(!$('#code_path span:last-child').attr('code')){
		alert('최상위 코드는 추가/삭제가 불가능합니다.');
		return;
	}
	if($('#code_path span:nth-child(3)').attr('code') == 'DPART'){
		alert('부서 코드 관리는 조직도 관리 페이지에서 해주십시오.');
		return;
	}
	if(confirm('정말 삭제하시겠습니까? 복구할 수 없습니다')){
		let spcode = $('#input_spcode').val();
		let code = $('#input_code').val();
		let codeType = "normal";
		deleteCode(code, spcode, codeType);
	}
});

/* 코드 검색 버튼 클릭 */
$('#codeSearchBtn').click(function(){
	let searchType = $('#search_type').val();
	let searchWord = $('#search_word').val();
	searchCode(searchType, searchWord);
	$('#onInCodeBtn').hide();
});
$('#search_word').keydown(function (key) {
    if (key.keyCode == 13) {
    	$('#codeSearchBtn').click();
    }
});
/* 신규 코드 추가 버튼 클릭 */
$('#onInCodeBtn').click(function(){
	if(!$('#code_path span:last-child').attr('code')){
		alert('최상위 코드는 추가/삭제가 불가능합니다.');
		return;
	}
	if($('#code_path span:nth-child(3)').attr('code') == 'DPART'){
		alert('부서 코드 관리는 조직도 관리 페이지에서 해주십시오.');
		return;
	}
	$('#codeTable tbody tr').removeClass('active');
	$('#input_code').attr("disabled", false);
	$(this).hide();
	$('#upCodeBtn, #delCodeBtn').hide();
	$('#inCodeBtn, #cancelBtn').show();
	clearInput();
});

/* 등록 버튼 클릭 */
$('#inCodeBtn').click(function(){
	let code = $('#input_code').val();
	let name = $('#input_name').val();
	if(codeAlreadyCheck(code) != 0){
		$('#msg_btn').text(code + ' 는 이미 존재하는 코드입니다. -코드는 중복될 수 없습니다');
		$('#msg_btn').css('color', 'red');
		return false;
	}
	if(inputCheck(code, name)){
		if(confirm('정말 등록하시겠습니까?')){
			let spcode = $('#code_path span:last-child').attr('code');
			let name = $('#input_name').val();
			let desc = $('#input_desc').val();
			let ord = $('#input_ord').val();
			let codeType = "normal";
			createCode(spcode, code, name, desc, ord, codeType);
		}
	}
});
/*취소 버튼 클릭*/
$('#cancelBtn').click(function(){
	$('#onInCodeBtn').show();
	$('#inCodeBtn, #cancelBtn').hide();
});
$(document).on('click', '#codeTable tbody tr, #cancelBtn, #onInCodeBtn, #codeSearchBtn', function(){
	$('#msg_btn').text("");
});