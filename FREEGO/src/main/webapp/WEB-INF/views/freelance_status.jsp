
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"  import="java.sql.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html lang="en" class="no-js">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <title>H-Smart PMS</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="Content-Script-Type" content="text/javascript" />
    <meta http-equiv="Content-Style-Type" content="text/css" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <link rel="stylesheet" type="text/css" href="<c:url value='/resources/css/import.css'/>">
    <link rel="stylesheet" type="text/css" href="<c:url value='/resources/css/freelance.css'/>">
    <script src="<c:url value='/resources/js/jquery-1.9.1.js'/>"></script>
    <script src="<c:url value='/resources/js/script.js'/>"></script>
    <script src="<c:url value='/resources/js/freelance.js'/>"></script>
    <script src="<c:url value='/resources/js/freelance_register.js'/>"></script>
    
    
</head>

<body>
    <div class="sub-main-wrap">
       <%@ include file="./SNB.jsp" %>
       <div class="sub-container-wrap prl-mgm">
            <div class="container-wrap">
                <div class="sub-tab-wrap">
                   <div class="sub-tab">
                        <ul class="tab-box" id="tab">
                            <li>
                                <a href='<c:url value='/FREEGO/free/list'/>' title="프리랜스 리스트">프리랜스 리스트</a>
                            </li>
                            <li class="on">
                            	<a href='<c:url value='/FREEGO/free/status'/>' title="프리랜스 기술현황">프리랜스 기술현황</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <section class="tab-cont-wrap">
                    <div class="container tab-cont01" style="display: block">
                        <div class="sub-title top-btn-wrap">
                            <h2>프리랜스 기술현황</h2>
                        </div>
                        <p>※숫자를 클릭하면 상세 리스트를 볼 수 있습니다.<br>※프리랜스 인원 당 다수의 스킬을 가지고 있어 인력풀 등록 인원수와 기술인력 합계의 합은 다를 수 있습니다.</p>
                        <div class="table-btn-wrap">
                            <a href="#" class="table-btn btn-modal-open" title="프리랜스 신규 등록">프리랜스 신규 등록</a>
                        </div>  
                        <div class="col col-1">
                            <div class="table-wrap">
                                <table class="table-type01" id="free_status_table">
                                    <caption>프리랜스 현황 테이블</caption>
                                    <colgroup>
                                        <col class="wp10">
                                        <col class="wp15">
                                        <col class="wp10">
                                        <col class="wp10">
                                        <col class="wp10">
                                        <col class="wp10">
                                    </colgroup>
                                    <thead>
                                        <th>스킬분야</th>
                                        <th>구분</th>
                                        <th>기술레벨(상)</th>
                                        <th>기술레벨(중)</th>
                                        <th>기술레벨(하)</th>
                                        <th>기술인력 합계</th>
                                    </thead>
                                    <tbody>
                                    	<c:forEach items="${skillList}" var="item">
                                    	</c:forEach>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div><!--//tab-cont01-->
                </section><!--//tab-cont-wrap-->
            </div>
            <footer>
                <div class="sub-footer">
                    <p></p>
                    <p>시스템관리자</p>
                    <p>mss3662352@naver.com <span class="red fs13">(수정할 수 없는 항목에 오류가 있는 경우는 시스템 관리자에게 메일로 수정 요청을 해주시기 바랍니다.)</span></p>   
                </div>
            </footer>
        </div><!--//sub-container-wrap-->
        <!--비밀번호 변경 popup-->
        <div id="pwModal" class="popup-wrap" style="display: none">
            <div class="popup-bg"></div>
            <div class="popup-container">
                <div class="popup-header">
                    <h4>비밀번호 변경</h4>
                    <a href="#" title="닫기" class="btn-close"></a>
                </div>
                <div class="popup-contents-wrap">
                    <div class="popup-cont">
                    <p class="desc1">*비밀번호 변경 시 8자리 이상 특수문자를 포함하여 설정해 주시기 바랍니다.</p>
                    <table class="table-type02">
                        <caption>비밀번호 변경 테이블</caption>
                        <colgroup>
                            <col class="wp30">
                            <col class="wauto">
                        </colgroup>
                        <tr>
                            <th>사번</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>이름</th>
                            <td>홍길동</td>
                        </tr>
                        <tr>
                            <th>현재 패스워드</th>
                            <td>
                                <input type="password" class="w300" name="" id="">
                                <label for="" class="hide">현재 패스워드</label>
                            </td>
                        </tr>
                        <tr>
                            <th>변경 패스워드</th>
                            <td>
                                <input type="password" class="w300" name="" id="">
                                <label for="" class="hide">변경 패스워드</label>
                            </td>
                        </tr>
                        <tr>
                            <th>변경 패스워드 확인</th>
                            <td>
                                <input type="password" class="w300" name="" id="">
                                <label for="" class="hide">변경 패스워드 확인</label>
                            </td>
                        </tr>
                    </table>
                    <p class="desc2"><span>!</span>비밀번호는 8자리 이상특수문자를 포함하여 설정해주시기 바랍니다.</p>
                    </div>
                    <div class="popup-btn-wrap">
                        <ul>
                            <li>
                                <a href="#" title="취소" class="btn-popup-cancel">취소</a>
                            </li>
                            <li>
                                <a href="#" title="변경" class="btn-popup-change">변경</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div><!--//비밀번호 변경 popup-wrap-->
        <!--프리랜스 등록인원 상세정보 popup-->
        <div id="premenModal" class="popup-wrap" style="display:none">
            <div class="popup-bg"></div>
            <div class="popup-container w800">
                <div class="popup-header">
                    <h4>프리랜스 등록인원 상세정보 팝업</h4>
                    <a href="#" title="닫기" class="btn-close"></a>
                </div>
                <div class="popup-contents-table-wrap">
                    <div class="popup-cont">
                    	<div class="scrollable-table" style ="border-top: 2px solid #1fabf2">
	                        <table class="table-type01">
	                            <caption>프리랜스 등록인원 상세정보 팝업 테이블</caption>
	                            <colgroup>
	                                <col class="wp5">
	                                <col class="wp25">
	                                <col class="wp15">
	                                <col class="wp15">
	                                <col class="wp25">
	                                <col class="wp20">
	                            </colgroup>
	                            <thead class="freelance_pop">
	                            <tr>
	                            	<th>No</th>
	                                <th>전문분야</th>
	                                <th>기술등급</th>
	                                <th>이름</th>
	                                <th>연락처</th>
	                                <th>이메일</th>
	                            </tr>
	                            </thead>
	                            <tbody class="freeSkillDetail">
	                                
	                            </tbody>
	                        </table> 
	                	</div>
	                    <div class="popup-btn-wrap">
	                        <ul>
	                            <li>
	                                <a href="#" title="취소" class="btn-popup-cancel">닫기</a>
	                            </li>
	                        </ul>
	                    </div>
                    </div>
                </div>
            </div>
        </div><!--//프리랜스 등록인원 상세정보 popup-wrap-->
        <!-- 프리랜서 신규등록 -->
		<%@ include file="./freelance_insert.jsp" %>
    </div><!--//sub-main-wrap-->
</body>
</html>
