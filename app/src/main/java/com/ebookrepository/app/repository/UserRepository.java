package com.ebookrepository.app.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ebookrepository.app.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long>{ 
	
}
