//시작 시 페이지 1, 옵션 키워드
let currentPage = 1;
let option = "";
let keyword = "";

let checkedSkills = [];
let originalSkillStates = [];

$(document).ready(function () {
	
    modal9();
    autoPhoneNumberFormat('#telephone1');
    let searchText = localStorage.getItem('keyword');
	if(searchText){
		getList(currentPage, option, searchText);
		localStorage.removeItem('keyword');
	}else{
		getList(currentPage, option, keyword); // 페이지 번호 1로 초기 로딩
	}
    $('#free_search_bar').on('keyup', function(event) {
	     if (event.keyCode === 13) {
	         $('.btn-search').click(); // 엔터 키를 누르면 검색 실행
	     }
	});
    $('#add_freeImg').click(function(){
		$('#uploadFile_FREE').click();
	});
    
    $('#uploadFile_FREE').on("change", imgFile_free1)//사진이 바뀔 시 이미지 핸들러
    
    $(document).on('change', '.free_validation', free_validation)
	
    $('.btn-search').click(function () {
        option = $('select[name="free_search_option"]').val();
        keyword = $('input[name="free_search_bar"]').val();

        // 검색 버튼 클릭 시 현재 페이지 번호를 1로 초기화하여 검색 결과를 보여줌
        currentPage = 1;
        getList(currentPage, option, keyword);
    });
});



function pagination(data) {
    // 이전 페이지로 이동
    $('.prev-page a').off('click').on('click', function (e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage = data.ph.beginPage - 1 // 이전 페이지로 이동
            getList(currentPage, option, keyword);
        }
    });

    // 다음 페이지로 이동
    $('.next-page a').off('click').on('click', function (e) {
        e.preventDefault();
        if (currentPage < data.ph.totalPage) {
            currentPage = data.ph.endPage + 1 // 다음 페이지로 이동
            getList(currentPage, option, keyword);;
        }
    });
    $('.pprev-page a').off('click').on('click', function (e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage = 1; // 처음 페이지로 이동
            getList(currentPage, option, keyword);
        }
    });

    // 다음 페이지로 이동
    $('.nnext-page a').off('click').on('click', function (e) {
        e.preventDefault();
        if (currentPage < data.ph.totalPage) {
            currentPage = data.ph.totalPage // 마지막 페이지로 이동
            getList(currentPage, option, keyword);;
        }
    });
    // 페이지 번호를 클릭하여 해당 페이지로 이동
    $('.pageNum').off('click').on('click', function (e) {
        e.preventDefault();
        if (currentPage !== $(this).text()) { // 현재 페이지와 같은 페이지를 클릭했을 때는 요청을 보내지 않음
            currentPage = parseInt($(this).text()); // 클릭한 페이지 번호를 숫자로 변환
            getList(currentPage, option, keyword);
        }
    });
}
//프리랜스 리스트를 불러오는 함수
function getList(page, option, keyword) {
    $.ajax({
        type: "GET",
        url: "/FREEGO/free/list.do",
        data: {
        	page: page,
            option: option,
            keyword: keyword,
        },
        dataType: 'json',
        success: function(data) {
            let str = ''; // HTML 문자열을 담을 변수
            let pageStr = '';
            $('#freelancer_num').text(data.freelnace_count + '명'); //프리랜스 현황 인원 수
            // 리스트 데이터를 동적으로 생성
            for (let i = 0; i < data.list.length; i++) {
            	 let postNumber = (data.ph.sc.page - 1) * data.ph.sc.pageSize + i + 1;
                str += '<tr>' +
                    '<td>' + postNumber + '</td>' +
                    '<td>' + data.list[i].name + '</td>' +
                    '<td>' + data.list[i].telephone + '</td>' +
                    '<td>' + data.list[i].email + '</td>' +
                    '<td class="skill_hidden"><a href="#" onclick="getSkillList(' + data.list[i].id + ');">' + data.list[i].skill_name + '</td>' +
                    '<td>' + data.list[i].career + '</td>' +
                    '<td>' + data.list[i].grade + '</td>' +
                    '<td><a href="#" class="rate_read btn-manage" onclick="getRate(' + data.list[i].id + ');">보기/등록</a></td>' +
                    '<td>'+
	                    '<div class="free-flbtn-manage">'+
	                    	'<a href="#" class="btn-manage" onclick="getFreeInfo(' + data.list[i].id + ');">수정</a>'+
	                    	'<a href="#" class="btn-manage" onclick="deleteFreelance(' + data.list[i].id + ');">삭제</a>'+
	                    '</div>'+
	                '</td> ' +
                    '</tr>';
                
            };
            if(data.list.length == 0){
            	str += '<tr><td colspan="9">검색 결과가 없습니다.</td></tr>';
            }
            pageStr += '<ul class="page_container">';
            if ((data.ph.totalCnt != null && data.ph.totalCnt != 0) && data.ph.endPage != 1) {
     	            
            	 if (data.ph.showPrev) {
	                pageStr += 
	                '<li class="pprev-page"><a href="#"></a></li>'+
	                '<li class="prev-page"><a href="#"></a></li>';
            	 }
                for (let i = data.ph.beginPage; i <= data.ph.endPage; i++) {
                	pageStr += `<li><a class="${i === data.ph.sc.page ? 'on' : 'pageNum'}" href="#">${i}</a></li>`;
                }
                if (data.ph.showNext) {
	                pageStr += 
	                '<li class="next-page"><a href="#"></li>' + 
	                '<li class="nnext-page"><a href="#"></li>';
                }
            }
            pageStr += '</ul>'    
            // 생성된 HTML 문자열을 .free_list 요소에 추가
            $('.free_list').empty().append(str);
            $('.free-paging-btn').empty().append(pageStr);

            pagination(data);
        },
        error: function(error) {
            console.error("Error fetching freelance list:", error);
        }
    });
}

