package com.java.FREEGO.dao;

import java.util.HashMap;

import com.java.FREEGO.domain.FreelanceCareerDto;
import com.java.FREEGO.domain.FreelanceDto;


public interface FreelanceRegisterDao {
	
	int insertFreelance(FreelanceDto freelanceDto);

	int insertFreelanceCareer(FreelanceCareerDto freelanceCareerDto);

	int updateProfileImagePath(HashMap<String, Object> map);
	
}
