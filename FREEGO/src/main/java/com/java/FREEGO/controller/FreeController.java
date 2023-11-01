package com.java.FREEGO.controller;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.java.FREEGO.domain.FreelanceCareerDto;
import com.java.FREEGO.domain.FreelanceCommonDto;
import com.java.FREEGO.domain.FreelanceDto;
import com.java.FREEGO.domain.FreelanceRateDto;
import com.java.FREEGO.domain.FreelanceSkillDto;
import com.java.FREEGO.domain.MemberDto;
import com.java.FREEGO.domain.PageHandler;
import com.java.FREEGO.domain.SearchCondition;
import com.java.FREEGO.service.FreelanceService;


@Controller
@RequestMapping("/FREEGO/free")
public class FreeController {
	
	@Autowired
	FreelanceService freelanceService;
	
	@RequestMapping(value = "/{path}", method = RequestMethod.GET)
	public String freeStatus(@PathVariable String path) {
		return "freelance_" + path;
	}
	
	@RequestMapping(value="/list.do", method = RequestMethod.GET)
    public @ResponseBody ModelAndView getFreeList(
    		@Param("page") int page,
    		@Param("option") String option, 
    		@Param("keyword") String keyword) {
		
		ModelAndView mav = new ModelAndView();
		
		SearchCondition sc = new SearchCondition(page, 15, option, keyword);
		
		
		List<FreelanceDto> list = freelanceService.getList(sc);
	
		int totalCnt = freelanceService.searchReusltCnt(sc);

		PageHandler ph = new PageHandler(totalCnt ,sc);
		
		int freelnace_count = freelanceService.getFreeCount();
		mav.addObject("freelnace_count", freelnace_count);
		mav.addObject("list", list);
		mav.addObject("ph", ph);
		mav.setViewName("jsonView");
        return mav;
		
    }
	
	
	@RequestMapping(value="/skillList.do", method = RequestMethod.GET)
    public @ResponseBody ModelAndView getListSkill(@RequestParam("id") int freelance_id){
		ModelAndView mav = new ModelAndView();
		List<FreelanceDto> skillList = freelanceService.selectListSkill(freelance_id);
		
		mav.addObject("skillList", skillList);
		mav.setViewName("jsonView");
        return mav;
    }
	@RequestMapping(value="/getFreeInfo.do", method = RequestMethod.GET)
    public @ResponseBody ModelAndView getFreeUpdate(@RequestParam("freelance_id") int freelance_id){
		ModelAndView mav = new ModelAndView();
		FreelanceDto getFreelance = freelanceService.getFreeUpdate(freelance_id);
		
		mav.addObject("getFreelance", getFreelance);
		mav.setViewName("jsonView");
        return mav;
    }
	
	@RequestMapping(value="/getFreeCareer.do", method = RequestMethod.GET)
    public @ResponseBody ModelAndView getFreeCareer(@RequestParam("freelance_id") int freelance_id){
		ModelAndView mav = new ModelAndView();
		List<FreelanceCareerDto> careerList = freelanceService.getFreeCareer(freelance_id);
		List<FreelanceCommonDto> commonList = freelanceService.freeTask();

		mav.addObject("careerList", careerList);
		mav.addObject("commonList", commonList);
		mav.setViewName("jsonView");
		return mav;
	}
	
