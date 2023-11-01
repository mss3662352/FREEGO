package com.java.FREEGO.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.FREEGO.dao.FreelanceDao;
import com.java.FREEGO.domain.FreelanceCareerDto;
import com.java.FREEGO.domain.FreelanceCommonDto;
import com.java.FREEGO.domain.FreelanceDto;
import com.java.FREEGO.domain.FreelanceRateDto;
import com.java.FREEGO.domain.FreelanceSkillDto;
import com.java.FREEGO.domain.SearchCondition;

@Service
public class FreelanceServiceImpl implements FreelanceService{
	
	@Autowired
	FreelanceDao freelanceDao;
	
	@Override
	public List<FreelanceDto> getList(SearchCondition sc){
		
	      return freelanceDao.selectAll(sc);
	  }
	
	@Override
	public int searchReusltCnt(SearchCondition sc) {
		
		return freelanceDao.searchResultCnt(sc);
	}
	
	@Override
	public List<FreelanceRateDto> getRateList(int freelance_id){
		
		return freelanceDao.getRateList(freelance_id);
	}

	@Override
	public int getFreeCount(){
		return freelanceDao.getFreeCount();
	}
	
	@Override
	public int insertRate(FreelanceRateDto dto){
		return freelanceDao.insertRate(dto);
	}
	
	@Override
	public List<FreelanceSkillDto> getFreelanceSkill() {
		return freelanceDao.getFreelanceSkill();
	}
	
	@Override
	public Map<String, Object> selectSkillCount() {
		return freelanceDao.selectSkillCount();
	}
	
	@Override
	public List<FreelanceDto> selectSkillDetail(FreelanceDto dto){
		return freelanceDao.selectSkillDetail(dto);
	}
	
	@Override
	public List<FreelanceDto> selectListSkill(int freelance_id){
		return freelanceDao.selectListSkill(freelance_id);
	}
	@Override
	public FreelanceDto getFreeUpdate(int freelance_id){
		return freelanceDao.getFreeUpdate(freelance_id);
	}
	@Override
	public int freeUpdate(FreelanceDto dto){
		return freelanceDao.freeUpdate(dto);
	}
	@Override
	public List<FreelanceCareerDto> getFreeCareer(int freelance_id){
		return freelanceDao.getFreeCareer(freelance_id);
	}
	
	@Override
	public int insertCareer(FreelanceCareerDto dto){
		return freelanceDao.insertCareer(dto);
	}
	@Override
	public int deleteCareer(int[] id) {
		int result = 0;
		for (int temp: id) {
			result += freelanceDao.deleteCareer(temp);
		}
		return result;
	}
	@Override
	public int updateCareer(FreelanceCareerDto[] dto){
		int result = 0;
		for (FreelanceCareerDto temp: dto) {
			result += freelanceDao.updateCareer(temp);
		}
		return result;
	}
	@Override
	public FreelanceDto checkProfileUpload(int id) {
		return freelanceDao.checkProfileUpload(id);
	}
	@Override
	public List<FreelanceSkillDto> getSkill(){
		return freelanceDao.getSkill();
	}
	@Override
	public List<FreelanceSkillDto> getSkillSelect(int freelnace_id){
		return freelanceDao.getSkillSelect(freelnace_id);
	}
	@Override
	public int deleteFreeSkill(int freelnace_id){
		return freelanceDao.deleteFreeSkill(freelnace_id);
	}
	@Override
	public int insertFreeSkill(FreelanceSkillDto dto){
		return freelanceDao.insertFreeSkill(dto);
	}
	@Override
	public FreelanceDto getOnlySkills(int id){
		return freelanceDao.getOnlySkills(id);
	}
	@Override
	public int deleteFreelance(int id){
		return freelanceDao.deleteFreelance(id);
	}
	@Override
	public List<FreelanceCommonDto> freeTask(){
		return freelanceDao.freeTask();
	}
}