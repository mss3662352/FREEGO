<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
    <link rel="stylesheet" type="text/css" href="<c:url value='/resources/css/loadingPage.css'/>">
    <script src="<c:url value='/resources/js/jquery-1.9.1.js'/>"></script>
    <script src="<c:url value='/resources/js/script.js'/>"></script>
    <script src="<c:url value='/resources/js/login.js'/>"></script>
    <script src="<c:url value='/resources/js/freelance_register.js'/>"></script>
</head>

	<body>
	    <div class="login-wrap">
	        <div class="login-box">
	            <div class="login-content">
	                <div class="left-box">
	                    <h1>FREE-GO<br>프리랜스 관리시스템</h1>
	                    <div class="login-bg">
	                        <img src="<c:url value='/resources/img/main/login-bg.png'/>" class="logo" alt="로그인 배경 이미지">
	                    </div>
	                </div>
	                <div class="right-box">
	                    <h2>로그인</h2>
	                    <div class="login">
	                        <!-- <input type="text" class="hide"  style="display: none;" name="junkid">
	                        <input type="text" class="hide"  style="display: none;" name="junkpw"> -->
	                        <form id="login_form" name="login_form" method="post">
	                            <div class="input">
								    <label for="id">아이디</label>
	                                <input type="text" name="employee_number" id="id" placeholder="아이디를 입력해주세요." maxlength="10">
	                                <label for="pw">비밀번호</label>
	                                <input type="password" name="password" id="pw" placeholder="비밀번호를 입력해주세요." maxlength="63">
	                            </div>
	                            <div class="btn-login">로그인</div>
	                        </form>
	                    </div>
	                    <p class="login-guid"></p>
	                </div>
	            </div>
	            <div class="login-footer">
	                <div class="copy">
	                   	 ⓒ2023 FREE-GO.
	                </div>
	            </div>
	        </div>
	    </div>
		<div id="loading_page">
	    	<div class="img">
	    		<img src="/resources/img/loading/loading.gif">
	    	</div>
	    	<div class="text">.</div>
	    	<input type="hidden" class="emp_num" value="${member.employee_number}"/>
	    </div>
	</body>
</html>