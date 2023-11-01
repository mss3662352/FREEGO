package com.java.FREEGO.dao;

import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.java.FREEGO.domain.FreelanceCareerDto;
import com.java.FREEGO.domain.FreelanceDto;


@Repository
public class FreelanceRegisterDaoImpl implements FreelanceRegisterDao {

	@Autowired
	SqlSession session;

	String namespaces = "com.java.FREEGO.dao.freelanceRegisterMapper.";

	//프리랜서 인적사항
	public int insertFreelance(FreelanceDto freelanceDto){
		session.insert(namespaces + "insertFreelance", freelanceDto);
		System.out.println("프리랜서 id: " + freelanceDto.getId());
		return freelanceDto.getId();
	}

	//프리랜서 경력
	@Override
	public int insertFreelanceCareer(FreelanceCareerDto freelanceCareerDto){
		
		System.out.println("프리랜서 경력: " + freelanceCareerDto);
		
		return session.insert(namespaces + "insertFreelanceCareer", freelanceCareerDto);
	}

	@Override
	public int updateProfileImagePath(HashMap<String, Object> map) {
		return session.update(namespaces + "updateProfileImagePath", map);
	}
}
