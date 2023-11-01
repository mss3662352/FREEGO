package com.java.FREEGO.domain;

import java.util.Date;

public class FreelanceRateDto {
	
	int id;
	String evaluation;
	int freelance_id;
	int employee_id;
	String e_name;
	Date registration_date;
	
	
	
	public Date getRegistration_date() {
		return registration_date;
	}
	public void setRegistration_date(Date registration_date) {
		this.registration_date = registration_date;
	}
	public String getE_name() {
		return e_name;
	}
	public void setE_name(String e_name) {
		this.e_name = e_name;
	}
	public int getEmployee_id() {
		return employee_id;
	}
	public void setEmployee_id(int employee_id) {
		this.employee_id = employee_id;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEvaluation() {
		return evaluation;
	}
	public void setEvaluation(String evaluation) {
		this.evaluation = evaluation;
	}
	public int getFreelance_id() {
		return freelance_id;
	}
	public void setFreelance_id(int freelance_id) {
		this.freelance_id = freelance_id;
	}
	@Override
	public String toString() {
		return "FreelanceRateDto [id=" + id + ", evaluation=" + evaluation + ", freelance_id=" + freelance_id
				+ ", employee_id=" + employee_id + ", e_name=" + e_name + "]";
	}
	
	
	
	
}