// 날짜 형식 계산
function dateString(date){
	let formattedDate = new Date(date);
	let year = formattedDate.getFullYear();
	let month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
	let day = formattedDate.getDate().toString().padStart(2, '0');
	let formattedDateString = year + '-' + month + '-' + day;
	
	return formattedDateString
}

//프리랜스 삭제
function deleteFreelance(freelance_id){
	let result = confirm("프리랜스 정보를 삭제하시겠습니까?");
	
	if(result == true){
		$.ajax({
			type: "POST",
			url: "/FREEGO/free/deleteFreelance.do",
			data:{freelance_id:freelance_id},
			dataType: "json",
			success: function(data) {
				alert("프리랜스 삭제 완료")
				getList(currentPage, option, keyword);
			},
			error: function(data){
				console.log(error);
			}
		})
	}else{
		return false;
	}
}	

// 프리랜스 정보 불러오기
function getFreeInfo(freelance_id){
		$('#free_profile_Img').remove();
		$('.free_profile_sample_image').remove();
	 	$('#free_callProfile').remove();
	 	checkedSkills = [];
	 	
		$.ajax({
			type: "GET",
			url: "/FREEGO/free/getFreeInfo.do",
			data:{freelance_id:freelance_id},
			dataType: "json",
			success: function(data) {
				
				$('#freeUpdateModal').show();
				
				// 변환한 날짜를 입력 요소에 설정
				$("#name1").val(data.getFreelance.name);
				$("#registration_date1").text(dateString(data.getFreelance.registration_date));
		        $("#telephone1").val(data.getFreelance.telephone);
		        $("#birthday1").val(dateString(data.getFreelance.birthday));
		        $("#gender1").val(data.getFreelance.gender);
		        $("#email1").val(data.getFreelance.email);
		        $("#location1").val(data.getFreelance.location);
		        $("#price1").val(data.getFreelance.price);
		        $("#project1").val(data.getFreelance.project);
		        $("#career1").text(data.getFreelance.career);
		        $("#grade1").text(data.getFreelance.grade);
		        $("#skill1").val(data.getFreelance.skill_name);
		        $("#mainPro").val(data.getFreelance.path);
		        
		        showFreeProfileImg();
		        getFreeCareer(freelance_id);
	    		getUpdateSkillList(freelance_id)
		        
	    		
		        $('#udpateButton').off('click');
		        $('.exprt-search').off('click');
		        
		        $('#skill1').click(function(){
		        	 $('.exprt-search').click();
		        })
		        
		        $('.exprt-search').click(function() {
		    		$('#freeExprtModal').show();
		    	});
	            // 클릭 이벤트 핸들러를 등록
	            $('#udpateButton').click(function () {
	            	if(freeUpdateCheck()){
	            		if(freeCareerUpdateCheck()){
	            			if(freeCareerInsertCheck()){
	            				freeUpdate(freelance_id);
	            			}
	            		}
	            	}
	            })
	            $('#')
			},
	        error: function(error) {
	        	console.log(error);
	        }
	});
		
}

// 프리랜스 경력 수정
function getFreeCareer(freelance_id){
	$.ajax({
		type: "GET",
		url: "/FREEGO/free/getFreeCareer.do",
		data:{freelance_id:freelance_id},
		dataType: "json",
		success: function(data) {
			
			let career = '';
	        let no = 1;
	       
        	let free_task
        	for (let j = 0; j < data.commonList.length; j++) {
        		free_task += `<option value="${data.commonList[j].code}">${data.commonList[j].name}</option>`;
        	}
	        for(let i = 0; i < data.careerList.length; i++){
		       career += 			    	
		    	   `<tr class="career_update">
		                <td>
		                    <label for="" class="hidden"></label>
		                    <input type="text" name="title${i}" maxlength="30" value="${data.careerList[i].title}">
		                </td>
		                <td>
		                    <label for="" class="hidden"></label>
		                    <input type="date" class="free_validation" name="start_date${i}" value="${dateString(data.careerList[i].start_date)}">
		                </td>
		                 <td>
		                    <label for="" class="hidden"></label>
		                    <input type="date" class="free_validation" name="end_date${i}" value="${dateString(data.careerList[i].end_date)}">
		                </td>
		                <td>
		                    <label for="" class="hidden"></label>
		                    <input type="text" name="client${i}" maxlength="30" value="${data.careerList[i].client}">
		                </td>
		                <td>
		                    <label for="" class="hidden"></label>
		                    <select type="text" name="task${i}" class="wp100">
		                    	<option value="">선택</option>
		                    	${free_task.replace(`"${data.careerList[i].task}"`, `"${data.careerList[i].task}" selected`)}
		                    </select>
		                </td>
		                <td>
		                    <label for="" class="hidden"></label>
		                    <input type="text" name="comment${i}" maxlength="100" value="${data.careerList[i].comment}">
		                </td>
		                <td>
		                    <div class="free-flbtn-manage">
		    	   			   <input type="hidden" name="career_id${i}" value="${data.careerList[i].id}">
		                       <input type="hidden" name="count" value="${data.careerList.length}">
		                       <span class="delete-btn" onclick="">삭제</span>
		                    </div>
		                </td>
		            </tr>`
		    	   no++

	        	}
		        $(document).ready(function() {
		        	$(document).off('click', '.add-btn-update').on('click', '.add-btn-update', function() {
		        		if (freeCareerInsertCheck()) {
			                let newCareerRow = 
			                    `<tr class="career_insert">
			                        <td>
			                            <label for="" class="hidden"></label>
			                            <input type="text" name="new_title[]">
			                        </td>
			                        <td>
			                            <label for="" class="hidden"></label>
			                            <input type="date" class="free_validation" name="new_start_date[]">
			                        </td>
			                        <td>
			                            <label for="" class="hidden"></label>
			                            <input type="date" class="free_validation" name="new_end_date[]">
			                        </td>
			                        <td>
			                            <label for="" class="hidden"></label>
			                            <input type="text" name="new_client[]">
			                        </td>
			                        <td>
			                            <label for="" class="hidden"></label>
			                            <select type="text" name="new_task[]" class="wp100">
			                                <option value="">선택</option>
			                                ${free_task}
			                            </select>
			                        </td>
			                        <td>
			                            <label for="" class="hidden"></label>
			                            <input type="text" name="new_comment[]">
			                        </td>
			                        <td>
			                            <div class="free-flbtn-manage">
			                                <span class="delete-btn">삭제</span>
			                            </div>
			                        </td>
			                    </tr>`;
		                // 새로운 행을 테이블에 추가
		                $('#careerTbody').append(newCareerRow);
		                free_validation();
		        		}
		            });
		        	$(document).on('click', '.delete-btn', function() {
		                // 현재 클릭한 delete-btn의 부모 tr 요소를 찾습니다.
		                let tr = $(this).closest("tr");

		                // tr 요소에 career_hidden 클래스를 추가하여 숨깁니다.
		                tr.removeClass().addClass("career_hidden");
		            });
		        	 
		        });

		        $('#careerTbody').empty().append(career);
		        free_validation();
			},
	        error: function(error) {
	        	console.log(error);
	        }
	})
	
}
//프리랜스 정보 수정
function freeUpdate(id){
	
	let formData = new FormData();
	let profileUpload = $('input[name="profileUpload"]')[0].files[0];
	
    let updateData = {
    		"id": id,
			"name": $("#name1").val(),
			"registration_date": $("#registration_date1").val(),
			"telephone": $("#telephone1").val(),
			"birthday": $("#birthday1").val(),
			"gender": $("#gender1").val(),
			"email": $("#email1").val(),
			"location": $("#location1").val(),
			"price": $("#price1").val(),
			"project": $("#project1").val(),
			"path": $('#mainPro').val()
	};
    
    formData.append('profileUpload', profileUpload);
	formData.append('key', new Blob([ JSON.stringify(updateData) ], {type : "application/json"}));
	
    $.ajax({
		type: "POST",
		url: "/FREEGO/free/freeUpdate.do",
		data: formData,
		processData: false, // 데이터 처리 방식 설정
        contentType: false, // 컨텐츠 타입 설정
        enctype : 'multipart/form-data', 
		success: function(data) {
			updateCareer(id);
			deleteCareer(id);
			insertCareer(id);
			getCheckedSkills(id, checkedSkills)
			alert("프리랜스 정보 수정 완료");
            getList(currentPage, option, keyword);
			$('#loading_page').hide();
			$('#freeUpdateModal').hide();
			getFreeInfo(id);
		},
        error: function(error) {
        	console.log(error);
        },
        beforeSend : function(){
			$('.text').text('저장 중입니다.');
			$('#loading_page').show();
		}
	});
    
}

