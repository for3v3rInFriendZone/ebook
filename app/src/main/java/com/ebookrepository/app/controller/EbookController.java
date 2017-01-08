package com.ebookrepository.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ebookrepository.app.model.Ebook;
import com.ebookrepository.app.model.Ebook;
import com.ebookrepository.app.repository.EbookRepository;


@RestController
@RequestMapping(value="/book")
public class EbookController {

	@Autowired
	EbookRepository bookRepo;
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Ebook>> getBooks() {

		List<Ebook> books = (List<Ebook>) bookRepo.findAll();
		return new ResponseEntity<List<Ebook>>(books, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Ebook> getBook(@PathVariable Long id) {

		Ebook ebook = bookRepo.findOne(id);
		return new ResponseEntity<Ebook>(ebook, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Ebook> editBook(@PathVariable("id") Long id, @RequestBody Ebook ebook) {

		Ebook editedBook = bookRepo.findOne(id);
		editedBook.setTitle(ebook.getTitle());
		editedBook.setAuthor(ebook.getAuthor());
		editedBook.setKeywords(ebook.getKeywords());
		editedBook.setPublication_year(ebook.getPublication_year());
		editedBook.setFilename(ebook.getFilename());
		editedBook.setMime(ebook.getMime());
		editedBook.setCategory(ebook.getCategory());
		editedBook.setLanguage(ebook.getLanguage());
		editedBook.setUser(ebook.getUser());
		
		bookRepo.save(editedBook);
		return new ResponseEntity<Ebook>(editedBook, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<Ebook> saveBook(@RequestBody Ebook ebook) {

		Ebook newBook = bookRepo.save(ebook);
		return new ResponseEntity<Ebook>(newBook, HttpStatus.CREATED);
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	public ResponseEntity<Ebook> deleteBook(@PathVariable("id") Long id) {

		bookRepo.delete(id);
		return new ResponseEntity<Ebook>(HttpStatus.OK);
	}
}
