package com.java.FREEGO.domain;

public class MemberDto {
	private String password; //비밀번호
	private String name; //이름
	private String employee_number; //사원번호 아이디
	private String english_name; //영어이름
	private String phone_number; //휴대폰번호
	private String national_id;  //주민번호
	private String email; //이메일
	private String hobby; //취미
	private String skill; //특기
	private String address; //주소
	private String detail_address; //상세주소
	private String home_phone; //자택번호
	private String national_researcher_id; //국가연구번호
	private int gender; //성별
	private String nationality; //국적명
	private int local_foreigner_distinction; //내외국인
	private int lunar_birthday; //음,양력
	private int marriage_status; //결혼여부
	private String anniversary_date; //결혼 기념일
	private int number_of_children; //자녀수
	private String residence_type; //주거형태
	private String account_registration_date;//계정등록일
	private int owns_vehicle; //개인차량보유
	private int on_hold_status;//프로젝트 참여여부
	private String assigned_task_code; //담당업무 공통코드
	private String employment_status_code; //재직여부 공통코드
	private String comment; //비고
	private String location_code; //직원 근무위치 공통코드
	private String position_code; //직급,직위 공통코드
	private String responsibility_duty_code; //직책 공통코드
	private String career_declaration; //경력신고서 첨부파일 경로
	private String profile_photo; //사진 첨부파일 경로
	private int login_authority; //로그인 권한 여부
	private String department_code; //부서 공통코드
	private String authority_type_code; //권한 유형 공통코드
	private long id; //계정 pk값
	private String update_date; //업데이트된 날짜
	private String join_date; //입사일자
	private String highest_education;
	private String proof_education;
	private String resignation_date; //퇴사일자
	private int deleted; //삭제된 id면 1, 그렇지 않으면 0
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmployee_number() {
		return employee_number;
	}
	public void setEmployee_number(String employee_number) {
		this.employee_number = employee_number;
	}
	public String getEnglish_name() {
		return english_name;
	}
	public void setEnglish_name(String english_name) {
		this.english_name = english_name;
	}
	public String getPhone_number() {
		return phone_number;
	}
	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}
	public String getNational_id() {
		return national_id;
	}
	public void setNational_id(String national_id) {
		this.national_id = national_id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getHobby() {
		return hobby;
	}
	public void setHobby(String hobby) {
		this.hobby = hobby;
	}
	public String getSkill() {
		return skill;
	}
	public void setSkill(String skill) {
		this.skill = skill;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getDetail_address() {
		return detail_address;
	}
	public void setDetail_address(String detail_address) {
		this.detail_address = detail_address;
	}
	public String getHome_phone() {
		return home_phone;
	}
	public void setHome_phone(String home_phone) {
		this.home_phone = home_phone;
	}
	public String getNational_researcher_id() {
		return national_researcher_id;
	}
	public void setNational_researcher_id(String national_researcher_id) {
		this.national_researcher_id = national_researcher_id;
	}
	public int getGender() {
		return gender;
	}
	public void setGender(int gender) {
		this.gender = gender;
	}
	public String getNationality() {
		return nationality;
	}
	public void setNationality(String nationality) {
		this.nationality = nationality;
	}
	public int getLocal_foreigner_distinction() {
		return local_foreigner_distinction;
	}
	public void setLocal_foreigner_distinction(int local_foreigner_distinction) {
		this.local_foreigner_distinction = local_foreigner_distinction;
	}
	public int getLunar_birthday() {
		return lunar_birthday;
	}
	public void setLunar_birthday(int lunar_birthday) {
		this.lunar_birthday = lunar_birthday;
	}
	public int getMarriage_status() {
		return marriage_status;
	}
	public void setMarriage_status(int marriage_status) {
		this.marriage_status = marriage_status;
	}
	public String getAnniversary_date() {
		return anniversary_date;
	}
	public void setAnniversary_date(String anniversary_date) {
		this.anniversary_date = anniversary_date;
	}
	public int getNumber_of_children() {
		return number_of_children;
	}
	public void setNumber_of_children(int number_of_children) {
		this.number_of_children = number_of_children;
	}
	public String getResidence_type() {
		return residence_type;
	}
	public void setResidence_type(String residence_type) {
		this.residence_type = residence_type;
	}
	public String getAccount_registration_date() {
		return account_registration_date;
	}
	public void setAccount_registration_date(String account_registration_date) {
		this.account_registration_date = account_registration_date;
	}
	public int getOwns_vehicle() {
		return owns_vehicle;
	}
	public void setOwns_vehicle(int owns_vehicle) {
		this.owns_vehicle = owns_vehicle;
	}
	public int getOn_hold_status() {
		return on_hold_status;
	}
	public void setOn_hold_status(int on_hold_status) {
		this.on_hold_status = on_hold_status;
	}
	public String getAssigned_task_code() {
		return assigned_task_code;
	}
	public void setAssigned_task_code(String assigned_task_code) {
		this.assigned_task_code = assigned_task_code;
	}
	public String getEmployment_status_code() {
		return employment_status_code;
	}
	public void setEmployment_status_code(String employment_status_code) {
		this.employment_status_code = employment_status_code;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getLocation_code() {
		return location_code;
	}
	public void setLocation_code(String location_code) {
		this.location_code = location_code;
	}
	public String getPosition_code() {
		return position_code;
	}
	public void setPosition_code(String position_code) {
		this.position_code = position_code;
	}
	public String getResponsibility_duty_code() {
		return responsibility_duty_code;
	}
	public void setResponsibility_duty_code(String responsibility_duty_code) {
		this.responsibility_duty_code = responsibility_duty_code;
	}
	public String getCareer_declaration() {
		return career_declaration;
	}
	public void setCareer_declaration(String career_declaration) {
		this.career_declaration = career_declaration;
	}
	public String getProfile_photo() {
		return profile_photo;
	}
	public void setProfile_photo(String profile_photo) {
		this.profile_photo = profile_photo;
	}
	public int getLogin_authority() {
		return login_authority;
	}
	public void setLogin_authority(int login_authority) {
		this.login_authority = login_authority;
	}
	public String getDepartment_code() {
		return department_code;
	}
	public void setDepartment_code(String department_code) {
		this.department_code = department_code;
	}
	public String getAuthority_type_code() {
		return authority_type_code;
	}
	public void setAuthority_type_code(String authority_type_code) {
		this.authority_type_code = authority_type_code;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getUpdate_date() {
		return update_date;
	}
	public void setUpdate_date(String update_date) {
		this.update_date = update_date;
	}
	public String getJoin_date() {
		return join_date;
	}
	public void setJoin_date(String join_date) {
		this.join_date = join_date;
	}
	public String getHighest_education() {
		return highest_education;
	}
	public void setHighest_education(String highest_education) {
		this.highest_education = highest_education;
	}
	public String getProof_education() {
		return proof_education;
	}
	public void setProof_education(String proof_education) {
		this.proof_education = proof_education;
	}
	public String getResignation_date() {
		return resignation_date;
	}
	public void setResignation_date(String resignation_date) {
		this.resignation_date = resignation_date;
	}
	public int getDeleted() {
		return deleted;
	}
	public void setDeleted(int deleted) {
		this.deleted = deleted;
	}
	@Override
	public String toString() {
		return "MemberDto [password=" + password + ", name=" + name + ", employee_number=" + employee_number
				+ ", english_name=" + english_name + ", phone_number=" + phone_number + ", national_id=" + national_id
				+ ", email=" + email + ", hobby=" + hobby + ", skill=" + skill + ", address=" + address + ", detail_address=" + detail_address
				+ ", detail_address=" + detail_address + ", home_phone=" + home_phone + ", national_researcher_id="
				+ national_researcher_id + ", gender=" + gender + ", nationality=" + nationality
				+ ", local_foreigner_distinction=" + local_foreigner_distinction + ", lunar_birthday=" + lunar_birthday
				+ ", marriage_status=" + marriage_status + ", anniversary_date=" + anniversary_date
				+ ", number_of_children=" + number_of_children + ", residence_type=" + residence_type
				+ ", account_registration_date=" + account_registration_date + ", owns_vehicle=" + owns_vehicle
				+ ", on_hold_status=" + on_hold_status + ", assigned_task_code=" + assigned_task_code
				+ ", employment_status_code=" + employment_status_code + ", comment=" + comment + ", location_code="
				+ location_code + ", position_code=" + position_code + ", responsibility_duty_code="
				+ responsibility_duty_code + ", career_declaration=" + career_declaration + ", profile_photo="
				+ profile_photo + ", login_authority=" + login_authority + ", department_code=" + department_code
				+ ", authority_type_code=" + authority_type_code + ", id=" + id + ", update_date=" + update_date
				+ ", join_date=" + join_date + ", highest_education=" + highest_education + ", proof_education="
				+ proof_education + ", resignation_date=" + resignation_date + ", deleted=" + deleted + "]";
	}
	


}
