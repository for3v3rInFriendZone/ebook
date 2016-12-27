package com.ebookrepository.app.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ebookrepository.app.model.Category;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Long>{

}
