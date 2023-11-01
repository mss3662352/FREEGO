package com.java.FREEGO.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.java.FREEGO.service.CommonCodeService;
import com.microsoft.sqlserver.jdbc.SQLServerException;

@Controller
@RequestMapping("/FREEGO")
public class CommonCodeController {
	
	@Autowired
	private CommonCodeService commonCodeService;
		
	/* 공통코드 관리 페이지 진입 */
	@RequestMapping(value="/system/code", method = RequestMethod.GET)
    public String systemCode(Model model) {
        return "system_code";
    }
	
	/* 코드 리스트 호출 */
	@ResponseBody
	@RequestMapping(value = "/system/code/getCodeList", method = RequestMethod.GET)
	public List<HashMap<String, Object>> getCodeList(@RequestParam("super_code") String super_code) {
		return commonCodeService.getCodeList(super_code);
	}
	
	/*정렬 리스트 호출*/
	@ResponseBody
	@RequestMapping(value = "/system/code/getOrdList", method = RequestMethod.GET)
	public List<HashMap<String, Object>> getOrdList(@RequestParam("super_code") String super_code){
		return commonCodeService.getOrdList(super_code);
	}
	
	/* 코드 분류(경로) 호출 */
	@ResponseBody
	@RequestMapping(value = "/system/code/getCodePath", method = RequestMethod.GET)
	public List<HashMap<String, Object>> getCodePath(@RequestParam("code") String code) {
		return commonCodeService.getCodePath(code);
	}
	
	/* 코드 상세 정보 호출 */
	@ResponseBody
	@RequestMapping(value = "/system/code/getCodeDetail", method = RequestMethod.GET)
	public HashMap<String, Object> getCodeDetail(@RequestParam("code") String code) {
		return commonCodeService.getCodeDetail(code);
	}

	
	
	/* 공통코드 생성 */
	@ResponseBody
	@RequestMapping(value = "/system/code/createCode", method = RequestMethod.POST)
	public HashMap<String, String> createCode(@RequestParam("code") String code,
			@RequestParam("spcode") String spcode, @RequestParam("name") String name,
			@RequestParam("desc") String desc, @RequestParam("ord") int ord,
			@RequestParam("codeType") String codeType) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		HashMap<String, String> resultMap = new HashMap<String, String>();
		map.put("spcode", spcode);
		map.put("code", code);
		map.put("name", name);
		map.put("desc", desc);
		map.put("ord", ord);
		map.put("codeType", codeType);
		try {
			commonCodeService.createCode(map);
			resultMap.put("color", "blue");
			resultMap.put("msg", code+" 코드를 생성했습니다");
		} catch (SQLServerException e) {
			resultMap.put("color", "red");
			resultMap.put("msg", code+"는 이미 사용중인 코드 입니다.");
		} catch (Exception e) {
			resultMap.put("color", "red");
			resultMap.put("msg", "알 수 없는 이유로 예외가 발생했습니다");
		}
		return resultMap;
	}
	
	/* 공통코드 수정 */
	@ResponseBody
	@RequestMapping(value = "/system/code/updateCode", method = RequestMethod.POST)
	public HashMap<String, String> updateCode(@RequestParam("code") String code,
			@RequestParam("name") String name, @RequestParam("desc") String desc,
			@RequestParam("oldOrd") int oldOrd, @RequestParam("newOrd") int newOrd,
			@RequestParam("spcode") String spcode, @RequestParam("codeType") String codeType) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		HashMap<String, String> resultMap = new HashMap<String, String>();
		map.put("spcode", spcode);
		map.put("code", code);
		map.put("name", name);
		map.put("desc", desc);
		map.put("oldOrd", oldOrd);
		map.put("newOrd", newOrd);
		map.put("codeType", codeType);
		try {
			commonCodeService.updateCode(map);
			resultMap.put("color", "blue");
			resultMap.put("msg", code+" 코드의 정보가 수정되었습니다");
		} catch (SQLServerException e) {
			resultMap.put("color", "red");
			resultMap.put("msg", code+" 해당 코드를 사용중인 데이터가 있어서 수정할 수 없습니다");
		} catch (Exception e) {
			resultMap.put("color", "red");
			resultMap.put("msg", "알 수 없는 이유로 예외가 발생했습니다");
		}
		return resultMap;
	}
	
	/* 공통코드 삭제 */
	@ResponseBody
	@RequestMapping(value = "/system/code/deleteCode", method = RequestMethod.POST)
	public HashMap<String, String> deleteCode(@RequestParam("code") String code, @RequestParam("codeType") String codeType) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		HashMap<String, String> resultMap = new HashMap<String, String>();
		map.put("code", code);
		map.put("codeType", codeType);
		try {
			commonCodeService.deleteCode(map);
			resultMap.put("color", "blue");
			resultMap.put("msg", code+" 코드가 삭제되었습니다");
		} catch (DataIntegrityViolationException e) {
			resultMap.put("color", "red");
			resultMap.put("msg", "삭제불가 - 해당 공통코드를 참조하고 있는 레코드가 있습니다");
		} catch (Exception e) {
			resultMap.put("color", "red");
			resultMap.put("msg", "알 수 없는 이유로 예외가 발생했습니다");
		}
		return resultMap;
	}
	
	/* 공통코드 검색 */
	@ResponseBody
	@RequestMapping(value = "/system/code/searchCode", method = RequestMethod.GET)
	public List<HashMap<String, Object>> searchCode(@RequestParam("type") String type, @RequestParam("word") String word) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("type", type);
		map.put("word", word);
		return commonCodeService.searchCode(map);
	}
	
	/* 코드 중복여부 확인 */
	@ResponseBody
	@RequestMapping(value = "/system/code/codeAlreadyCheck", method = RequestMethod.GET)
	public int codeAlreadyCheck (@RequestParam("code") String code) {
		return commonCodeService.codeAlreadyCheck(code);
	}
}