package com.java.FREEGO.sessionListener;

 
import java.util.HashSet;
import java.util.Set;
import java.util.logging.Logger;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import com.java.FREEGO.domain.MemberDto;


@WebListener
public class SessionConfig implements HttpSessionListener{

 
   // 사용자 세션을 저장할 Set

    private static final Set<HttpSession> activeSessions = new HashSet<>();
    private static final Logger logger = Logger.getLogger(SessionConfig.class.getName());


    @Override
    public void sessionCreated(HttpSessionEvent se) {
        HttpSession session = se.getSession();
        activeSessions.add(session);
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        HttpSession session = se.getSession();
        
        // 세션 제거 시 
        logger.info("Session destroyed: " + se.getSession().getId());
        
        activeSessions.remove(session);
    }

    // 중복 로그인 여부를 체크하는 메서드
    public static boolean isUserLoggedIn(long id) {

    	System.out.println("id : " + id);
        for (HttpSession session : activeSessions) {
            Object attribute = session.getAttribute("member");

            if (attribute instanceof MemberDto) {
            MemberDto existingUser = (MemberDto) attribute;
                if (existingUser.getId() == id) {
                    return true;
                }
            }
        }
        return false;
    }

    // 사용자 아이디로 세션을 가져오는 메서드
    public static HttpSession getSessionByUserId(long userId) {

    	System.out.println("userId : " + userId);
        for (HttpSession session : activeSessions) {
            Object attribute = session.getAttribute("member");

            if (attribute instanceof MemberDto) {
            	MemberDto memvo = (MemberDto) attribute;
                if (memvo.getId() == userId) {
                    return session;
                }
            }
        }
        return null;
    }


}