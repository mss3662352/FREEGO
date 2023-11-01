package com.java.FREEGO.service;


import java.util.Arrays;
import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.FREEGO.dao.FreelanceRegisterDao;
import com.java.FREEGO.domain.FreelanceCareerDto;
import com.java.FREEGO.domain.FreelanceDto;

@Service
public class FreelanceRegisterServiceImpl implements FreelnaceRegisterService {
	
	@Autowired
	FreelanceRegisterDao freelanceRegisterDao;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(FreelanceRegisterServiceImpl.class);
	
	// 프리랜서 인적사항
	@Override
	public int insertFreelance(FreelanceDto freelanceDto){
		
		LOGGER.info("con >>> ser: {}", freelanceDto);
		
		return freelanceRegisterDao.insertFreelance(freelanceDto);
	}

	// 프리랜서 경력
	@Override
	public int insertFreelanceCareer(FreelanceCareerDto[] freelanceCareerDtoArr){
		
		LOGGER.info("career: {}", Arrays.toString(freelanceCareerDtoArr));
		int result = 0;
		for (FreelanceCareerDto temp: freelanceCareerDtoArr) {
			result += freelanceRegisterDao.insertFreelanceCareer(temp);
		}
		return result;
	}


	// 프리랜서 사진 업로드
	@Override
	public int updateProfileImagePath(HashMap<String, Object> map) {
		return freelanceRegisterDao.updateProfileImagePath(map);
	}
	
}
