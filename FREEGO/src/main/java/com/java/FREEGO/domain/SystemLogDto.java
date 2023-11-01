package com.java.FREEGO.domain;

public class SystemLogDto {
	
	private String employee_number;
	private String log_date;
	private String ip;
	private String activity_code;
	

	public String getEmployee_number() {
		return employee_number;
	}
	public void setEmployee_number(String employee_number) {
		this.employee_number = employee_number;
	}
	public String getLog_date() {
		return log_date;
	}
	public void setLog_date(String log_date) {
		this.log_date = log_date;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getActivity_code() {
		return activity_code;
	}
	public void setActivity_code(String activity_code) {
		this.activity_code = activity_code;
	}
	@Override
	public String toString() {
		return "SystemLogDto [employee_number=" + employee_number + ", log_date=" + log_date + ", ip=" + ip
				+ ", activity_code=" + activity_code + "]";
	}
}
