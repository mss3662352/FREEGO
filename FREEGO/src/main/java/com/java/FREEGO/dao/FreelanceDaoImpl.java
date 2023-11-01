package com.java.FREEGO.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.java.FREEGO.domain.FreelanceCareerDto;
import com.java.FREEGO.domain.FreelanceCommonDto;
import com.java.FREEGO.domain.FreelanceDto;
import com.java.FREEGO.domain.FreelanceRateDto;
import com.java.FREEGO.domain.FreelanceSkillDto;
import com.java.FREEGO.domain.SearchCondition;

@Repository
public class FreelanceDaoImpl implements FreelanceDao{
	
	@Autowired
	SqlSession session;
	
	String namespace = "com.java.FREEGO.dao.freelanceMapper.";
	
	@Override
	public List<FreelanceDto> selectAll(SearchCondition sc){
        return session.selectList(namespace+"selectAll", sc);
    }
	@Override
	public int searchResultCnt(SearchCondition sc) {
		return session.selectOne(namespace+"searchResultCnt", sc);
	}
	
	@Override
	public List<FreelanceRateDto> getRateList(int freelance_id){
		return session.selectList(namespace+"getRateList", freelance_id);
	}

	@Override
	public int getFreeCount(){
		
		return session.selectOne(namespace+"getFreeCount");
	}
	@Override
	public int insertRate(FreelanceRateDto dto) {
		
		return session.insert(namespace+"insertRate", dto);
	}
	@Override
	public List<FreelanceSkillDto> getFreelanceSkill() {
		return session.selectList(namespace +"getFreelanceSkill");
	}
	@Override
	public Map<String, Object> selectSkillCount() {
		return session.selectMap(namespace + "selectSkillCount", "code");
	}
	@Override
	public List<FreelanceDto> selectSkillDetail(FreelanceDto dto){
		return session.selectList(namespace + "selectSkillDetail", dto);
	}
	@Override
	public List<FreelanceDto> selectListSkill(int freelance_id){
		return session.selectList(namespace+"selectListSkill", freelance_id);
	}
	@Override
	public FreelanceDto getFreeUpdate(int freelance_id){
		return session.selectOne(namespace+"getFreeUpdate", freelance_id);
	}
	@Override
	public int freeUpdate(FreelanceDto dto) {
		return session.update(namespace+"freeUpdate", dto);
	}
	@Override
	public List<FreelanceCareerDto> getFreeCareer(int freelance_id){
		return session.selectList(namespace+"getFreeCareer", freelance_id);
	}
	@Override
	public int insertCareer(FreelanceCareerDto dto) {
			
		return session.insert(namespace+"insertCareer", dto);
	}
	@Override
	public int deleteCareer(int id){
			
		return session.insert(namespace+"deleteCareer", id);
	}
	@Override
	public int updateCareer(FreelanceCareerDto dto) {
		return session.update(namespace+"updateCareer", dto);
	}
	@Override
	public FreelanceDto checkProfileUpload(int id) {
		return session.selectOne(namespace + "checkProfileUpload", id);
	}
	@Override
	public List<FreelanceSkillDto> getSkill(){
		return session.selectList(namespace + "getSkill");
	}
	
	@Override
	public List<FreelanceSkillDto> getSkillSelect(int freelance_id){
		return session.selectList(namespace + "getSkillSelect", freelance_id);
	}
	@Override
	public int deleteFreeSkill(int freelance_id){
		return session.delete(namespace + "deleteFreeSkill", freelance_id);
	}
	@Override
	public int insertFreeSkill(FreelanceSkillDto dto){
		return session.insert(namespace + "insertFreeSkill", dto);
	}
	@Override
	public FreelanceDto getOnlySkills(int id){
		return session.selectOne(namespace + "getOnlySkills", id);
	}
	@Override
	public int deleteFreelance(int id) {
		return session.delete(namespace + "deleteFreelance", id);
	}
	@Override
	public List<FreelanceCommonDto> freeTask(){
		return session.selectList(namespace + "freeTask");
	}
}
