package com.java.FREEGO.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.java.FREEGO.dao.CommonCodeDao;

@Service
public class CommonCodeService {

	@Autowired
	private CommonCodeDao commonCodeDao;
	
	/* 공통코드 리스트 get */	
	public List<HashMap<String, Object>> getCodeList(String super_code){
		return commonCodeDao.getCodeList(super_code);
	}
	
	/*정렬 리스트 get*/
	public List<HashMap<String, Object>> getOrdList(String super_code){
		return commonCodeDao.getOrdList(super_code);
	}
	
	/* 코드 상세정보 get */
	public HashMap<String, Object> getCodeDetail(String code){
		return commonCodeDao.getCodeDetail(code);
	}
	
	
	/*코드 경로 get*/
	public List<HashMap<String, Object>> getCodePath(String code){
		return commonCodeDao.getCodePath(code);
	}
	
	@Transactional
	/* 코드 추가 */
	public int createCode(HashMap<String, Object> map) throws Exception {
		commonCodeDao.changeOrdIns(map);
		int createCodeResult = commonCodeDao.createCode(map);
		return createCodeResult;
	}
	
	@Transactional
	/* 코드 정보 수정 */
	public int updateCode(HashMap<String, Object> map) throws Exception {
		int oldOrd = (int) map.get("oldOrd");
		int newOrd = (int) map.get("newOrd");
		if(oldOrd != newOrd) {
			if(newOrd<oldOrd) {
				commonCodeDao.changeOrdUp(map);
			}else {
				map.replace("newOrd", newOrd-1);
				commonCodeDao.changeOrdDown(map);
			}
		}
		return commonCodeDao.updateCode(map);
	}
	
	@Transactional
	/* 코드 삭제 */
	public int deleteCode(HashMap<String, Object> map) throws Exception {
		commonCodeDao.changeOrdDel((String)map.get("code"));
		return commonCodeDao.deleteCode((String)map.get("code"));
	}
	
	/* 코드 검색 */
	public List<HashMap<String, Object>> searchCode(HashMap<String, Object> map){
		return commonCodeDao.searchCode(map);
	}
	
	/* 코드 중복 체크 */
	public int codeAlreadyCheck(String code) {
		return commonCodeDao.codeAlreadyCheck(code);
	}

}