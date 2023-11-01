package com.java.FREEGO.service;

import com.java.FREEGO.domain.MemberDto;
import com.java.FREEGO.domain.SystemLogDto;

public interface MemberService {

	//로그인
	MemberDto idCk(String id);

	//시스템 로그
	void syslog(SystemLogDto log);

	MemberDto checkPw(long id);

	void changePw(MemberDto checkPw);




	/*자격증 insert*/
//	void savelicensePost(LicenseDto licenseDto);

}