	@RequestMapping(value="/freeUpdate.do", method = RequestMethod.POST)
    public ModelAndView freeUpdate(@RequestPart(value = "key") Map<String, Object> param,
	        @RequestParam(value = "profileUpload", required = false) MultipartFile profileUpload,
	        HttpSession session, HttpServletRequest request){

		ModelAndView mav = new ModelAndView();
		
		int id = (int) param.get("id");
		FreelanceDto dto = freelanceService.getFreeUpdate(id);
		/* ==================== 프로필사진 업로드 영역 ====================*/
		  //프로필사진 DB존재유무
		FreelanceDto checkUploadFile = freelanceService.checkProfileUpload(id);
		
		String profilepath = request.getSession().getServletContext().getRealPath("/resources/uploadFiles/profile/freelance");
		String profileFilePath = "\\resources\\uploadFiles\\profile\\freelance\\";
		/* 폴더 생성 */
		File proFileUploadPath = new File(profilepath);
		
		if(checkUploadFile == null || checkUploadFile.getPath().equals("")) {//db에 존재 유무확인
	    	if(profileUpload != null) { //넘어온 upload값 있는지 확인 
		    	//업로드파일 저장경로
	    		
				//파일원본명
				String originalProFilename = profileUpload.getOriginalFilename();
				//uuid명
				String uuid = UUID.randomUUID().toString();
				
				String proFileName = uuid + "_" + originalProFilename;

				if(proFileUploadPath.exists() == false) {
					proFileUploadPath.mkdirs();
					
				}
				
	    		//업로드값 있을시
				String Db_saveFile = profileFilePath + proFileName;
							
				
				dto.setPath(Db_saveFile);
				
				File saveFile = new File(proFileUploadPath, proFileName);
				
				//경로 파일 저장 
				try {
					profileUpload.transferTo(saveFile);

					
				} catch (Exception e) {
					e.printStackTrace();
				}
	    	}else {
	    		
//	    		String str = (String) param.get("path");
	    		dto.setPath((String) param.get("path"));
	    	}

	    }else {

			if(profileUpload != null) {
				
				String[] parts = checkUploadFile.getPath().split("\\\\");
				String fileName = parts[parts.length - 1];
				
				String deleteFilePath = profilepath + '/' +fileName;
				
				File file = new File(deleteFilePath);
	               
	               // 기존 경로에 저장된 이미지 파일 삭제
	               if (file.exists()) {
	                   // 파일이 존재함
	                   System.out.println("삭제할 파일이 존재합니다.");
	                   
	                   // 파일 삭제 코드 추가
	                   try {
	                       file.delete();
	                       System.out.println("삭제된 파일 : " + file);
	                   } catch (Exception e) {
	                       e.printStackTrace();
	                   }
	               } else {
	                   // 파일이 존재하지 않음
	                   System.out.println("삭제할 파일이 존재하지 않습니다.");
	                   
	                  if(proFileUploadPath.exists() == false) {
	                	  proFileUploadPath.mkdirs();
	                     
	                     System.out.println("저장경로 : " + proFileUploadPath);
	                  }
	               }
				
				//파일원본명
				String originalProFilename = profileUpload.getOriginalFilename();
				//uuid명
				String uuid = UUID.randomUUID().toString();
				
				String proFileName = uuid + "_" + originalProFilename;
				
				//기존사진 지우고 새롭게 데이터저장
				String Db_saveFile = profileFilePath + proFileName;

				System.out.println("Db_saveFile : " + Db_saveFile);					
				
				dto.setPath(Db_saveFile);
				
				File saveFile = new File(proFileUploadPath, proFileName);
				
				//경로 파일 저장 
				try {
					profileUpload.transferTo(saveFile);
					System.out.println("저장 : "+ saveFile);

					
				} catch (Exception e) {
					e.printStackTrace();
				}
			}else {
	    		dto.setPath((String) param.get("path"));
			}

	    }
		
		dto.setName((String)param.get("name"));
		dto.setTelephone((String)param.get("telephone"));
		dto.setEmail((String)param.get("email"));
		dto.setLocation((String)param.get("location"));
		dto.setProject((String)param.get("project"));
		if (param.get("price") instanceof Integer) {
			dto.setPrice((Integer)param.get("price"));
		} else if (param.get("price") instanceof String) {
			dto.setPrice(Integer.parseInt((String)param.get("price")));
		}

		if (param.get("gender") instanceof Integer) {
			dto.setGender((Integer)param.get("gender"));
		} else if (param.get("gender") instanceof String) {
			dto.setGender(Integer.parseInt((String)param.get("gender")));
		}
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		
		try {
			String birthdayValue = (String) param.get("birthday");
			if (birthdayValue != null && !birthdayValue.isEmpty()) {
			    // birthdayValue가 null이 아니고 비어있지 않을 때만 파싱을 시도합니다.
			    Date birthday = dateFormat.parse(birthdayValue);
			    dto.setBirthday(birthday);
			}

			String registrationDateValue = (String) param.get("registration_date");
			if (registrationDateValue != null && !registrationDateValue.isEmpty()) {
			    // registrationDateValue가 null이 아니고 비어있지 않을 때만 파싱을 시도합니다.
			    Date registrationDate = dateFormat.parse(registrationDateValue);
			    dto.setRegistration_date(registrationDate);
			}
		} catch (ParseException e) {
		    System.out.println("날짜 오류");
		    e.printStackTrace();
		}
		int freeUpdate = freelanceService.freeUpdate(dto);
		mav.setViewName("jsonView");
        return mav;
    }
	
	@RequestMapping(value = "/deleteFreelance.do", method = RequestMethod.POST)
	public @ResponseBody ModelAndView deleteFreelance(
			@RequestParam("freelance_id") int freelance_id) {
		
		ModelAndView mav = new ModelAndView();
		int deleteCareer = freelanceService.deleteFreelance(freelance_id);
		
		mav.addObject("deleteCareer", deleteCareer);
		mav.setViewName("jsonView");
        return mav;
    }
	
	@RequestMapping(value="/updateCareer.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public @ResponseBody ModelAndView updateCareer(@RequestBody FreelanceCareerDto[] freelanceCareerDto){
		ModelAndView mav = new ModelAndView();
		
		
		int updateCareer = freelanceService.updateCareer(freelanceCareerDto);
		mav.addObject("updateCareer", updateCareer);
		mav.setViewName("jsonView");
        return mav;
    }
	
	@RequestMapping(value = "/deleteCareer.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody ModelAndView deleteCareer(
			@RequestBody int[] career_id) {

	    ModelAndView mav = new ModelAndView();
	    int deleteCareer = freelanceService.deleteCareer(career_id);

	    mav.addObject("deleteCareer", deleteCareer);
	    mav.setViewName("jsonView");
	    return mav;
	}
	
