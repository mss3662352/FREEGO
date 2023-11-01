package com.java.FREEGO.controller;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.java.FREEGO.domain.FreelanceCareerDto;
import com.java.FREEGO.domain.FreelanceCommonDto;
import com.java.FREEGO.domain.FreelanceDto;
import com.java.FREEGO.domain.FreelanceSkillDto;
import com.java.FREEGO.domain.MemberDto;
import com.java.FREEGO.domain.SystemLogDto;
import com.java.FREEGO.service.FreelanceService;
import com.java.FREEGO.service.FreelnaceRegisterService;
import com.java.FREEGO.service.MemberService;
import com.java.FREEGO.sessionListener.SessionConfig;

@Controller
public class LoginController {
	@Autowired
	private ServletContext servletContext;
	
	@Autowired
	private MemberService memberservice;	
	

	private static final Logger LOGGER = LoggerFactory.getLogger(LoginController.class);
	private static final String KEY_AUTHORITY_MAP = "authorityMap";
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public ModelAndView login(Model model, HttpSession session) {
		System.out.println("loginGet");
		ModelAndView mav = new ModelAndView();

		mav.setViewName("login");
		return mav;
	}
	
	//로그인 상태에서 로그인페이지 이동시 각 권한별 메인페이지 이동
	@GetMapping("sessionCheck.do")
	public ModelAndView sessionCheck(HttpSession session) {
		ModelAndView mav = new ModelAndView();
		
		MemberDto member = (MemberDto) session.getAttribute("member");
		System.out.println("member!!! : " + member);
		if(member != null) {
			System.out.println("member!!! : " + member);
			
			
			// 첫 페이지 가져오기
			String firstPage = "/FREEGO/free/list";
			
			mav.addObject("location", firstPage);
			
		}
		
		mav.setViewName("jsonView");
		return mav;
	}
	
	@RequestMapping(value="/login.do", method = RequestMethod.POST)
	public ModelAndView loginGet(MemberDto memberdto, HttpServletRequest request, RedirectAttributes rttr, HttpSession sess) {
		ModelAndView mav = new ModelAndView();
		
		MemberDto mem = (MemberDto)sess.getAttribute("member");
		
		if(mem != null) {
			long id = mem.getId();
		}else {
			
		}
		
		String password = "";
		
		password = memberdto.getPassword();
		HttpSession session = request.getSession(true);
		
		//아이디 존재여부 체크
		String id = memberdto.getEmployee_number();
		MemberDto login = memberservice.idCk(id);
		

		if(login == null) {
			//아이디 존재x
			
			mav.addObject("data", "아이디나 비밀번호를 확인해주세요.");
			
		}else {
			//아이디 존재o
			if(password.equals(login.getPassword())) {
				//패스워드 일치
				
				if(login.getLogin_authority() == 0) {//로그인권한 허용
					
					HttpSession existingSession = SessionConfig.getSessionByUserId(login.getId());
					
		            System.out.println("existingSession 중복로그인 체크 : " + existingSession);
		            
		            if (existingSession != null) {
		                // 기존 세션 로그아웃
		            	
		            	mav.addObject("beforeLogout", true);
		                existingSession.removeAttribute("member");
		                existingSession.invalidate();
		            }
	
					login.setPassword("");            
					memberdto.setPassword(""); 
					password = "";
					
					Date sessionStartTime = new Date();

					session.setAttribute("member", login);
					session.setAttribute("sessionStartTime", sessionStartTime);
					
					mav.addObject("data", true);
					
					// 첫 페이지 가져오기
					
					String firstPage = "/FREEGO/free/list";
					
					mav.addObject("location", firstPage);
				
				}else {
					mav.addObject("data", "차단된 계정입니다 관리자에게 문의해주세요.");	
				}

			}else {//패스워드 불일치
				
				mav.addObject("data", "아이디나 비밀번호를 확인해주세요.");
			}
		}
		mav.setViewName("jsonView");
		return mav;
	}
	

	
	
	@RequestMapping(value="/logout.do", method = RequestMethod.GET)
	public ModelAndView lougout(HttpServletRequest request, RedirectAttributes rttr, HttpSession session) {
		
		ModelAndView mav = new ModelAndView();
		MemberDto member = (MemberDto) session.getAttribute("member");
		if(member != null) {
			String id = member.getEmployee_number();

			System.out.println("id : " + id );
			 
//			HttpSession sesssion = request.getSession();
			HttpSession existingSession = SessionConfig.getSessionByUserId(member.getId());
			if(existingSession != null) {
				existingSession.removeAttribute("member");
				existingSession.invalidate();
			}else {
				session.invalidate();
			}
			
			
		
		}

		mav.setViewName("redirect:/");
		return mav;
	}
	@RequestMapping(value="/FREEGO/password.do", method = RequestMethod.POST)
	public ModelAndView password(String password,
			String passwordCh, String passwordChCk,
			HttpSession session) {
		ModelAndView mav = new ModelAndView();
		MemberDto member = (MemberDto) session.getAttribute("member");
		System.out.println("passwordCh : " + passwordCh);
		if (member != null) {
			//로그인중인 id값
		    long id = member.getId();
		
			//현재 로그인중인 세션 아이디값을 통해 등록된 비밀번호 조회
			MemberDto checkPw = memberservice.checkPw(id);
			System.out.println("checkPw : " + checkPw);
			
			if(passwordCh.equals(passwordChCk)) {
				//입력받은 현재 패스워드와 조회한 패스워드가 동일한지 체크
					
					
				checkPw.setPassword(passwordCh);
				//" id값 담기
				checkPw.setId(id);
				
				memberservice.changePw(checkPw);
				
				mav.addObject("data", true);
					
			}else {
				mav.addObject("data", "fail");
				System.out.println("패스워드변경, 변경확인 불일치");
			}
			

		}
		
		System.out.println(password);
		System.out.println(passwordCh);

		mav.setViewName("jsonView");
		return mav;
	}
}