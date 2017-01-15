package com.ebookrepository.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ebookrepository.app.model.User;
import com.ebookrepository.app.repository.UserRepository;
import com.ebookrepository.app.service.UserService;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	UserRepository userRepo;
	
	@Override
	public User save(User user) {
		// TODO Auto-generated method stub
		return userRepo.save(user);
	}

	@Override
	public User findOne(Long id) {
		// TODO Auto-generated method stub
		return userRepo.findOne(id);
	}

	@Override
	public Iterable<User> findAll() {
		// TODO Auto-generated method stub
		return userRepo.findAll();
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		userRepo.delete(id);
	}

	@Override
	public void delete(User user) {
		// TODO Auto-generated method stub
		userRepo.delete(user);
	}

	@Override
	public void deleteAll() {
		// TODO Auto-generated method stub
		userRepo.deleteAll();
	}

}
