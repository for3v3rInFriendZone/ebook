package com.ebookrepository.app.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.ebookrepository.app.model.Language;
import com.ebookrepository.app.service.LanguageService;

@RestController
@RequestMapping(value="/language")
public class LanguageController {

	@Autowired
	LanguageService langSer;
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Language>> getLanguages() {

		List<Language> languages = (List<Language>) langSer.findAll();
		return new ResponseEntity<List<Language>>(languages, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Language> getLanguage(@PathVariable Long id) {

		Language langauge = langSer.findOne(id);
		return new ResponseEntity<Language>(langauge, HttpStatus.OK);
	}
}
