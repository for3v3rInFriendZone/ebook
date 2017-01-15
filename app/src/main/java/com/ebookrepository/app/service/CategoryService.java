package com.ebookrepository.app.service;

import com.ebookrepository.app.model.Category;

public interface CategoryService {

	public Category save(Category category);
	
	public Category findOne(Long id);
	
	public Iterable<Category> findAll();
	
	public void delete(Long id);
	
	public void delete(Category category);
	
	public void deleteAll();
}
