package com.java.HSmart.controller;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.fileUpload;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.SimpleFormatter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.mock.web.MockRequestDispatcher;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.java.FREEGO.domain.FreelanceCareerDto;
import com.java.FREEGO.domain.FreelanceDto;
import com.java.FREEGO.service.FreelanceService;

@WebAppConfiguration
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({
	"file:src/main/webapp/WEB-INF/spring/appServlet/servlet-context.xml",
	"file:src/main/webapp/WEB-INF/spring/appServlet/application-context.xml"
	})
public class FreeControllerTest {

	@Autowired
	private WebApplicationContext wac;
	private MockMvc mockMvc;
	
	@Autowired
	FreelanceService freelanceService;
	
	@Before
    public void setup() {
		mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
    }
	
	@Test
	public void testGetFreeList() throws Exception{
//		// 방법 1
//		int page = 	1;
//		String option = "N";
//		String keyword = "문";
//		
//		ModelAndView list = freeController.getFreeList(page, option, keyword);
//		assertTrue(((List<FreelanceDto>) list.getModel().get("list")).size()>0);
		
		// 방법 2
		MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/HSmart/free/list.do")
	            .param("page", "1")
	            .param("option", "N")
	            .param("keyword", "문상석"))
	            .andExpect(status().isOk()) // HTTP 응답 상태가 200인지 확인
	            .andReturn();

	    // 응답의 내용(JSON)을 확인하고 필요한 검증을 수행
	    String jsonResponse = result.getResponse().getContentAsString();

	    // JSON 데이터를 파싱하여 필요한 정보를 확인
	    JSONObject jsonObject = new JSONObject(jsonResponse);
	   
	    JSONArray jsonArray = jsonObject.getJSONArray("list");
	    List<FreelanceDto> list = new ArrayList<>();
	    for (int i = 0; i < jsonArray.length(); i++) {
	        // JSON 데이터에서 필요한 정보를 추출하여 FreelanceDto 객체로 변환하여 list에 추가
	        FreelanceDto dto = new FreelanceDto();
	        // dto에 정보 설정
	        list.add(dto);
	    }
	    System.out.println("목록 개수"+list.size());
	    // 테스트 검증 예제 (실제 값을 확인하도록 수정)
	    assertNotNull(list);
	    assertTrue(list.size() > 0);
	}
	
	
	@Test
	public void testGetListSkill() throws Exception{
		MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/HSmart/free/skillList.do")
					.param("id", "2")) // id 가 2일 때의 스킬 개수 
					.andExpect(status().isOk()) // HTTP 응답 상태가 200인지 확인
		            .andReturn();
		
		 String jsonResponse = result.getResponse().getContentAsString();

		    // JSON 데이터를 파싱하여 필요한 정보를 확인
		 JSONObject jsonObject = new JSONObject(jsonResponse);
		 
		 JSONArray jsonArray = jsonObject.getJSONArray("skillList");
		 List<FreelanceDto> skillList = new ArrayList<>();
		 
		    for (int i = 0; i < jsonArray.length(); i++) {
		        // JSON 데이터에서 필요한 정보를 추출하여 FreelanceDto 객체로 변환하여 list에 추가
		        FreelanceDto dto = new FreelanceDto();
		        // dto에 정보 설정
		        skillList.add(dto);
		        System.out.println(dto.getId()); 
		    }
		    System.out.println("skillList목록 개수"+skillList.size());
		    assertNotNull(skillList);
		    assertTrue(skillList.size() > 0); // id가 2일 때 스킬 개수는 4가 나와 성공
	}
	
	@Test
	public void testGetFreeUpdate() throws Exception{
		MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/HSmart/free/getFreeInfo.do")
					.param("freelance_id", "2")) // freelance_id 가 2일 때의 스킬 개수 
					.andExpect(status().isOk()) // HTTP 응답 상태가 200인지 확인
		            .andReturn();
		
		 String jsonResponse = result.getResponse().getContentAsString();
		 
		 JSONObject jsonObject = new JSONObject(jsonResponse);
		 
		 JSONObject getFreelance = jsonObject.getJSONObject("getFreelance");
		 
		 System.out.println("getFreelance : " + getFreelance);
		 assertNotNull(getFreelance);
	}
	
	@Test
	public void testGetFreeCareer() throws Exception{
		MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/HSmart/free/getFreeCareer.do")
					.param("freelance_id", "2")) // freelance_id 가 2일 때의 스킬 개수 
					.andExpect(status().isOk()) // HTTP 응답 상태가 200인지 확인
		            .andReturn();
		
		 String jsonResponse = result.getResponse().getContentAsString();

		    // JSON 데이터를 파싱하여 필요한 정보를 확인
		 JSONObject jsonObject = new JSONObject(jsonResponse);
		 JSONArray jsonArray = jsonObject.getJSONArray("careerList");
		 
		 List<FreelanceDto> careerList = new ArrayList<>();
	     for (int i = 0; i < jsonArray.length(); i++) {
	        // JSON 데이터에서 필요한 정보를 추출하여 FreelanceDto 객체로 변환하여 list에 추가
	        FreelanceDto dto = new FreelanceDto();
	        // dto에 정보 설정
	        careerList.add(dto);
	     }
	     // 테스트 검증 예제 (실제 값을 확인하도록 수정)
	     assertNotNull(careerList);
	     assertTrue(careerList.size() > 0); // id가 2일 때 스킬 개수는 4가 나와 성공
	}
	
	@Test
    public void testUpdateCareer() throws Exception {
		

        FreelanceCareerDto careerDto = new FreelanceCareerDto(); 
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        
        careerDto.setFreelance_id(4); // 유효한 경력 ID로 대체해주세요
        careerDto.setId(4); // 유효한 경력 ID로 대체해주세요
        careerDto.setTitle("TEST1");
        careerDto.setStart_date(sf.parse("1996-08-23"));
        careerDto.setEnd_date(sf.parse("1998-08-23"));
        careerDto.setClient("client1");
        careerDto.setTask("task1");
        careerDto.setComment("JAVA");
        
        
        mockMvc.perform(MockMvcRequestBuilders
                .post("/HSmart/free/updateCareer.do?id=" + 4)
                .content(asJsonString(careerDto))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
        System.out.println("asJsonString(careerDto) : " + asJsonString(careerDto));
	}
		
		
    // 객체를 JSON으로 변환하는 유틸리티 메서드
    private static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
