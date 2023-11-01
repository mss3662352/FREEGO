package com.java.FREEGO.domain;

public class FreelanceSkillDto {
	private String skill_category;
	private String skill_name;
	private String code;
	private String name;
	private int skill_level_A;
	private int skill_level_B;
	private int skill_level_C;
	private int skill_sum;
	private String skill_level;
	private int freelance_id;
	private String level;
	
	public int getFreelance_id() {
		return freelance_id;
	}
	public void setFreelance_id(int freelance_id) {
		this.freelance_id = freelance_id;
	}
	public String getLevel() {
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public String getSkill_category() {
		return skill_category;
	}
	public void setSkill_category(String skill_category) {
		this.skill_category = skill_category;
	}
	public String getSkill_name() {
		return skill_name;
	}
	public void setSkill_name(String skill_name) {
		this.skill_name = skill_name;
	}
	public int getSkill_level_A() {
		return skill_level_A;
	}
	public void setSkill_level_A(int skill_level_A) {
		this.skill_level_A = skill_level_A;
	}
	public int getSkill_level_B() {
		return skill_level_B;
	}
	public void setSkill_level_B(int skill_level_B) {
		this.skill_level_B = skill_level_B;
	}
	public int getSkill_level_C() {
		return skill_level_C;
	}
	public void setSkill_level_C(int skill_level_C) {
		this.skill_level_C = skill_level_C;
	}
	public int getSkill_sum() {
		return skill_sum;
	}
	public void setSkill_sum(int skill_sum) {
		this.skill_sum = skill_sum;
	}
	public String getSkill_level() {
		return skill_level;
	}
	public void setSkill_level(String skill_level) {
		this.skill_level = skill_level;
	}
	
	@Override
	public String toString() {
		return "FreelanceSkillDto [skill_category=" + skill_category + ", skill_name=" + skill_name + ", code=" + code
				+ ", name=" + name + ", skill_level_A=" + skill_level_A + ", skill_level_B=" + skill_level_B
				+ ", skill_level_C=" + skill_level_C + ", skill_sum=" + skill_sum + ", skill_level=" + skill_level
				+ ", freelance_id=" + freelance_id + ", level=" + level + "]";
	}
}
