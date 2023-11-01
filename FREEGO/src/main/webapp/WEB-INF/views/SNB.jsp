<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<link rel="stylesheet" type="text/css" href="<c:url value='/resources/css/profile.css'/>">
<script src="<c:url value='/resources/js/password.js'/>"></script>

<%-- <script src="<c:url value='/resources/js/webSocket.js'/>"></script> --%>

        <input style="display:none" aria-hidden="true">
        <input type="password" style="display:none" aria-hidden="true">
        <div class="lnb-wrap">
            <div class="lnb-top-cont">
                <h1><a href='<c:url value="/FREEGO/free/list"/>' title="홈으로가기">FREE-GO<br>프리랜스관리 시스템</a></h1>
                <!-- <h1><a href="javascript:void(0)" title="홈으로가기"><img src="../img/common/logo.png" alt="홈바로가기"></a></h1> -->
                <a href="javascript:void(0)" title="메뉴" class="menu-btn menubar"></a>
            </div>
            <div class="lnb-profile">
                <div class="lnb-profile-img">
                    <div id="side_profile" class="side_prof_img">
                		<input type="hidden" id="sidepro" name="profile_photo" value="${member.profile_photo}">
                	</div>
                    <div class="lnb-profile-txt">
                        <ul>
                            <li>
                                ${member.department_code}
                            </li>
                            <c:if test="${ member.authority_type_code eq 'SYSAD'}">
                                <li><p style="color: red; font: bold; font-size: 12px;">시스템 관리자</p></li>
                            </c:if>
                            <li>${member.name}
                            	<span>${member.position_code}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="lnb-profile-btn-box">
                    <ul>
                        <li><a href="/logout.do" title="로그아웃" onclick="return confirm('로그아웃 하시겠습니까?');">로그아웃</a></li>
                        <li><a href="javascript:void(0)" title="패스워드변경" class="pw-change">패스워드변경</a></li>
                    </ul>
                </div>
                <div class="lnb-profile-search-input">
                    <input type="text" placeholder="프리랜스 통합검색" name="searchInput" id="searchInput">
                    <label for="" class="hide">프리랜스 통합검색</label>
                    <a href="javascript:void(0)" title="검색" class="btn-search2" id="searchButton"></a> 
                </div>
            </div>
            <div class="lnb-menu-wrap" style="overflow-y: auto;">
                <div class="lnb-menu" id="expandable-menu">
                    <ul>
                    	
                         <li> 
                             <a href="javascript:void(0)" title="프린랜스 정보" class="lnb-dep1">프리랜스 관리</a> 
                             <ul class="lnb-dep2"> 
                            	<li><a href='<c:url value="/FREEGO/free/list"/>' title="프리랜스 리스트" class="" id="freeList_btn">프리랜스 리스트</a></li>
                                <li><a href='<c:url value="/FREEGO/free/status"/>' title="프리랜스 기술현황" class="" id="free_btn">프리랜스 기술현황</a></li>
                             </ul> 
                         </li>
                        <li>
                            <a href="javascript:void(0)" title="시스템관리" class="lnb-dep1 SYSAD">시스템관리</a>
                            <ul class="lnb-dep2">
                                <li><a href='<c:url value="/FREEGO/system/code"/>' title="공통코드 관리" class="">공통코드 관리</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="lnb-footer">
                <p class="fs26 fw800">FREE-GO</p>
                <p>ⓒ2023 FREE-GO CO. Ltd. All Rights Reserved.</p>
            </div>
        </div>
        
        <!--비밀번호 변경 popup-->
        <div id="pwModal" class="popup-wrap" style="display: none">
            <div class="popup-bg"></div>
            <div class="popup-container" id="passwordChange">
                <div class="popup-header">
                    <h4>비밀번호 변경</h4>
                    <a href="javascript:void(0)" title="닫기" class="btn-close"></a>
                </div>
                <div class="popup-contents-wrap">
                    <div class="popup-cont">
                    <p class="desc1">*비밀번호 변경 시 8자리 이상 특수문자를 포함하여 설정해 주시기 바랍니다.</p>
                    <form id="password_form">
                    <table class="table-type02">
                        <caption>비밀번호 변경 테이블</caption>
                        <colgroup>
                            <col class="wp30">
                            <col class="wauto">
                        </colgroup>
                        <tr>
                            <th>사번</th>
                            <td>${member.employee_number}</td>
                        </tr>
                        <tr>
                            <th>이름</th>
                            <td>${member.name}</td>
                        </tr>
                        <tr>
                            <th>현재 패스워드</th>
                            <td>
                                <input type="password" class="w300" name="password" id="password" maxlength="63">
                                <label for="" class="hide">현재 패스워드</label>
                            </td>
                        </tr>
                        <tr>
                            <th>변경 패스워드</th>
                            <td>
                                <input type="password" class="w300" name="passwordCh" id="passwordCh" maxlength="63">
                                <label for="" class="hide">변경 패스워드</label>
                            </td>
                        </tr>
                        <tr>
                            <th>변경 패스워드 확인</th>
                            <td>
                                <input type="password" class="w300" name="passwordChCk" id="passwordChCk" maxlength="63">
                                <label for="" class="hide">변경 패스워드 확인</label>
                            </td>
                        </tr>
                    </table>
                    </form>
                    <p class="desc2"><span>!</span>비밀번호는 8자리 이상특수문자를 포함하여 설정해주시기 바랍니다.</p>
                    </div>
                    <div class="popup-btn-wrap">
                        <ul>
                            <li>
                                <a href="javascript:void(0)" title="취소" class="btn-popup-cancel" id="btn-password-change-cancel">취소</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)" title="변경" class="btn-popup-change" id="btn-password-change">변경</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div><!--//비밀번호 변경 popup-wrap-->