package com.ebookrepository.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.ebookrepository.app.model.Category;
import com.ebookrepository.app.model.User;
import com.ebookrepository.app.repository.CategoryRepository;

@RestController
@RequestMapping(value="/category")
public class CategoryController {

	@Autowired
	CategoryRepository cateRepo;
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Category>> getCategories() {

		List<Category> categories = (List<Category>) cateRepo.findAll();
		return new ResponseEntity<List<Category>>(categories, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Category> getCategory(@PathVariable Long id) {

		Category category = cateRepo.findOne(id);
		return new ResponseEntity<Category>(category, HttpStatus.OK);
	}
}
