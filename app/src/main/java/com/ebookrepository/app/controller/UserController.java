package com.ebookrepository.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.ebookrepository.app.model.User;
import com.ebookrepository.app.repository.UserRepository;


@RestController
@RequestMapping(value="/user")
public class UserController {

	@Autowired
	UserRepository userRepo;
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<User>> getUsers() {

		List<User> users = (List<User>) userRepo.findAll();
		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}
}
