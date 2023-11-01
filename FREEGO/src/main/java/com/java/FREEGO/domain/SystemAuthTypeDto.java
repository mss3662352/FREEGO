package com.java.FREEGO.domain;

public class SystemAuthTypeDto {
	private String authTypeCode;
	private String authTypeName;
	private int ord;
	
	public String getAuthTypeCode() {
		return authTypeCode;
	}
	public void setAuthTypeCode(String authTypeCode) {
		this.authTypeCode = authTypeCode;
	}
	public String getAuthTypeName() {
		return authTypeName;
	}
	public void setAuthTypeName(String authTypeName) {
		this.authTypeName = authTypeName;
	}
	public int getOrd() {
		return ord;
	}
	public void setOrd(int ord) {
		this.ord = ord;
	}
	@Override
	public String toString() {
		return "SystemAuthTypeDto [authTypeCode=" + authTypeCode + ", authTypeName=" + authTypeName + ", ord=" + ord
				+ "]";
	}
}
