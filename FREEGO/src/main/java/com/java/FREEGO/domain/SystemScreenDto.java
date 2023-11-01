package com.java.FREEGO.domain;

public class SystemScreenDto {
	private String superMenu;
	private String submenu;
	private String screenId;
	private String screenName;
	public String getSuperMenu() {
		return superMenu;
	}
	public void setSuperMenu(String superMenu) {
		this.superMenu = superMenu;
	}
	public String getSubmenu() {
		return submenu;
	}
	public void setSubmenu(String submenu) {
		this.submenu = submenu;
	}
	public String getScreenId() {
		return screenId;
	}
	public void setScreenId(String screenId) {
		this.screenId = screenId;
	}
	public String getScreenName() {
		return screenName;
	}
	public void setScreenName(String screenName) {
		this.screenName = screenName;
	}
	@Override
	public String toString() {
		return "SystemScreenDto [superMenu=" + superMenu + ", submenu=" + submenu + ", screenId=" + screenId
				+ ", screenName=" + screenName + "]";
	}
}
