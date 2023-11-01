
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
    <link rel="stylesheet" type="text/css" href="<c:url value='/resources/css/freelance_update.css'/>">
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
                            <li class="on">
                            	<a href='<c:url value='/FREEGO/free/list'/>' title="프리랜스 리스트">프리랜스 리스트</a>
                            </li>
                            <li>
                                <a href='<c:url value='/FREEGO/free/status'/>' title="프리랜스 기술현황">프리랜스 기술현황</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <section class="tab-cont-wrap">
                    <div class="container tab-cont02" style="display: block">
                        <div class="sub-title top-btn-wrap">
                            <h2>프리랜스 리스트</h2>
                            <div class="box-sum">프리랜서 인력풀 등록 인원수 :<span id="freelancer_num"></span></div>
                        </div>
                        <div class="top-cont">
                            <div class="search-wrap free-search">
                                <div class="search-box">
                                    <ul>
                                        <li>
                                            <select name="free_search_option" id="free_search_option" class="w120">
                                                <option value="A" ${ph.sc.option=="A" || ph.sc.option=="" ? "selected" : ""}>전체</option>
                                                <option value="N" ${ph.sc.option=="N" ? "selected" : ""}>이름</option>
                                                <option value="S" ${ph.sc.option=="S" ? "selected" : ""}>전문분야</option>
                                                <option value="C" ${ph.sc.option=="C" ? "selected" : ""}>경력</option>
                                                <option value="G" ${ph.sc.option=="G" ? "selected" : ""}>등급</option>
                                                <option value="P" ${ph.sc.option=="P" ? "selected" : ""}>프로젝트</option>
                                                <option value="E" ${ph.sc.option=="E" ? "selected" : ""}>기타</option>
                                            </select>
                                        </li>
                                        <li>
                                            <input type="text" name="free_search_bar" id="free_search_bar" placeholder="프리랜스 검색" class="w350">
                                            <label for="" class="hide">프리랜스 검색창</label>
                                        </li>
                                    </ul>
                                </div>
                                <div class="search-btn">
                                    <ul>
                                        <li><a href="#" title="조회" class="btn-search">조회</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div><!--//top-cont-->
                        <p>※전문분야를 클릭하면 상세 전문분야를 볼 수 있습니다.<br>※프리랜스와 업무협업 경험이 있는 임직원께서는 반드시 평가의견을 등록하여 향후 프로젝트 추진 시 정보가 공유될 수 있도록 협조 바랍니다.</p>
                        <div class="table-btn-wrap table-btn-wrap-list">
                            <a href="#" class="table-btn btn-modal-open" title="프리랜스 신규 등록">프리랜스 신규 등록</a>
                        </div>  
                        <div class="col col-1">
                            <div class="table-wrap">
                                <table class="table-type01">
                                    <caption>프리랜스 리스트 테이블</caption>
                                    <colgroup>
                                        <col class="wp4">
                                        <col class="wp10">
                                        <col class="wp13">
                                        <col class="wp16">
                                        <col class="wp10">
                                        <col class="wp10">
                                        <col class="wp10">
                                        <col class="wp10">
                                        <col class="wp13">
                                    </colgroup>
                                    <thead>
                                        <th>No</th>
                                        <th>이름</th>
                                        <th>연락처</th>
                                        <th>이메일</th>
                                        <th>전문분야</th>
                                        <th>경력</th>
                                        <th>경력등급</th>
                                        <th>평가의견</th>
                                        <th>관리</th>
                                    </thead>
                                    <tbody class="free_list">
                                    <!-- 프리랜스 리스트 -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="free-paging-btn"></div>
                    </div><!--//tab-cont02-->
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
        <!--프리랜스 평가의견 보기/등록 popup-->
        <div id="dicModal"class="popup-wrap dicModal" style="display:none">
            <div class="popup-bg"></div>
            <div class="popup-container w1000">
                <div class="popup-header">
                    <h4>프리랜스 평가의견 보기/등록</h4>
                    <a href="#" title="닫기" class="btn-close"></a>
                </div>
                <div class="popup-contents-table-wrap">
                    <div class="popup-cont">
                    	<h5 class="rate_name">ㅇㅇㅇ</h5>
                    	<div class="scrollable-table">
	                        <table class="table-type01 free_rateList_table">
	                            <caption>프리랜스 평가의견 보기/등록 테이블</caption>
	                            <colgroup class="free_rate_table">
	                                <col class="wp5">
	                                <col class="wp70">
	                                <col class="wp10">
	                                <col class="wp15">
	                            </colgroup>
	                            <thead>
	                                <th>No</th>
	                                <th>평가의견</th>
	                                <th>평가일자</th>
	                                <th>평가자</th>
	                            </thead>
	                            <tbody class="free_rateList">
	                            </tbody>
	                        </table>
	                    </div>
	                    <div class="scrollable-table">
	                        <table class="table-type01 free_rateList_input_table">
	                            <caption>프리랜스 평가의견 보기/등록 테이블</caption>
	                            <colgroup class="free_rate_table">
	                                <col class="wp5">
	                                <col class="wp70">
	                                <col class="wp10">
	                                <col class="wp15">
	                            </colgroup>
	                            <tbody class="free_rateList_input">
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
        </div><!--//프리랜스 평가의견 보기/등록 popup-wrap-->
        <!--프리랜스 평가의견 등록 레이어 popup-->
        <div id="enroModal" class="popup-wrap freeRateModal" style="display: none">
            <div class="popup-bg"></div>
            <div class="popup-container">
                <div class="popup-header">
                    <h4>안내</h4>
                    <a href="#" title="닫기" class="btn-close"></a>
                </div>
                <div class="popup-contents-wrap">
                    <div class="popup-cont">
                        <p><span>!</span>프리랜스에 대한 평가의견을<br/>등록하시겠습니까?</p> 
                    <div class="popup-btn-wrap">
                        <ul>
                            <li>
                                <a href="#" title="취소" class="btn-popup-cancel">취소</a>
                            </li>
                            <li>
                                <a href="#" title="확인" class="btn-popup-check">확인</a>
                            </li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
        </div><!--//프리랜스 평가의견 등록 레이어 popup-wrap-->
		<%@ include file="./freelance_insert.jsp" %>
		<%@ include file="./freelance_update.jsp" %>
        <!--프리랜스 전문분야 상세정보 popup-->
        <div id="skillModal" class="popup-wrap" style="display:none">
            <div class="popup-bg"></div>
            <div class="popup-container">
                <div class="popup-header">
                    <h4>프리랜스 전문분야 상세정보 팝업</h4>
                    <a href="#" title="닫기" class="btn-close"></a>
                </div>
                <div class="popup-contents-table-wrap">
                    <div class="popup-cont">
                        <table class="table-type01">
                            <caption>프리랜스 스킬 상세정보 팝업 테이블</caption>
                            <colgroup>
                                <col class="wp5">
                                <col class="wp10">
                                <col class="wp10">
                                <col class="wp5">
                            </colgroup>
                            <thead>
                                <th>No</th>
                                <th>이름</th>
                                <th>전문분야</th>
                                <th>기술등급</th>
                            </thead>
                            <tbody class="skillListTbody">
                            </tbody>
                        </table> 
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
        </div><!--//프리랜스 스킬 상세정보 popup-wrap-->
    </div><!--//sub-main-wrap-->
</body>
</html>