function updateCareer(freelance_id){
	let careerArray = [];
	let index = $('input[name="count"]').val();
	
	for(let i=0; i<index; i++){
		let career_id = $('input[name="career_id'+i+'"]').val();
		let title = $('input[name="title'+i+'"]').val();
		let start_date = $('input[name="start_date'+i+'"]').val();
		let end_date = $('input[name="end_date'+i+'"]').val();
		let client = $('input[name="client'+i+'"]').val();
		let task = $('select[name="task'+i+'"]').val();
		let comment = $('input[name="comment'+i+'"]').val();
		let updateCareerData ={
				id : career_id,
				title:title,
				start_date:start_date,
				end_date:end_date,
				client:client,
				task:task,
				comment:comment,
				freelance_id:freelance_id
		};
		careerArray.push(updateCareerData);
	};
	
	$.ajax({
		type: "POST",
		url: "/FREEGO/free/updateCareer.do",
		data: JSON.stringify(careerArray),
		contentType: "application/json;charset=UTF-8",
		dataType: "json",
		success: function(data) {
		},
        error: function(error) {
        	console.log(error);
        }
	})
}
//프리랜스 경력 삭제
function deleteCareer(freelance_id){
	let career_id = [];

	$('.career_hidden').find('input[name^="career_id"]').each(function(){
		career_id.push(parseInt($(this).val()));
	})
	$.ajax({
		type: "POST",
		url: "/FREEGO/free/deleteCareer.do",
		data: JSON.stringify(career_id),
	    contentType: "application/json;charset=UTF-8",
		dataType: "json",
		success: function(data) {
		},
		error: function(data){
			console.log(data);
		}
	})
}

// 프리랜스 경력 추가
function insertCareer(freelance_id){
	let newCareers = [];
	
	$("tr.career_insert").each(function() {
        let title = $(this).find('input[name="new_title[]"]').val();
        let start_date = $(this).find('input[name="new_start_date[]"]').val();
        let end_date = $(this).find('input[name="new_end_date[]"]').val();
        let client = $(this).find('input[name="new_client[]"]').val();
        let task = $(this).find('select[name="new_task[]"]').val();
        let comment = $(this).find('input[name="new_comment[]"]').val();
        newCareers.push({
            title: title,
            start_date: start_date,
            end_date: end_date,
            client: client,
            task: task,
            comment: comment,
            freelance_id: freelance_id
        });
    });
	$.ajax({
		type: "POST",
		url: "/FREEGO/free/insertCareer.do",
		data: JSON.stringify(newCareers),
		contentType: "application/json;charset=UTF-8",
		dataType: "json",
		success: function(data) {
		},
		error :function(error) {
        	console.log(error);
		}
		
	});
}


