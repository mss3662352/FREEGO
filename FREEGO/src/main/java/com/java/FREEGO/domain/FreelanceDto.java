package com.java.FREEGO.domain;

import java.util.Date;

public class FreelanceDto {
	private int id;
	private String name;
	private Date registration_date;
	private String telephone;
	private Date birthday;
	private int gender;
	private String email;
	private String location;
	private int price;
	private String project;
	private String path;
	private String career;
	private String grade;
	private String skill_name;
	private String skill_level;
	private String skill_category;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Date getRegistration_date() {
		return registration_date;
	}
	public void setRegistration_date(Date registration_date) {
		this.registration_date = registration_date;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	public Date getBirthday() {
		return birthday;
	}
	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}
	public int getGender() {
		return gender;
	}
	public void setGender(int gender) {
		this.gender = gender;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public String getProject() {
		return project;
	}
	public void setProject(String project) {
		this.project = project;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getCareer() {
		return career;
	}
	public void setCareer(String career) {
		this.career = career;
	}
	public String getGrade() {
		return grade;
	}
	public void setGrade(String grade) {
		this.grade = grade;
	}
	public String getSkill_name() {
		return skill_name;
	}
	public void setSkill_name(String skill_name) {
		this.skill_name = skill_name;
	}
	public String getSkill_level() {
		return skill_level;
	}
	public void setSkill_level(String skill_level) {
		this.skill_level = skill_level;
	}
	public String getSkill_category() {
		return skill_category;
	}
	public void setSkill_category(String skill_category) {
		this.skill_category = skill_category;
	}
	@Override
	public String toString() {
		return "FreelanceDto [id=" + id + ", name=" + name + ", registration_date=" + registration_date + ", telephone="
				+ telephone + ", birthday=" + birthday + ", gender=" + gender + ", email=" + email + ", location="
				+ location + ", price=" + price + ", project=" + project + ", path=" + path + ", career=" + career
				+ ", grade=" + grade + ", skill_name=" + skill_name + ", skill_level=" + skill_level
				+ ", skill_category=" + skill_category + "]";
	}
	
	
}
