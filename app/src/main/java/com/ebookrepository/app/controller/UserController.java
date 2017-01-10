package com.ebookrepository.app.controller;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<User> getUser(@PathVariable Long id) {

		User user = userRepo.findOne(id);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<User> editUser(@PathVariable("id") Long id, @RequestBody User user) {

		User editedUser = userRepo.findOne(id);
		editedUser.setFirstname(user.getFirstname());
		editedUser.setLastname(user.getLastname());
		editedUser.setPassword(user.getPassword());
		editedUser.setImage(user.getImage());
		
		userRepo.save(editedUser);
		return new ResponseEntity<User>(editedUser, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	public ResponseEntity<User> deleteUser(@PathVariable("id") Long id) {

		userRepo.delete(id);
		return new ResponseEntity<User>(HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<User> saveUser(@RequestBody User user) throws IOException {
		/*
		byte[] decodedImg = Base64.getDecoder().decode(user.getImage().split(",")[1].getBytes(StandardCharsets.UTF_8));
		Path destinationFile = Paths.get("/home/martel/git/ebook/app/src/main/resource/booksPdf", "myImage.jpg");
		Files.write(destinationFile, decodedImg);
		*/		
		User newUser = userRepo.save(user);
		return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
	}
}
