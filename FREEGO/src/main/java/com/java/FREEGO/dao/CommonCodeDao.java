package com.java.FREEGO.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CommonCodeDao {

	@Autowired
	private SqlSession sql;
	
	private static String namespace ="commonCodeMapper";
		
	/* 공통코드 리스트 get */
	public List<HashMap<String, Object>> getCodeList(String super_code){
		return sql.selectList(namespace+".codeList", super_code);
	}
	
	/*정렬 리스트 get*/
	public List<HashMap<String, Object>> getOrdList(String super_code){
		return sql.selectList(namespace+".ordList", super_code);
	}
	
	/* 코드 상세정보 get */
	public HashMap<String, Object> getCodeDetail(String code){
		return sql.selectOne(namespace+".codeDetail", code);
	}
	
	/* 코드 경로 get */
	public List<HashMap<String, Object>> getCodePath(String code){
		return sql.selectList(namespace+".codePath", code);
	}
	
	/* 코드 추가 */
	public int createCode(HashMap<String, Object> map) throws Exception {
		return sql.insert(namespace+".insertCode", map);
	}
	
	/* 코드 정보 수정 */
	public int updateCode(HashMap<String, Object> map) throws Exception {
		return sql.update(namespace+".updateCode", map);
	}
	
	/* 코드 삭제 */
	public int deleteCode(String code) throws Exception {
		return sql.delete(namespace+".deleteCode", code);
	}
	
	/*정렬 순서 변경*/
	//코드 추가 시
	public int changeOrdIns(HashMap<String, Object> map) throws Exception{
		return sql.update(namespace+".changeOrdIns", map);
	}
	//코드 수정(위로) 시
	public int changeOrdUp(HashMap<String, Object> map) throws Exception{
		return sql.update(namespace+".changeOrdUp", map);
	}
	//코드 수정(아래로) 시
	public int changeOrdDown(HashMap<String, Object> map) throws Exception{
		return sql.update(namespace+".changeOrdDown", map);
	}
	//코드 삭제 시
	public int changeOrdDel(String code) throws Exception{
		return sql.update(namespace+".changeOrdDel", code);
	}
	
	/* 코드 검색 */
	public List<HashMap<String, Object>> searchCode(HashMap<String, Object> map){
		return sql.selectList(namespace+".searchCode", map);
	}
	
	/* 코드 중복 체크 */
	public int codeAlreadyCheck(String code) {
		System.out.println(code);
		return sql.selectOne(namespace+".alreadyCheck", code);
	}
	
}