//평가 의견 보기 함수
function getRate(freelance_id){
	 $.ajax({
        type: "GET",
        url: "/FREEGO/free/rate.do?id=" + freelance_id,
        dataType:'json',
        success : function(data){
	        $('#dicModal').show();
	        $('.scrollable-table').scrollTop(0);
        	let str = ''; // HTML 문자열을 담을 변수
            let no = 1; //평가 리스트의 순서 용도
            let inputRow = ''; //평가 의견 작성 란
        	$('.rate_name').text(data.freelanceInfo.name+'(' + (data.freelanceInfo.project == "" || data.freelanceInfo.project == null ? "해당없음" : data.freelanceInfo.project) +')');
            
        	for (let i = 0; i < data.rateList.length; i++){
                // 각 데이터를 행으로 추가
                str += '<tr>' +
                       '<td>' + (i+1) + '</td>' +
                       '<td style="text-align:left;">' + data.rateList[i].evaluation + '</td>' +
                       '<td>' + dateString(data.rateList[i].registration_date) + '</td>' +
                       '<td>' + data.rateList[i].e_name + '</td>' +
                       '</tr>';
                no++
        	}
            // 마지막 행 추가
        	inputRow = '<tr>'+
        		   '<td>' + no +'</td>' +
        		   '<td style="text-align:left;"><input type="text" name="free_evaluation" class="wp100 hp100" placeholder=" 평가 내용을 입력해 주세요" maxlength="50"></td>' +
        		   '<td>' + todayDate() +'</td>' +
                   '<td><a href="#" id="free_rate_btn" class="table-btn wp90" style="margin:0 auto" onclick="evaluationCheck() ? modal10(' + freelance_id + ') : false">등 록</a></td>' +
                   '</tr>';
        	$('.free_rateList').empty().append(str);	
        	$('.free_rateList_input').empty().append(inputRow);
        	
        	
        },
        error : function(data){
        	console.error("Error fetching freelance rate:", error);
        }
	 });
}
// 오늘 날짜 return
function todayDate(){
	let today = new Date();
	let year = today.getFullYear();
	let month = today.getMonth() + 1;
	let day = today.getDate();
	if (month < 10) {
	    month = '0' + month;
	}
	if (day < 10) {
	    day = '0' + day;
	}
	let todayFormatted = year + '-' + month + '-' + day;
	
	return todayFormatted
}


//평가 의견 등록 함수
function insertRate(freelance_id){
	let evaluation = $('input[name="free_evaluation"]').val();
	 $.ajax({
	        type: "POST",
	        url: "/FREEGO/free/insertRate.do",
	        data: {
	        	freelance_id : freelance_id,
	        	evaluation : "'" + evaluation + "'"
	        },
	        dataType:'json',
	        success: function(data) {
	        	getRate(freelance_id);
	            $('.btn-popup-check').removeClass('processing'); // 버튼 다시 활성화
	            
	        },
	        error: function(error) {
	        	console.error("Error while inserting evaluation:", error);
	            // 실패 시에도 버튼을 다시 활성화
	            $('.btn-popup-check').removeClass('processing');
	        }
	 });
}
//프리랜스 리스트 스킬 상세보기
function getSkillList(freelance_id){
	 $.ajax({
       type: "GET",
       url: "/FREEGO/free/skillList.do?id=" + freelance_id,
       dataType:'json',
       success : function(data){
	        $('#skillModal').show();
	        
	        let str = ''; // HTML 문자열을 담을 변수
            let no = 1; //평가 리스트의 순서 용도
            let inputRow = ''; //평가 의견 작성 란
           
	       	for (let i = 0; i < data.skillList.length; i++){
	               // 각 데이터를 행으로 추가
	               str += '<tr>' +
	                      '<td>' + (i+1) + '</td>' +
	                      '<td>' + data.skillList[i].name + '</td>' +
	                      '<td>' + data.skillList[i].skill_name + '</td>' +
	                      '<td>' + data.skillList[i].skill_level + '</td>' +
	                      '</tr>';
	               no++
	       	}
	                  
	       	$('.skillListTbody').html(str);
       },
       error : function(data){
       	console.error("Error fetching freelance rate:", error);
       }
	 });
}

//프리랜스 형황에 스킬과 스킬등급별로 데이터를 불러옴
$(document).ready(function() {
    $.ajax({
        type: "GET",
        async: true,
        url: "/FREEGO/free/status.do", 
        dataType: "json",
        success: function(data) {
        	
            let tableBody = $('#free_status_table tbody');
            tableBody.empty();

            let categoryCounts = {}; // 각 카테고리 별 행 수를 저장할 객체
            
            for (let i = 0; i < data.skillData.length; i++) {
            	
                let item = data.skillData[i]; //스킬 데이터 item에 스킬데이터를 담음
                let category = item.skill_category;

                if (!categoryCounts.hasOwnProperty(category)) {
                    categoryCounts[category] = 0;
                }

                categoryCounts[category]++; // 해당 카테고리의 행 수 증가
            }
            
            let prevCategory = null; // 이전 스킬 분야 카테고리

            for (let i = 0; i < data.skillData.length; i++) {
                let item = data.skillData[i];
                let row = $('<tr>');
                
                
                if (prevCategory !== item.skill_category) {
                    prevCategory = item.skill_category;
                    var rowspanAttr = 'rowspan="' + categoryCounts[item.skill_category] + '"';
                    row.append($('<td ' + rowspanAttr + '>').append($('<a href="#" onclick="getFreeSkill(\'' + item.code + '\', \'\', \'\')">').text(item.skill_category)));
                }

                row.append($('<td class="skill_name">').append($('<a href="#" onclick="getFreeSkill(\'' + item.code + '\', \'\', \'' + item.skill_name + '\')">').text(item.skill_name))); // 구분
                
                row.append($('<td>').append(item.skill_level_A !== 0
                ? $('<a href="#" onclick="getFreeSkill(\'' + item.code + '\', \'A\', \'' + item.skill_name + '\')">').text(item.skill_level_A) : ''));
                row.append($('<td>').append(item.skill_level_B !== 0
                ? $('<a href="#" onclick="getFreeSkill(\'' + item.code + '\', \'B\', \'' + item.skill_name + '\')">').text(item.skill_level_B) : ''));
                row.append($('<td>').append(item.skill_level_C !== 0 
                ? $('<a href="#" onclick="getFreeSkill(\'' + item.code + '\', \'C\', \'' + item.skill_name + '\')">').text(item.skill_level_C) : ''));
                

	            row.append($('<td>').append($('<a href="#" onclick="getFreeSkill(\'' + item.code + '\', \'\', \'' + item.skill_name + '\')">').text(item.skill_sum)));
                tableBody.append(row);
            }

        },
        error: function(data) {
        	console.log(data);
        }
    });
});

