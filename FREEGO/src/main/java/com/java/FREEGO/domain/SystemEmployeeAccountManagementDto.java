 package com.java.FREEGO.domain;

public class SystemEmployeeAccountManagementDto {
	private long id;
	private String name;
	private String position;
	private String employee_number;
	private String phone_number;
	private String employment_status;
	private String account_registration_date;
	private String last_login_date;
	private String authority_type;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	public String getEmployee_number() {
		return employee_number;
	}
	public void setEmployee_number(String employee_number) {
		this.employee_number = employee_number;
	}
	public String getPhone_number() {
		return phone_number;
	}
	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}
	public String getEmployment_status() {
		return employment_status;
	}
	public void setEmployment_status(String employment_status) {
		this.employment_status = employment_status;
	}
	public String getAccount_registration_date() {
		return account_registration_date;
	}
	public void setAccount_registration_date(String account_registration_date) {
		this.account_registration_date = account_registration_date;
	}
	public String getLast_login_date() {
		return last_login_date;
	}
	public void setLast_login_date(String last_login_date) {
		this.last_login_date = last_login_date;
	}
	public String getAuthority_type() {
		return authority_type;
	}
	public void setAuthority_type(String authority_type) {
		this.authority_type = authority_type;
	}
	@Override
	public String toString() {
		return "SystemEmployeeAccountManagementDto [id=" + id + ", name=" + name + ", position=" + position
				+ ", employee_number=" + employee_number + ", phone_number=" + phone_number + ", employment_status="
				+ employment_status + ", account_registration_date=" + account_registration_date + ", last_login_date="
				+ last_login_date + ", authority_type=" + authority_type + "]";
	}
}
