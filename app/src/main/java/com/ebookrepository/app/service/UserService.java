package com.ebookrepository.app.service;

import com.ebookrepository.app.model.User;

public interface UserService {

	public User save(User user);
	
	public User findOne(Long id);
	
	public Iterable<User> findAll();
	
	public void delete(Long id);
	
	public void delete(User user);
	
	public void deleteAll();
}
