package com.java.FREEGO.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.FREEGO.dao.MemberDao;
import com.java.FREEGO.domain.MemberDto;
import com.java.FREEGO.domain.SystemLogDto;

@Service
public class MemberServiceImpl implements MemberService{
	@Autowired
	private MemberDao memberdao;
	
	//로그인
	@Override
	public MemberDto idCk(String id) {
		return memberdao.idCk(id);
	}
	
	//시스템 로그
	@Override
	public void syslog(SystemLogDto log) {
		memberdao.syslog(log);
		
	}

	@Override
	public MemberDto checkPw(long id) {
		return memberdao.checkPw(id);
	}

	@Override
	public void changePw(MemberDto checkPw) {
		memberdao.changePw(checkPw);
		
	}

	/*자격증 insert*/
//	@Override
//	public void savelicensePost(LicenseDto licenseDto) {
//		memberdao.savelicensePost(licenseDto);
//	}

}