//스킬 현황 불러오기
function getFreeSkill(skill_category, skill_level, skill_name){
	
	 $.ajax({
	        type: "GET",
	        async: true,
	        url: "/FREEGO/free/getSkill.do",
	        data: {
	        	skill_category: skill_category,
	        	skill_level: skill_level,
	        	skill_name: skill_name
	        },
	        dataType: "json",
	        success: function(data) {
	        	$('#premenModal').show();
	        	let str = ''; // HTML 문자열을 담을 변수
	            let no = 1; //프리랜서 순서 용도
	            $('.scrollable-table').scrollTop(0);
	            for (let i = 0; i < data.skillDetailList.length; i++){
	                // 각 데이터를 행으로 추가
	                str += '<tr>' +
	                       '<td>' + (i+1) + '</td>' +
	                       '<td>' + data.skillDetailList[i].skill_name + '</td>' +
	                       '<td>' + data.skillDetailList[i].skill_level + '</td>' +
	                       '<td>' + data.skillDetailList[i].name + '</td>' +
	                       '<td>' + data.skillDetailList[i].telephone + '</td>' +
	                       '<td>' + data.skillDetailList[i].email + '</td>' +
	                       '</tr>';
	                no++
	        	}
	            $('.freeSkillDetail').html(str);
	        },
	        error: function(data) {
	        	console.log(data);
	        }
	 	})
}

