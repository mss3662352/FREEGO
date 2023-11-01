package com.java.FREEGO.service;

import java.util.HashMap;

import com.java.FREEGO.domain.FreelanceCareerDto;
import com.java.FREEGO.domain.FreelanceDto;

public interface FreelnaceRegisterService {
	
	public int insertFreelance(FreelanceDto freelanceDto);

	public int insertFreelanceCareer(FreelanceCareerDto[] fCDto);

	public int updateProfileImagePath(HashMap<String, Object> map);

}
