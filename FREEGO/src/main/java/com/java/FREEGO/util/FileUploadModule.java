package com.java.FREEGO.util;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;



@Service
public class FileUploadModule {
	
	public HashMap<String, Object> uploadFile(MultipartFile file, String uploadPath, String saveDbPath) {
	    HashMap<String, Object> resultMap = new HashMap<>();

	    if (file.isEmpty()) {
	        resultMap.put("success", false);
	        return resultMap; // 파일이 업로드되지 않은 경우
	    }

	    String originalFilename = file.getOriginalFilename(); //파일원본명
	    String uniqueFilename = generateUniqueFileName(originalFilename); //uuid+파일원본명
	    String saveDbFilePath = saveDbFilePath(saveDbPath, uniqueFilename); //디비저장 경로 + uuid파일명
	    
	    resultMap.put("success", true);
	    resultMap.put("originalFilename", originalFilename);
	    resultMap.put("uniqueFilename", uniqueFilename);
	    resultMap.put("saveDbFilePath", saveDbFilePath);
	    
	    //경로 생성
	    try {
	        File uploadDirectory = new File(uploadPath);
	        if (!uploadDirectory.exists()) {
	            uploadDirectory.mkdirs();
	            System.out.println("uploadDirectory : " + uploadDirectory);
	        }
	        
	        //경로 파일 저장                           //  저장경로 , uuid파일명
	        File destination = new File(uploadPath, uniqueFilename);
	        file.transferTo(destination);
	        System.out.println("fileSave : " + file);
	        System.out.println("destination : " + destination);
	    } catch (IOException e) {
	        e.printStackTrace();
	        resultMap.put("success", false);
	    }
	    
	    return resultMap;
	}

	//uuid파일명 생성						//파일원본명
    public String generateUniqueFileName(String originalFilename) {
        String uuid = UUID.randomUUID().toString(); //uuid 생성
//        String extension = getFileExtension(originalFilename);
        
        System.out.println("originalFilename : " + originalFilename);
        return uuid + "_" + originalFilename;
    }
    
    //디비저장 경로 생성
    public String saveDbFilePath(String dbPath, String uuid) {
    	return dbPath + uuid;
    }
    
    //확장자 (필요하면 사용)
//    private String getFileExtension(String originalFilename) {
//        int lastIndex = originalFilename.lastIndexOf(".");
//        if (lastIndex == -1) {
//            return "";
//        }
//        return originalFilename.substring(lastIndex + 1);
//    }
    
    //경로에 저장된 파일 제거              // 삭제경로(경로+파일명)  , 경로 없을시 새로 생성될 저장 경로
    public boolean deleteFile(String deletefilePath,String uploadPath) {
        File file = new File(deletefilePath);
        System.out.println("file : " +  file);
        
        //삭제전 파일경로가 존재하는 체크(경로 없을시 생기는 오류 방지)
        if (file.exists()) {
            // 파일이 존재함
        	
            try { //삭제실행
                if (file.delete()) {
                    System.out.println("파일 삭제 성공: " + deletefilePath);
                    return true;
                } else {
                    System.out.println("파일 삭제 실패: " + deletefilePath);
                    return false;
                }
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        } else {
            // 파일이 존재하지 않음
            System.out.println("삭제할 파일이 존재하지 않습니다.");
            
            //경로 다시 생성
            File uploadDirectory = new File(uploadPath);
            //생성
			if(uploadDirectory.exists() == false) {
				uploadDirectory.mkdirs();
				
				System.out.println("저장경로 : " + uploadPath);
			}
    	    
            return true; // 파일이 없는 경우에도 성공 처리
        }
    }
}
