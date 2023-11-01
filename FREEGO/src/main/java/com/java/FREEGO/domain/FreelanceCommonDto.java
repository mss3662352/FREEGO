package com.java.FREEGO.domain;

public class FreelanceCommonDto {
	String name;
	String code;
	int ord;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public int getOrd() {
		return ord;
	}
	public void setOrd(int ord) {
		this.ord = ord;
	}
	
	@Override
	public String toString() {
		return "FreeCommonDto [name=" + name + ", code=" + code + ", ord=" + ord + "]";
	}

}