//프리랜스 수정 스킬 불러오기
function getUpdateSkillList(freelance_id){
	
	 $.ajax({
	        type: "GET",
	        url: "/FREEGO/free/getUpdateSkillList.do",
	        data:{freelance_id:freelance_id}, 
	        dataType: "json",
	        success: function(data) {
	        	$('#free_skill_list').empty();
	        	let prevCategory = null; 
	        	
	        	for(let i =0; i < data.skillListData.length; i++){

		        	let skillCategory = data.skillListData[i].skill_category.replace(/\s+/g, '_'); // 공백을 _로 대체
	        		if(prevCategory !== skillCategory){
	        			prevCategory =skillCategory;
	        			
	        			let skillTable =
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
			                    <tbody id="free_${skillCategory}">
			                    </tbody>
		                    </table>`
	        			$('#free_skill_list').append(skillTable)
	        		}

	        		let skillTbody = `<tr>
						                <td>
						                    <input type="checkbox" name="check_${data.skillListData[i].code}" id="check_${data.skillListData[i].code}" value="${data.skillListData[i].name}"
						                    ${checked(i, data) === 'Y' ? 'checked' : ''}>
						                    <label for="check_${data.skillListData[i].code}">${data.skillListData[i].name}</label>
						                <td>
						                    <input type="radio" name="skill_${data.skillListData[i].code}" id="A_${data.skillListData[i].code}" value="A" 
						                    ${checked2(i, data) === 'A' ? 'checked' : ''}>
						                    <label for="A_${data.skillListData[i].code}">상</label>
						                    <input type="radio" name="skill_${data.skillListData[i].code}" id="B_${data.skillListData[i].code}" value="B" 
						                    ${checked2(i, data) === 'B' ? 'checked' : ''}>
						                    <label for="B_${data.skillListData[i].code}">중</label>
						                    <input type="radio" name="skill_${data.skillListData[i].code}" id="C_${data.skillListData[i].code}" value="C" 
						                    ${checked2(i, data) === 'C' ? 'checked' : ''}>
						                    <label for="C_${data.skillListData[i].code}">하</label>
						                </td>
						            </tr>`;
	        		$('#free_'+skillCategory).append(skillTbody);
	        		
	        	}
	        	checkRadio()
	        	skillCheckBox(freelance_id);
	        	saveOriginalSkillState()
	        	
	        	$('#free_skill_update').off('click');
	        	$('#free_skill_cancel').off('click');
	        	$('#free_skill_close').off('click');
	        	$('#free_skill_update').click(function(){
	        		if(freeSkillUpdateCheck()){
	        			skillCheckBox(freelance_id);
	    	        	saveOriginalSkillState();
			        	$('#freeExprtModal').hide();
	        		}else{
	        			alert("최소 한 개 이상의 전문분야를 선택 해야 합니다");
	        			return false
	        		}
	        	})
	        	$('#free_skill_cancel').click(function(){
	        		restoreOriginalSkillState();
	        		$('#freeExprtModal').hide();
	        	})
	        	$('#free_skill_close').click(function () {
	        		restoreOriginalSkillState();
	        		$('#freeExprtModal').hide();
	        	})
	        	
	        },
	        error: function(data) {
	        	console.log(data);
	        }
	 	})
	
}

//체크되어 있는 스킬들 배열 담아 보내기
function skillCheckBox(freelance_id){
	let skillView = [];
	checkedSkills = [];
    $('input[type="checkbox"]').each(function() {
        if ($(this).is(":checked")) {
            let code = $(this).attr("id").replace("check_", ""); 
            let level = $('input[name="skill_' + code + '"]:checked').attr("id").replace("_"+code,"");
            
            checkedSkills.push({ code: code, level: level, freelance_id : freelance_id });
            if (!skillView.includes($(this).val())) {
            	skillView.push($(this).val());
            }
        }
    });
    let selectedSkillsString = skillView.join(", ");
	$("#skill1").val(selectedSkillsString);
}

// 전역 변수인 checkedSkills에 담겨져 있는 걸 보냄
function getCheckedSkills(freelance_id, checkedSkills){
	
    $.ajax({
		type: "POST",
		url: "/FREEGO/free/updateCheckSkill.do",
		data: JSON.stringify(checkedSkills),
		contentType: "application/json;charset=UTF-8",
		dataType: "json",
		success: function(data) {
		},
		error :function(error) {
        	console.log(error);
		}
		
	});
    
}

//체크박스 체크
function checked(i, data){
	for(let j = 0; j < data.skillSelectList.length; j++){
    	if(data.skillListData[i].code == data.skillSelectList[j].code){
    		return 'Y';
    	}
    }
	return 'N';
}

//레벨 체크
function checked2(i, data) {
    for (let j = 0; j < data.skillSelectList.length; j++) {
        if (data.skillListData[i].code == data.skillSelectList[j].code) {
            switch (data.skillSelectList[j].level) {
                case 'A':
                    return 'A'; // 'A'에 해당하는 경우 상 라디오 버튼을 체크
                case 'B':
                    return 'B'; // 'B'에 해당하는 경우 중 라디오 버튼을 체크
                case 'C':
                    return 'C'; // 'C'에 해당하는 경우 하 라디오 버튼을 체크
                default:
                    return 'N'; // 다른 경우는 'N'을 반환하여 체크하지 않음
            }
        }
    }
    return 'N';
}

//체크박스 라디오 동시 선택
function checkRadio(){
	
	$('input[type="checkbox"]').on('change', function () {
        let code = $(this).attr("id").replace("check_", "");
        
        if ($(this).is(":checked")) {
            // 체크박스가 선택된 경우 해당 스킬 라디오 버튼도 선택
            $('input[name="skill_' + code + '"]').first().prop('checked', true);
        } else {
            // 체크박스가 선택 해제된 경우 해당 스킬 라디오 버튼도 선택 해제
            $('input[name="skill_' + code + '"]').prop('checked', false);
        }
    });
	$('input[type="radio"]').on('change', function() {
		let code = $(this).attr('id').split('_')[1]; // _ 다음에 오는 부분을 코드로 추출
        let level = $(this).attr('id').split('_')[0]; // _ 이전에 오는 부분을 레벨로 추출
        if ($(this).is(':checked')) {
            // 라디오 버튼이 선택된 경우 해당 스킬 체크박스도 선택
            $('input[name="check_' + code +'"]').prop('checked', true);
        }
    });
}

//원래의 전문분야 상태를 저장해주는 함수
function saveOriginalSkillState() {
    originalSkillStates = [];
    $('input[type="checkbox"]').each(function() {
        if ($(this).is(":checked")) {
            let code = $(this).attr("id").replace("check_", "");
            let level = $('input[name="skill_' + code + '"]:checked').attr("id").replace("_"+code,"");
            originalSkillStates.push({ code : code, level : level });
        }
    });
}
//원래의 전문분야 상태를 부르는 함수
function restoreOriginalSkillState() {
    $('input[type="checkbox"]').prop('checked', false);
    $('input[type="radio"]').prop('checked', false);

    originalSkillStates.forEach((state) => {
        $(`input[name="check_${state.code}"]`).prop('checked', true);
        $(`input[name="skill_${state.code}"][value="${state.level}"]`).prop('checked', true);
    });
}

//프리랜스 닫기 버튼 후 페이지
function modal9() {
	// 프리랜스 닫기 (백그라운드 클릭시 포함)
    $('.btn-close, .btn-popup-cancel, .popup-bg').click(function () {
        $('#dicModal').hide();
        $('#skillModal').hide();
        $('#freeUpdateModal').hide();
        $('#premenModal').hide();
        getList(currentPage, option, keyword);
        return false;
    });
}

//프리랜스 평가의견 등록 모달
function modal10(freelance_id) {
    $('.freeRateModal').show();
    $('.btn-popup-cancel').click(function () {
        $('.freeRateModal').hide();
    });
    $('.btn-popup-check').click(function () {
        if (!$(this).hasClass('processing')) {
            $(this).addClass('processing'); // 중복 클릭 방지
            insertRate(freelance_id);
            $('.freeRateModal').hide();
        }
    });
}



//프리랜스 정보 수정 check
function freeUpdateCheck() {
	        let nameVal = $('input[name="name1"]');
	        let telephoneVal = $('input[name="telephone1"]');
	        let birthdayVal = $('input[name="birthday1"]');
	        let emailVal = $('input[name="email1"]');
	        let locationVal = $('input[name="location1"]');
	        let priceVal = $('input[name="price1"]');
	        let projectVal = $('input[name="project1"]');
		
	        
	        let krPattern = /^[가-힣]*$/; // 한글 가 ~ 힣 정규식
	        let numPattern = /^[0-9]*$/; // 숫자 0~9
			let namePattern = /^([가-힣]{2,10}|[a-zA-Z]{2,20})$/
	        let phoneTelPattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/; // 전화번호 000-0000-0000 형식 정규식
	        let emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/; // 이메일 정규식 아래 참고
			let emailPattern2 = /'[a-z0-9A-Z]+@[a-zA-Z]+\.[a-z]\.[a-z]{2,3}'/;
			let locationPattern = /^[가-힇a-zA-Z0-9]*$/
	        
	        /* 이름~ */
	        if(!nameVal.val()) {
	            alert("이름을 입력하세요");
				nameVal.focus();
	            return false;
	        } else if(nameVal.val().length === 1){
	            alert("이름이 너무 짧습니다");
				nameVal.focus();
	            return false;
	        } else if(!namePattern.test(nameVal.val())) {
	            alert("이름을 한글(10자) 영문(20자) 이내로 입력하세요");
				nameVal.focus();
	            return false;
	        }
	        /* 전화번호~ */
	        if(!telephoneVal.val()) {
	            alert("연락처를 입력하세요");
				telephoneVal.focus();
	            return false;
	        } else if(telephoneVal.val().length > 13) {
	            alert("연락처가 너무 깁니다.");
				telephoneVal.focus();
	            return false;
	        } else if(!phoneTelPattern.test(telephoneVal.val())) {
	            alert("연락처를 확인하세요")
				telephoneVal.focus();
	            return false;
	        } // ??
	        
	        /* 생년월일~ */
	        if(!birthdayVal.val()) {
	            alert("생년월일을 입력하세요");
				birthdayVal.focus();
	            return false;
	        }else {
		        // 현재 날짜를 얻습니다
		        let currentDate = new Date();
		        currentDate.setHours(0, 0, 0, 0); // 오늘의 00:00:00
		
		        // 입력된 날짜를 얻습니다
		        let selectedDate = new Date(birthdayVal.val());
		
		        // 입력된 날짜가 오늘 이전인지 확인합니다
		        if (selectedDate > currentDate) {
		            alert("생년월일을 오늘 이전 날짜로 입력하세요");
		            birthdayVal.focus();
		            return false;
		        }
		    }
	        
	        /* 이메일~ (xxxx @ xxxx . xxx 형식) */
	        if (!emailVal.val()) {
	            alert("이메일 주소를 입력하세요");
				emailVal.focus();
	            return false;
	        } else if(emailVal.val().length < 5) {
	            alert("이메일이 너무 짧습니다");
				emailVal.focus();
	            return false;
	        } else if(!emailPattern.test(emailVal.val())&&!emailPattern2.test(emailVal.val())) {
	            alert("유효한 이메일주소를 입력하세요");
				emailVal.focus();
	            return false;
	        }
	        //위치
			if(!locationVal.val()){
				alert("근무가능위치를 입력하세요 ");
				locationVal.focus();
				return false;
			}else if(locationVal.val().length > 10){
				alert("근무가능위치를 10자 이하로 기입하십시오");
				locationVal.focus();
				return false;
			}else if(!locationPattern.test(locationVal.val())){
				alert("근무가능위치를 다시 확인하세요");
				locationVal.focus();
				return false;
			}
	        /* 채용단가~ */
	        if(!priceVal.val()) {
	            alert("채용단가를 입력하세요");
				priceVal.focus();
	            return false;
	        } else if(!numPattern.test(priceVal.val())) {
	            alert("채용단가는 숫자로만 입력해 주세요");
				priceVal.focus();
	            return false;
	        } else if(priceVal.val().length > 10) {
	            alert("채용단가를 다시 확인하세요");
				priceVal.focus();
	            return false;
	        }
	        
	        /* 당사협업 프로젝트~ */
	        if(projectVal.val().length > 50) {
	            alert("당사협업 프로젝트를 50자 이하로 기입하십시오");
				projectVal.focus();
	            return false;
	        }
	        
	        return true;
}
//프리랜스 스킬수정 check(체크가 하나도 안되어 있는데 수정 하려 하면 false 반환)
function freeSkillUpdateCheck(){
	let checkboxes = $('input[type="checkbox"]');
	
	let anyChecked = false;
	    
    checkboxes.each(function() {
        if (this.checked) {
            anyChecked = true; // 하나 이상의 체크박스가 체크되어 있으면 true로 설정
            return false; // 순회를 중단하려면 false를 반환합니다.
        }
    });
    
    return anyChecked; // 하나 이상의 체크박스가 체크되어 있으면 true를 반환, 그렇지 않으면 false 반환
}
// 새로추가한 프리랜스 경력 유효성검사, 정규표현식 
function freeCareerInsertCheck() {
    // career_hidden 클래스가 적용되지 않은 행만 선택
	
    let rowsToValidate = $('#careerTbody .career_insert');
    let reg_dateVal = $('#registration_date1').text();
	let valid = true;
	
    rowsToValidate.each(function(index) {
        let titleVal = $(this).find('input[name="new_title[]"]');
        let start_dateVal = $(this).find('input[name="new_start_date[]"]');
        let end_dateVal = $(this).find('input[name="new_end_date[]"]');
        let clientVal = $(this).find('input[name="new_client[]"]');
        let commentVal = $(this).find('input[name="new_comment[]"]');

        if (!titleVal.val()) {
            alert("수행프로젝트를 입력하세요");
            titleVal.focus();
            valid = false;
            return false; // 중단
        } else if (titleVal.val().length > 15) {
            alert("수행 프로젝트를 15자 이하로 기입하십시오");
            titleVal.focus();
            valid = false;
            return false; // 중단
        }
        if (!start_dateVal.val()) {
            alert("시작기간을 입력하세요");
            start_dateVal.focus();
            valid = false;
            return false; // 중단
        }else if (start_dateVal.val() > reg_dateVal) {
            alert("시작기간을 등록일 이전 날짜로 입력하세요");
            start_dateVal.focus();
            valid = false;
            return false;
            
        }
        if (!end_dateVal.val()) {
            alert("종료기간을 입력하세요");
            end_dateVal.focus();
            valid = false;
            return false; // 중단
        }
        
        if (isNegativeDuration(start_dateVal.val(), end_dateVal.val())) {
            alert("시작기간과 종료기간을 확인하세요");
            start_dateVal.focus();
            valid = false;
            return false; // 중단
        }
        if (clientVal.val().length > 15) {
            alert("발주처를 15자 이하로 기입하십시오");
            clientVal.focus();
            valid = false;
            return false; // 중단
        }
        if (commentVal.val().length > 50) {
            alert("기타을 50자 이하로 기입하십시오");
            commentVal.focus();
            valid = false;
            return false; // 중단
        }
    });

    return valid;
}

// startdate와 enddate 날짜 계싼하여 false, true 반환
function isNegativeDuration(startDate, endDate) {
	let start = new Date(startDate);
	let end = new Date(endDate);
    
    return end - start < 0;
}

// 기존에 있던 프리랜스 경력 정규표현식 유효성검사
function freeCareerUpdateCheck(){
    let rowsToValidate = $('#careerTbody .career_update');
	let reg_dateVal = $('#registration_date1').text();
    let valid = true;
    
    
    
    rowsToValidate.each(function(index) {
        // index 변수를 문자열로 변환하여 사용
        let titleVal = $(this).find('input[name="title' + index + '"]');
        let start_dateVal = $(this).find('input[name="start_date' + index + '"]');
        let end_dateVal = $(this).find('input[name="end_date' + index + '"]');
        let clientVal = $(this).find('input[name="client' + index + '"]');
        let commentVal = $(this).find('input[name="comment' + index + '"]');
            
        if (!titleVal.val()) {
            alert("수행프로젝트를 입력하세요");
            titleVal.focus();
            valid = false;
            return false; // 중단
        } else if (titleVal.val().length > 15) {
            alert("수행 프로젝트를 15자 이하로 기입하십시오");
            titleVal.focus();
            valid = false;
            return false; // 중단
        }
        if (!start_dateVal.val()) {
            alert("시작기간을 입력하세요");
            start_dateVal.focus();
            valid = false;
            return false; // 중단
        }else if (start_dateVal.val() > reg_dateVal) {
            alert("시작기간을 등록일 이전 날짜로 입력하세요");
            start_dateVal.focus();
            valid = false;
            return false;
            
        }
	        // 현재 날짜를 얻습니다
	        
        if (!end_dateVal.val()) {
            alert("종료기간을 입력하세요");
            end_dateVal.focus();
            valid = false;
            return false; // 중단
        }else if (end_dateVal.val() > reg_dateVal) {
            alert("종료기간을 등록일 이전 날짜로 입력하세요");
            end_dateVal.focus();
            valid = false;
            return false;
            
        }
        if (isNegativeDuration(start_dateVal.val(), end_dateVal.val())) {
            alert("시작기간과 종료기간을 확인하세요");
            start_dateVal.focus();
            valid = false;
            return false; // 중단
        }
        if (clientVal.val().length > 15) {
            alert("발주처를 15자 이하로 기입하십시오");
            clientVal.focus();
            valid = false;
            return false; // 중단
        }
        if (commentVal.val().length > 10) {
            alert("기타을 10자 이하로 기입하십시오");
            commentVal.focus();
            valid = false;
            return false; // 중단
        }
    });
    return valid;
}

// 프리랜스 평가의견 check
function evaluationCheck(){
	let evaluation = $('input[name="free_evaluation"]').val();
	if(!evaluation){
		alert("평가의견을 입력해주세요"); 
		return false;
	}else if(evaluation.length>50){
		alert("평가의견을 50자 이하로 기입해주세요");
		return false;
	}
	return true;
}

//yyyy-mm-dd를 date형식으로 변환
function convertToDate(date) {
    var parts = dateString.split('-');
    var date = new Date(parts[0], parts[1] - 1, parts[2]);
    return date;
}

function free_validation(){
	let birthdayField = $("#birthday1");
	let registrationField = $('#registration_date1');
	let career_update = $('#careerTbody .career_update');
	let career_insert = $('#careerTbody .career_insert');
    birthdayField.attr("max", registrationField.text());
    
	career_update.each(function(index) {
		let startdayField = $(this).find('input[name="start_date' + index + '"]');
		let enddayField = $(this).find('input[name="end_date'+ index +'"]');
	
		startdayField.attr("min", birthdayField.val());
		startdayField.attr("max", registrationField.text());
		enddayField.attr("min", startdayField.val());
	})
	career_insert.each(function(index) {
		let newStartdayField = $(this).find('input[name="new_start_date[]"]');
		let newEnddayField = $(this).find('input[name="new_end_date[]"]');
		
		newStartdayField.attr("min", birthdayField.val());
		newStartdayField.attr("max", registrationField.text());
		newEnddayField.attr("min", newStartdayField.val());
	})
	
}
//사진 미리보기
function showFreeProfileImg(){
	let profileImgData = $('#mainPro').val();
	sampleImageFreeS(); // rtw
    
    if(profileImgData != null && profileImgData != ""){
		let callPath = location.protocol + '//' + location.host + '/' + profileImgData;

		let img = $('<img id="free_callProfile" src="'+ callPath +'" onerror="this.src=\'/resources/img/common/error-img-sample.png\'"><input type="hidden" id="free_path_img" name="path1" value="'+profileImgData+'"/>');
		$('.free_profile_sample_image').remove(); // rtw
		$('#profile_Area_free1').append(img);
    }

}

// 프리랜스 사진 미리보기
function imgFile_free1(e){
	$('.free_profile_sample_image').remove(); // rtw
	$('#free_profile_Img').remove();
	$('#free_callProfile').remove();
//	$('#free_path_img').remove();
	var files = e.target.files;
	var filesArr = Array.prototype.slice.call(files);
	
	filesArr.forEach(function(f){
		
		/*확장자검사*/
		if(!f.type.match('image.*')){
			alert('이미지파일만 업로드 가능합니다.');
			return;
		}
		
		sel_file = f;
		
		var reader = new FileReader();
		reader.onload = function(e){
			var img = $('<img id="free_profile_Img" alt="사용자 이미지">');
			$('#profile_Area_free1').append(img);
			$('#free_profile_Img').attr("src", e.target.result);
		}
		reader.readAsDataURL(f);
	});
}
/* 프사 기본 사진 _rtw */
function sampleImageFreeS() {
	var sampleImgFree = $('<img class="free_profile_sample_image" src="/resources/img/common/sample-img.png">');
	$('.sample_ImgF').append(sampleImgFree);
}