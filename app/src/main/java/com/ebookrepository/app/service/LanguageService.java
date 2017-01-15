package com.ebookrepository.app.service;

import com.ebookrepository.app.model.Language;

public interface LanguageService {

	public Language save(Language lang);
	
	public Language findOne(Long id);
	
	public Iterable<Language> findAll();
	
	public void delete(Long id);
	
	public void delete(Language lang);
	
	public void deleteAll();
}
