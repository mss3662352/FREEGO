package com.java.FREEGO.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.java.FREEGO.domain.FreelanceCareerDto;
import com.java.FREEGO.domain.FreelanceCommonDto;
import com.java.FREEGO.domain.FreelanceDto;
import com.java.FREEGO.domain.FreelanceSkillDto;
import com.java.FREEGO.service.FreelanceService;
import com.java.FREEGO.service.FreelnaceRegisterService;

@Controller
@RequestMapping("/FREEGO/free")
public class FreeRegisterController {

	@Autowired
	FreelnaceRegisterService freelanceRegisterService; // 서비스와 의존관계 주입
	@Autowired
	FreelanceService freelanceService;

	private static final Logger LOGGER = LoggerFactory.getLogger(FreeRegisterController.class); //컨트롤러 클래스 내에서 사용할 로그

//  신규등록 팝업 insert
	@RequestMapping(value = "/regist.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	// regist.do로 들어오는 post 형식의 요청
	public @ResponseBody int insertFreelance(@RequestBody FreelanceDto freelanceDto) {
		// 메소드 선언 반환값이 integer 형식인 이유는 해당 DB에 미친 영향을 표시하기 위해서임
		// 메소드의 매개변수로 받은 부분은 FreelanceDto를 받음
		String p = "insertFreelance: ";

//		LOGGER.info(p + "insertFreelance: freelanceDto: {}", freelanceDto);

//		LOGGER.info(p + "insertFreelance: freelanceDto: {}", param); insertFreelance(map<String, Object> map);
		int result = freelanceRegisterService.insertFreelance(freelanceDto);
		// result라는 정수형 변수에 

		LOGGER.info(p + "insert id: {}", result);

		return result;
	}

	//	프리랜서 사진 업로드
	@RequestMapping(value = "/regist_image.do", method = RequestMethod.POST) // 리퀘스트 매핑을 사용하여 regist_image.do로 들어오는 post 방식의 요청을 받음
	public @ResponseBody int requestupload1(@RequestParam("upload_Image") MultipartFile uploadImage, @RequestParam("id") int id, HttpServletRequest request) {
		// 메소드 선언과 반환될 값이 integer 타입임, 파라미터의 값은 upload_Image를 받음, MultipartFile 스프링 클래스를 불러와 파일 데이터를 담아 uploadImage 매개변수에 담음
		String p = "requestupload1: ";
		int result = -1;
		LOGGER.info(p + "id: " + id);
		LOGGER.info(p + "uploadImage 확인 :" + uploadImage);
		
		if (uploadImage != null) { // uploadImage에 받은 파일이 null이 아니라면
			//받은 이미지파일 원본명
			LOGGER.info(p + "name 이미지파일이름:" + uploadImage.getOriginalFilename());
			LOGGER.info(p + "getContentType 이미지 확장자: " + uploadImage.getContentType());
			
			
			// 이미지 이름 중복 대책
			UUID uuid = UUID.randomUUID();
			String imageFileName = uuid.toString(); // toString 메소드를 사용하여 객체를 문자열로 변환
			LOGGER.info(p + "uuid 확인 {}", imageFileName);
			
			// 파일 저장 경로
			String uploadImageDiretory = request.getSession().getServletContext().getRealPath("/resources/uploadFiles/profile/freelance");
			// 문자열 변수 uploadImageDiretory를 선언
			// .getSession(): http 요청과 관련된 세션객체 얻는 부분, 세션은 클라이언트와 서버 간의 상태 정보를 유지하는 데 사용되며, 세션을 통해 데이터를 저장하고 공유할 수 있습니다.
			// .getRealPath(~ 주소): ServletContext 오브젝트에서 RealPath메소드를 사용해서 웹 내의 실제 파일 시스템경로를 얻음
			String path = "\\resources\\uploadFiles\\profile\\freelance\\";
			
			// 
			File uploadImagePath = new File(uploadImageDiretory);
			
			if (uploadImagePath.exists()) {
				uploadImagePath.mkdirs();
				
				LOGGER.info(p + "폴더: " + uploadImagePath);
				
				// 파일 저장
				String profileFileName = uuid + "_" + uploadImage.getOriginalFilename(); // uuid _ 파일명으로 변수 초기화
				File uploadImageFile = new File(uploadImageDiretory, profileFileName);
				
				// 경로 파일 저장 
				try {
					uploadImage.transferTo(uploadImageFile);
					LOGGER.info(p + "저장 : "+ uploadImageFile);

					String dbPath = path + profileFileName; // 파일 저장 경로와 uuid 파일명을 변수로 초기화
					LOGGER.info(p + "db에 저장할 경로: "+ dbPath);
					HashMap<String, Object> map = new HashMap<String, Object>(); // 해쉬맵 
					map.put("id", id);
					map.put("path", dbPath);
					result = freelanceRegisterService.updateProfileImagePath(map);
					LOGGER.info(p + "result: " + result);
				} catch (Exception e) { 
					e.printStackTrace(); // 예외 발생시 처리
				}
			}
			// 저장한 파일 경로(이름과 확장자 예. 20230728_132852_411.jpg, 이름: 20230728_132852_411, 확장자: .jpg) 가져오기
//			String imageFileExtension = name.substring(name.lastIndexOf("."), name.length());
//			LOGGER.info(p + "imageFileExtension 확인: {}", imageFileExtension);
		}

		return result;
	}
	
	
//	프리랜서 경력
	@RequestMapping(value="/regist_career.do", method = {RequestMethod.POST}, produces = "application/json;charset=UTF-8")
	// /regist_career.do url으로 들어온 post 방식의 http 요청을 처리함
	public @ResponseBody int insertFreelanceCareer(@RequestBody FreelanceCareerDto[] fCDto){
	// 
		String p = "insertFreelanceCareer: ";

//		LOGGER.info(p + "insertFreelance: freelanceCareerDto: {}", fCDto);

		int result = freelanceRegisterService.insertFreelanceCareer(fCDto);

		LOGGER.info(p + "insert result: {}", result);

		return result;
	}
	
	@RequestMapping(value="/freeSkillInsert.do", method = RequestMethod.GET)
	public ModelAndView getUpdateSkillList() {
		
		ModelAndView mav = new ModelAndView(); // 모델앤드뷰 객체를 참고 연산자로 초기화
		List<FreelanceSkillDto> skillListData = freelanceService.getSkill();
		System.out.println("skillListData :" + skillListData);
		mav.addObject("skillListData", skillListData);
		mav.setViewName("jsonView");
		return mav;
	
	}
	
	@RequestMapping(value = "/insertSkillList.do", method = RequestMethod.POST)
	public ModelAndView insertSkillList(@RequestBody List<FreelanceSkillDto> insertSkills) {
		
		ModelAndView mav = new ModelAndView();
		
		for (int i =0; i<insertSkills.size(); i++) {
			System.out.println("insertSkills.get(i).getFreelance_id() :" +insertSkills.get(i).getFreelance_id());
			System.out.println("insertSkills.get(i).getCode() :" +insertSkills.get(i).getCode());
//			int insertFreeSkill = freelanceService.insertFreeSkill(insertSkills.get(i));
			freelanceService.insertFreeSkill(insertSkills.get(i));
		}
		mav.setViewName("jsonView");
		return mav;
	
	}
	
	@RequestMapping(value="/getTask.do", method = RequestMethod.GET)
    public @ResponseBody ModelAndView getTask(){
		ModelAndView mav = new ModelAndView();
		List<FreelanceCommonDto> commonList = freelanceService.freeTask();

		mav.addObject("commonList", commonList);
		mav.setViewName("jsonView");
		return mav;
	}
}