	@RequestMapping(value = "/insertCareer.do", method = RequestMethod.POST)
	public @ResponseBody ModelAndView insertCareer(
			@RequestBody List<FreelanceCareerDto> careers) {
		
		ModelAndView mav = new ModelAndView();
		for(FreelanceCareerDto career: careers) {
//			int insertCareer = freelanceService.insertCareer(career);
			freelanceService.insertCareer(career);
		}
		
		mav.setViewName("jsonView");
        return mav;
    }
	
	@RequestMapping(value="/rate.do", method = RequestMethod.GET)
    public @ResponseBody ModelAndView getRateList(@RequestParam("id") int freelance_id){
		
		ModelAndView mav = new ModelAndView();
		List<FreelanceRateDto> rateList = freelanceService.getRateList(freelance_id);
		FreelanceDto freelanceInfo = freelanceService.getFreeUpdate(freelance_id);
		
		mav.addObject("rateList", rateList);
		mav.addObject("freelanceInfo", freelanceInfo);
		mav.setViewName("jsonView");
        return mav;
    }
	
	@RequestMapping(value = "/insertRate.do", method = RequestMethod.POST)
	public @ResponseBody ModelAndView insertRate(
			@RequestParam("evaluation") String evaluation,
			@RequestParam("freelance_id") int freelance_id,
			HttpSession session) {
		
		ModelAndView mav = new ModelAndView();
		
		MemberDto member = (MemberDto) session.getAttribute("member");
		int id = (int) member.getId();
		
		FreelanceRateDto dto = new FreelanceRateDto();
		dto.setFreelance_id(freelance_id);
		dto.setEvaluation(evaluation);
		dto.setEmployee_id(id); // 나중에 세션으로 값 가져오기
		
		freelanceService.insertRate(dto);
		
		mav.setViewName("jsonView");
        return mav;
    }
	
	@RequestMapping(value = "/status.do", method = RequestMethod.GET)
	public ModelAndView getFreeStatus() {
		
		ModelAndView mav = new ModelAndView();
		
		List<FreelanceSkillDto> skillData = freelanceService.getFreelanceSkill();
	
		mav.addObject("skillData", skillData);
		mav.setViewName("jsonView");
		return mav;
	
	}
	
	@RequestMapping(value="/getSkill.do", method = RequestMethod.GET)
    public @ResponseBody ModelAndView getSkill(
    		@RequestParam("skill_category") String skill_category,
    		@RequestParam("skill_level") String skill_level,
    		@RequestParam("skill_name") String skill_name){
		ModelAndView mav = new ModelAndView();
		
		FreelanceDto dto = new FreelanceDto();
		
		dto.setSkill_category(skill_category);
		dto.setSkill_level(skill_level);
		dto.setSkill_name(skill_name);
		
		List<FreelanceDto> skillDetailList = freelanceService.selectSkillDetail(dto);
		
		mav.addObject("skillDetailList", skillDetailList);
		mav.setViewName("jsonView");
        return mav;
    }
	
	@RequestMapping(value = "/getUpdateSkillList.do", method = RequestMethod.GET)
	public ModelAndView getUpdateSkillList(@RequestParam("freelance_id") int freelance_id) {
		
		ModelAndView mav = new ModelAndView();
		
		List<FreelanceSkillDto> skillListData = freelanceService.getSkill();
		List<FreelanceSkillDto> skillSelectList = freelanceService.getSkillSelect(freelance_id);
		mav.addObject("skillListData", skillListData);
		mav.addObject("skillSelectList", skillSelectList);
		mav.setViewName("jsonView");
		return mav;
	
	}
	
	@RequestMapping(value = "/updateCheckSkill.do", method = RequestMethod.POST)
	public ModelAndView updateCheckSkill(@RequestBody List<FreelanceSkillDto> checkedSkills ) {
		
		ModelAndView mav = new ModelAndView();
		
		
//		int deleteFreeSkill = freelanceService.deleteFreeSkill(checkedSkills.get(0).getFreelance_id());
		freelanceService.deleteFreeSkill(checkedSkills.get(0).getFreelance_id());
		for (int i =0; i<checkedSkills.size(); i++) {
			freelanceService.insertFreeSkill(checkedSkills.get(i));
//			int insertFreeSkill = freelanceService.insertFreeSkill(checkedSkills.get(i));
		}
		mav.setViewName("jsonView");
		return mav;
	
	}
	
	@RequestMapping(value = "/getOnlySkills.do", method = RequestMethod.GET)
	public ModelAndView getOnlySkills(@RequestParam("freelance_id") int freelance_id) {
		
		ModelAndView mav = new ModelAndView();
		
		FreelanceDto onlySkills = freelanceService.getOnlySkills(freelance_id);
		mav.addObject("onlySkills", onlySkills);
		mav.setViewName("jsonView");
		return mav;
	
	}
}
