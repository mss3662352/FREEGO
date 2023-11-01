package com.java.FREEGO.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.java.FREEGO.domain.MemberDto;
import com.java.FREEGO.domain.SystemLogDto;


@Repository
public class MemberDaoImpl implements MemberDao{
	
	@Autowired
	SqlSession session;
	
	private static String namespace = "member";
	
	@Override
	public MemberDto idCk(String id) {
		return session.selectOne(namespace + ".idCk", id);
	}
	@Override
	public void syslog(SystemLogDto log) {
		session.insert(namespace + ".syslog", log);
		
	}
	@Override
	public MemberDto checkPw(long id) {
		return session.selectOne(namespace + ".checkPw", id);
	}
	@Override
	public void changePw(MemberDto checkPw) {
		session.update(namespace + ".changePw", checkPw);
	}
//	@Override
//	public void savelicensePost(LicenseDto licenseDto) {
//		session.insert(namespace + ".savelicensePost", licenseDto);
//		
//	}




}
