<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<link rel="stylesheet" type="text/css" href="<c:url value='/resources/css/freelance_new_pop.css'/>">
<!-- ** 프리랜서 신규등록 ** -->
<!-- 성명(텍스트), 경력, 등록일(date), 연락처(텍스트), 나이, 성별, Email(텍스트), 근무가능지역(), 채용단가(), 전문분야(), 진행 중 협업프로젝트 -->
<div id="fnModal" class="popup-wrap" style="display: none">
	<div class="popup-bg"></div>
	<div class="popup-fncontainer">
        <div class="popup-header">
        	<h4>프리랜서 신규 등록</h4>
        	<a title="닫기" class="btn-close"></a>
        </div>
		<div class="popup-contents-wrap-cus">
		<h4 class="lil-title"> 인적사항</h4>
		<div class="info-tx ">* 표시는 필수입력 사항입니다.</div>
			<form method="post" id="freelanceRegist">
				<div class="popup-cont">
					<div class="popup-fnprofile">
						<div class="ta-c-cus" id="profile-wrap">
        					<div id="fn_Image" class="sample-bg">
        					</div>
							<div class="image-editbox"> <!-- 없음 -->
								<a href="javascript:void(0)" title="사진첨부" id="fn_image_sel" class="image-add-btn" onerror="this.src='/resources/img/common/sample-img.png'">사진첨부</a>
        						<input type="file" id="fn_Upload_Image" name="sendImage" accept="image/*" style="display: none;">
							</div>
        				</div>
						<table class="tihs">
							<tbody>
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
										<input type="text" class=" name" id="name" maxlength="20" placeholder=" 성명">
									</td>
									<th>경력</th>
										<td class="flmf">[프로젝트 최초 참여기간으로부터 산출될 것입니다]</td>
									<th>등록일</th>
									<td class="flmf">
										[신규등록과 동시에 기록됩니다]
									</td>
								</tr>
								<tr>
									<th>* 연락처</th>
									<td>
										<input type="text" class="telephone" id="telephone" maxlength="13" placeholder="번호만 입력">
									</td>
									<th>* 생년월일</th>
									<td>
										<input type="date" id="birthday" class="birthday"></input>
									</td>
									<th>* 성별</th>
									<td><select id="gender" class="">
											<option value="0">남</option>
											<option value="1">여</option>
									</select></td>
								</tr>
								<tr>
									<th>* Email</th>
									<td>
		                                <input type="text" class="email" id="email" maxlength="28" placeholder=" ~ @xxxx.xxx">
	                                </td>
									<th>* 근무가능지역</th>
									<td>
										<input type="text" class="location" id="location" maxlength="9">
									</td>
									<th>* 채용단가(원)</th>
									<td>
	                               		<input type="text" class="w100 price" id="price" maxlength="9" placeholder="예) 1800000">  원
	                               	</td>
								</tr>
								<tr>
									<th>기술등급</th>
									<td>
										<p class="flmf">[경력을 기준으로 산출될 것입니다]</p>
									</td>
									<th>* 전문분야</th>
									<td class="exse">
	                                    <input type="text" class="exse-search diskills skill8" readonly="readonly" title="전문분야 선택" placeholder="전문분야 선택">
	                                    <input type="hidden">
	                                    <a href="#" title="검색" class="btn-sear exse-search"></a>
	                                </td>
								</tr>
								<tr>
									<th>진행 중 프로젝트</th>
									<td colspan="5">
										<input type="text" class="with_text" id="project" maxlength="50" placeholder=" 진행 중 프로젝트">
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="title-line">
						<h4 class="lil-title"> 프로젝트 수행 경력</h4>
						<div id = 'btn-add-row' class="add-btn-plus">
							<span></span>
							<span></span>
						</div>
					</div>
					<table class="table-type02 mg-b20 myTable" id="test">
						<caption>자격증 내용</caption>
						<colgroup>
							<col class="del-no">
							<col class="w140">
							<col class="w40">
							<col class="w40">
							<col class="w115">
							<col class="w100">
							<col class="w150">
							<col class="del-x">
						</colgroup>
						<tr>
							<th>No.</th>
							<th>수행프로젝트</th>
							<th>참여기간</th>
							<th>종료기간</th>
							<th>발주처</th>
							<th>담당작업</th>
							<th>기타사항</th>
							<th></th>
						</tr>
						<tbody id="adr" class="addedRow">
							<tr class="insert_tr">
								<td>1</td>
								<td>
	                                <input type="text" id="title" maxlength="30" class="title" placeholder="수행 프로젝트 명">
	                            </td>
								<td>
									<input type="date" id="start_date" class="std" min="1800-12-01" max="9999-12-31">
	                            </td>
	                            <td>
	                            	<input type="date" id="end_date" class="end" min="1800-12-01" max="9999-12-31">
	                            </td>
								<td>
	                            	<input type="text" id="client" maxlength="28" class="client">
	                            </td>
								<td>
	                                <select id="task" class="task">
	                                	
	                                </select>
	                            </td>
								<td>
	                                <input type="text" id="comment" maxlength="100" class="comment">
	                            </td>
	                            <td>
	                            </td>
							</tr>
						</tbody>
					</table>
					<br>
				</div>
				<div class="popup-btn-wrap">
					<ul>
						<li>
                          	<a href="#" title="취소" class="btn-popup-cancel xxo">취소</a>
                        </li>
						<li>
                        	<a href="#" title="프리랜서 신규등록" class="btn-popup-change conditions xxo" id="insertButton">프리랜서 신규등록</a>
                        </li>
					</ul>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- //프리랜서 신규등록 팝업 -->
<!-- ** 전문분야 선택 팝업 ** -->
<div id="insertExprtModal" class="popup-wrap exprtModal" style="display: none">
    <div class="popup-bg"></div>
    <div class="popup-container">
        <div class="popup-header">
            <h4>전문분야 검색</h4>
            <a title="닫기" class="insert_skill_cancel add-sel-skill"></a>
        </div>
        <div class="popup-contents-wrap">
            <div class="popup-cont">
                <div class="scroll_table_wrap" id="insert_skill_list">
                </div>
				<div class="popup-btn-wrap">
				    <ul>
				        <li>
				            <a href="#" title="취소" class="insert_skill_cancel Cbtn" id="insert_skill_cancel">취소</a>
				        </li>
				        <li>
				            <a href="#" title="적용" class="free_skill_update" id="insert_skill">적용</a>
				        </li>
				    </ul>
				</div>
            </div>
        </div>
    </div>
</div>
<!-- //전문분야 선택 팝업 -->