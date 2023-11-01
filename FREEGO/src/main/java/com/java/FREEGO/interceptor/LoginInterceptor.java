package com.java.FREEGO.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.java.FREEGO.domain.MemberDto;


public class LoginInterceptor extends HandlerInterceptorAdapter{
	
	private static final String KEY_EMPLOYEE_DTO = "member";
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		HttpSession session = request.getSession();
		
		// 세션에 저장된 employee가 있는지 확인합니다.
		MemberDto memberdto = (MemberDto)session.getAttribute(KEY_EMPLOYEE_DTO);
		
		// 로그인과 관련된 부분입니다.
		if(memberdto == null || memberdto.getEmployee_number() == null) { // 로그인 실패
			response.sendRedirect("/"); 
			return false;
		} else { // 로그인 성공
			return true;
		}
	}
}
