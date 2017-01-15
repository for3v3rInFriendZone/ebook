package com.ebookrepository.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ebookrepository.app.model.Category;
import com.ebookrepository.app.repository.CategoryRepository;
import com.ebookrepository.app.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService{

	@Autowired
	CategoryRepository cateRepo;
	
	@Override
	public Category save(Category category) {
		// TODO Auto-generated method stub
		return cateRepo.save(category);
	}

	@Override
	public Category findOne(Long id) {
		// TODO Auto-generated method stub
		return cateRepo.findOne(id);
	}

	@Override
	public Iterable<Category> findAll() {
		// TODO Auto-generated method stub
		return cateRepo.findAll();
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		cateRepo.delete(id);
	}

	@Override
	public void delete(Category category) {
		// TODO Auto-generated method stub
		cateRepo.delete(category);
	}

	@Override
	public void deleteAll() {
		// TODO Auto-generated method stub
		cateRepo.deleteAll();
	}

	
	
}
