package com.java.FREEGO.domain;

import java.util.Date;

public class FreelanceCareerDto {
	private int id;
	private String title;
	private Date start_date;
	private Date end_date;
	private String client;
	private String task;
	private String comment;
	private int freelance_id;

	
	
	public int getId() {
		return id;
	}

	public int getFreelance_id() {
		return freelance_id;
	}

	public void setFreelance_id(int freelance_id) {
		this.freelance_id = freelance_id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Date getStart_date() {
		return start_date;
	}

	public void setStart_date(Date start_date) {
		this.start_date = start_date;
	}

	public Date getEnd_date() {
		return end_date;
	}

	public void setEnd_date(Date end_date) {
		this.end_date = end_date;
	}

	public String getClient() {
		return client;
	}

	public void setClient(String client) {
		this.client = client;
	}

	public String getTask() {
		return task;
	}

	public void setTask(String task) {
		this.task = task;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}
	

	@Override
	public String toString() {
		return "FreelanceCareerDto [id=" + id + ", title=" + title + ", start_date=" + start_date + ", end_date="
				+ end_date + ", client=" + client + ", task=" + task + ", comment=" + comment + ", freelance_id="
				+ freelance_id + "]";
	}

}
