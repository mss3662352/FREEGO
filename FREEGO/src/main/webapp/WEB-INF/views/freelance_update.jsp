<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<link rel="stylesheet" type="text/css" href="<c:url value='/resources/css/freelance_update.css'/>">
<link rel="stylesheet" type="text/css" href="<c:url value='/resources/css/profile.css'/>">
<link rel="stylesheet" type="text/css" href="<c:url value='/resources/css/loadingPage.css'/>">
<!-- ** 프리랜서 정보수정 ** -->
<!-- 성명(텍스트), 경력, 등록일(date), 연락처(텍스트), 나이, 성별, Email(텍스트), 근무가능지역(), 채용단가(), 전문분야(), 진행중 프로젝트 -->
<div id="freeUpdateModal" class="popup-flwrap" style="display: none">
	<div class="popup-flcontainer">
		<div class="popup-flheader">
			<h4>프리랜스 정보 수정</h4>
			<a href="#" title="닫기" class="btn-close"></a>
		</div>
		<div class="popup-flcontents-wrap">
			<div class="popup-flcont">
	            <h4>인적사항</h4>
	            <div class="info-tx2">* 표시는 필수입력 사항입니다.</div>
	            <div class="popup-flprofile">
	                <div class="ta-c" id="profile-wrap">
	                    <div class="image-add-wrap">
                           <div id="profile_Area_free1" class="sample_ImgF"></div>
                           <div class="image-editbox">
                               <a href="javascript:void(0)" title="사진첨부" class="image-add-btn" id="add_freeImg">사진첨부</a>
                               <input type="file" id="uploadFile_FREE" name="profileUpload" style="display: none;">
                               <input type="hidden" id="mainPro" name="path1">
                           </div>
                       </div>
	                </div>
					<table class="table-type02 w1000">
                            <caption>프로필 내용</caption>
                            <colgroup>
                                <col class="w120">
                                <col class="w180">
                                <col class="w120">
                                <col class="w180">
                                <col class="w120">
                                <col class="w180">
                            </colgroup>
							<tr>
                                <th>* 성명</th>
                                <td>
                                    <label for="name1" class="hidden"></label>
                                    <input type="text" id="name1" name="name1" maxlength="20" placeholder=" 성명">
                                </td>
                                <th>경력</th>
                                <td>
                                    <label for="" class="hidden"></label>
                                    <p id="career1"></p>
                                </td>
                                <th>등록일</th>
                                <td>
                                    <label for="" class="hidden"></label>
                                    <p id="registration_date1"></p>
                                </td>
                            </tr>
							<tr>
                                <th>* 연락처</th>
                                <td>
                                    <label for="" class="hidden"></label>
                                    <input type="text" id="telephone1" name="telephone1" maxlength="13" placeholder=" - 하이폰 포함">
                                </td>
                                <th>* 생년월일</th>
                                <td>
                                    <label for="" class="hidden"></label>
                                    <input type="date" class="free_validation" id="birthday1" name="birthday1">
                                </td>
                                <th>* 성별</th>
                                <td>
                                    <select name="gender1" id="gender1">
                                        <option value="0">남</option>
                                        <option value="1">여</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>* Email</th>
                                <td>
                                    <label for="email1" class="hidden"></label>
                                    <input type="text" id="email1" name="email1" maxlength="28">
                                </td>
                                <th>* 근무가능지역</th>
                                <td>
                                    <label for="lacation1" class="hidden"></label>
                                    <input type="text" id="location1" name="location1" maxlength="9">
                                </td>
                                <th>* 채용단가</th>
                                <td>
                                    <label for="price1" class="hidden"></label>
                                    <input type="text" id="price1" name="price1" class="wp50 ta-r" maxlength="9">&nbsp;&nbsp;&nbsp;<span>원</span>
                                </td>
                            </tr>
                            <tr>
                          		<th>경력등급</th>
                                <td>
                                    <p class="fs14" id="grade1"></p>
                                </td>
                           		<th>* 전문분야</th>
                                <td class="exprt">
                                    <input type="text" name="" id="skill1" readonly="readonly" style="caret-color: transparent;">
                                    <label for="" class="hide">전문분야</label>
                                    <a href="#" title="검색" class="btn-search2 exprt-search" id="exprt-search"></a>
                                </td>
                                <td colspan="2">
                                </td>
                            </tr>
                            <tr>
	                            <th class="h50">진행 중 프로젝트</th>
								<td colspan="5">
									<label for="project1" class="hidden"></label>
	                                <input type="text" id="project1" name="project1" maxlength="50">
	                            </td>
                            </tr>
						</tbody>
					</table>
				</div>
				<div class="project_career">
					<h4>프로젝트 수행 경력</h4>
					<div class="add-btn-update" id="add-btn-update">
						<span></span>
						<span></span>
					</div>
				</div>
				<table class="table-type02 ta-c" id="free_career_table">
					<caption>자격증 내용</caption>
					<colgroup>
						<col class="w120">
						<col class="w40">
						<col class="w40">
						<col class="w100">
						<col class="w80">
						<col class="w180">
						<col class="w70">
					</colgroup>
					<thead>
						<th>수행프로젝트</th>
						<th>시작기간</th>
						<th>종료기간</th>
						<th>발주처</th>
						<th>담당업무</th>
						<th>기타</th>
						<th>관리</th>
					</thead>
					<tbody id="careerTbody">
		        	</tbody>
				</table>
			</div>
			<div class="popup-btn-wrap">
				<ul>
					<li>
                    	<a href="#" title="취소" class="btn-popup-cancel">취소</a>
                    </li>
					<li>
                        <a href="#" title="수정" class="btn-popup-change" id="udpateButton">수정</a>
                    </li>
				</ul>
			</div>
		</div>
	</div>
</div>
<!-- // 프리랜서 신규등록 팝업 -->
<!--전문분야 레이어 popup-->
<div id="freeExprtModal" class="popup-wrap exprtModal" style="display: none">
    <div class="popup-bg"></div>
    <div class="popup-container">
        <div class="popup-header">
            <h4>프리랜스 전문분야 수정</h4>
            <a href="#" title="닫기" class="btn-close" id="free_skill_close"></a>
        </div>
        <div class="popup-contents-wrap">
            <div class="popup-cont">
                <div class="scroll_table_wrap" id="free_skill_list">
                	
                </div>
				<div class="popup-btn-wrap">
				    <ul>
				        <li>
				            <a href="#" title="취소" class="free_skill_cancel" id="free_skill_cancel">취소</a>
				        </li>
				        <li>
				            <a href="#" title="수정" class="free_skill_update" id="free_skill_update">수정</a>
				        </li>
				    </ul>
				</div>
            </div>
        </div>
    </div>
</div><!--//전문분야 레이어 popup-wrap-->
<div id="loading_page">
   	<div class="img">
   		<img src="/resources/img/loading/loading.gif">
   	</div>
   	<div class="text">.</div>
</div>