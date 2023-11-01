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
    <link rel="stylesheet" type="text/css" href="<c:url value='/resources/css/system.css'/>">
    <link rel="stylesheet" type="text/css" href="<c:url value='/resources/css/system_code.css'/>">
    <script src="<c:url value='/resources/js/jquery-1.9.1.js'/>"></script>
    <script src="<c:url value='/resources/js/script.js'/>"></script>
    <script src="<c:url value='/resources/js/system_code_function.js'/>"></script>
</head>

<body>
    <div class="sub-main-wrap">
      	<%@ include file="./SNB.jsp" %>
        <div class="sub-container-wrap system-mgm">
            <div class="container-wrap">
                <div class="sub-tab-wrap">
                   <div class="sub-tab">
                        <ul class="tab-box" id="tab">
                            <li class="on">
                                <a href='<c:url value='/FREEGO/system/code'/>' title="공통코드 관리">공통코드 관리</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <section class="tab-cont-wrap">
                    <div class="container tab-cont03" style="display: block">
                        <div class="sub-title">
                            <h2>공통코드 관리</h2>
                            <span id="msg_search"></span>
                        </div>
                        <div class="top-cont">
                            <div class="col col-1 wp60">
                                <div class="search-wrap">
                                    <div class="search-box">
                                        <ul>
                                            <li>
                                                <select name="" id="search_type" class="w120">
                                                    <option value="code">코드</option>
                                                    <option value="name">이름</option>
                                                    <option value="cate">분류</option>
                                                </select>
                                            </li>
                                            <li>
                                                <input type="text" name="" id="search_word" placeholder="코드 검색" class="w350">
                                                <label for="" class="hide">코드 검색창</label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="search-btn">
                                        <ul>
                                            <li><a href="#" title="조회" id="codeSearchBtn">조회</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div id="path_div">
	                                <div id="path_header">분류&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
	                                <div id="code_path"></div>
                                </div>
                                <div class="tooltip">?</div>
                                <div id="codeTable_div" class="table-wrap">
                                    <table class="table-type01" id="codeTable">
                                        <caption>코드 정보 테이블</caption>
                                        <colgroup>
                                            <col class="wp16">
                                            <col class="wp30">
                                            <col class="wauto">
                                        </colgroup>
                                        <thead>
                                            <th>코드</th>
                                            <th>이름</th>
                                            <th>설명</th>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                            <div class="col col-2 wp40">
                                <div class="cont-sub-title">
                                    <div class="top-btn-wrap fl-ct">
	                                    <ul class="btn-code">
	                                        <li><a href="#" title="신규 코드 추가" class="" id="onInCodeBtn">신규 코드 추가</a></li>
	                                    </ul>
                                	</div>
                                </div>
                                <div class="code">
                                        [코드]
                                        	<input type="hidden" id="input_spcode">
                                            <input type="text" name="" id="input_code" maxlength="5" placeholder="5자 이하 영문자/숫자" required>
                                            <br><br>
                                        [이름]
                                            <input type="text" name="" id="input_name" maxlength="29" required>
                                            <br><br>
                                        [설명]
                                            <textarea name="" id="input_desc" cols="30" maxlength="149" rows="5"></textarea>
                                            <br><br>
                                        [정렬 순서]
                                            <select id="input_ord">
                                            </select>
                                            <br><br>
                                </div>
                                <div id="msg_div_btn">
                                	<span id="msg_btn"></span>
                                </div>
                                <div class="top-btn-wrap fl-ct" id="btnGroup">
                                    <ul class="btn-code">
                                        <li><a href="#" title="수정" class="" id="upCodeBtn">수정</a></li>
                                        <li><a href="#" title="삭제" class="" id="delCodeBtn">삭제</a></li>
                                        <li><a href="#" title="등록" id="inCodeBtn">등록</a></li>
                                        <li><a href="#" title="취소" id="cancelBtn">취소</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div><!--//top-cont-->        
                    </div><!--//tab-cont03-->
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
        <!--신규계정 등록 popup-->
        <div id="newacModal" class="popup-wrap" style="display: none">
            <div class="popup-bg"></div>
            <div class="popup-container">
                <div class="popup-header">
                    <h4>신규계정 등록 팝업</h4>
                    <a href="#" title="닫기" class="btn-close"></a>
                </div>
                <div class="popup-contents-wrap">
                    <div class="popup-cont">
                        <table class="table-type02">
                            <caption>비밀번호 변경 테이블</caption>
                            <colgroup>
                                <col class="wp15">
                                <col class="wp20">
                                <col class="wp15">
                                <col class="wauto">
                            </colgroup>
                            <tr>
                                <th>ID:</th>
                                <td>
                                    <input type="text" name="" id="emp-id" placeholder="사원번호" maxlength="10">
                                    <label for="" class="hide">ID</label>
                                </td>
                                <th>성명:</th>
                                <td>
                                    <input type="text" name="" id="emp-name" placeholder="한글이름" maxlength="32">
                                    <label for="" class="hide">성명</label>
                                </td>
                            </tr>
                            <tr>
                                <th>권한레벨:</th>
                                <td>
                                    <select name="" id="emp-auth-type" class="w180">
                                        <option value="NORMA">일반사용자</option>
                                        <option value="HTEAM">팀장</option>
                                        <option value="HDEPA">부서장</option>
                                        <option value="EXECU">임원</option>
                                        <option value="HEXEC">총괄중역</option>
                                        <option value="SYSMA">시스템관리자</option>
                                    </select>
                                </td>
                                <td colspan="2">
                                    로그인 차단 설정
                                    <!-- checkbox는 모두 display:none으로 설정되어 있습니다. !important는 다른 속성 적용보다 먼저 적용되도록 합니다.  -->
                                    <input type="checkbox" name="" id="emp-login-auth" style="display:inline !important;">
                                    <label for="" class="hide">로그인 차단 설정</label>
                                </td>
                            </tr>
                            <tr>
                                <th>비밀번호:</th>
                                <td>
                                    <input type="password" name="" id="emp-pw" placeholder="비밀번호">
                                    <label for="" class="hide">비밀번호</label>
                                </td>
                                <th>재직구분:</th>
                                <td>
                                    <select name="" id="emp-status" class="w180">
                                        <option value="ONJOB">재직중</option>
                                        <option value="INRES">휴직중</option>
                                        <option value="QUIT">퇴사</option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                        <div class="desc3">
                            <ul>
                                <li>※신규 임직원 등록절차 :</li>
                                <li>1. 시스템 관리자가 시스템 로그인 권한만 부여 -> 로그인 정보 안내 메일 발송</li>
                                <li>2. 사용자가 직접 시스템에 로그인 -> My인사정보 항목별 입력 정보 추가 작성</li>
                                <li>3.시스템관리자가 데이터 적합성 확인 후 부족한 부분 보완 입력하여 기본 인사정보 완성</li>
                            </ul>
                        </div>
                    </div>
                    <div class="popup-btn-wrap">
                        <ul>
                            <li>
                                <a href="#" title="취소" class="btn-popup-cancel">취소</a>
                            </li>
                            <li>
                                <a href="#" title="신규계정등록" class="btn-popup-change btn-account-register">신규계정등록</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div><!--//신규계정 등록 popup-wrap-->
        <!--권한설정 popup-->
        <div id="prmstnModal" class="popup-wrap prmstnModal" style="display: none">
            <div class="popup-bg"></div>
            <div class="popup-container">
                <div class="popup-header">
                    <h4>권한설정</h4>
                    <a href="#" title="닫기" class="btn-close"></a>
                </div>
                <div class="popup-contents-wrap">
                    <div class="popup-cont">
                    <table class="table-type02">
                        <caption>권한설정 테이블</caption>
                        <colgroup>
                            <col class="wp50">
                            <col class="wauto">
                        </colgroup>
                        <tr>
                            <th>접근권한</th>
                            <td>
                                <select name="" id="" class="w120">
                                    <option value="일반사용자">일반사용자</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                                <span>이상</span>
                            </td>
                        </tr>
                        <tr>
                            <th>보기권한(Read)</th>
                            <td>
                                <select name="" id="" class="w120">
                                    <option value="일반사용자">일반사용자</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                                <span>이상</span>
                            </td>
                        </tr>
                        <tr>
                            <th>수정권한(Update)</th>
                            <td>
                                <select name="" id="" class="w120">
                                    <option value="일반사용자">팀장</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                                <span>이상</span>
                            </td>
                        </tr>
                        <tr>
                            <th>삭제권한(Delete)</th>
                            <td>
                                <select name="" id="" class="w120">
                                    <option value="일반사용자">시스템관리자</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                                <span>이상</span>
                            </td>
                        </tr>
                        <tr>
                            <th>쓰기권한(Create)</th>
                            <td>
                                <select name="" id="" class="w120">
                                    <option value="일반사용자">시스템관리자</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                                <span>이상</span>
                            </td>
                        </tr>
                    </table>
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
    </div><!--//sub-main-wrap-->
    <script src="<c:url value='/resources/js/system_code_action.js'/>"></script>
</body>

</html>