package com.ebookrepository.app.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.apache.lucene.document.Document;
import org.apache.lucene.index.IndexableField;
import org.apache.lucene.index.Term;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.ebookrepository.app.luceneUtil.StandardSearcher;
import com.ebookrepository.app.model.Ebook;
import com.ebookrepository.app.service.EbookService;


@RestController
@RequestMapping(value="/book")
public class EbookController {

	@Autowired
	EbookService bookSer;
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Ebook>> getBooks() {

		List<Ebook> books = (List<Ebook>) bookSer.findAll();
		return new ResponseEntity<List<Ebook>>(books, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Ebook> getBook(@PathVariable Long id) {

		Ebook ebook = bookSer.findOne(id);
		return new ResponseEntity<Ebook>(ebook, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<List<Ebook>> searchBook(@RequestBody Ebook ebook) {

		List<Ebook> listOfBooks = (List<Ebook>) bookSer.findAll();
		List<Ebook> returnList = new ArrayList<Ebook>();
		
		StandardSearcher standardSearcher = new StandardSearcher();
		Term searchByTitle = null;
		if(ebook.getTitle() != "") {
			searchByTitle = new Term("title", ebook.getTitle());
		}
		
		//Term searchTerm = new Term("title", ebook.getTitle());
		
		List<Document> standardDocs = standardSearcher.search(searchByTitle);
		
		if(standardDocs.size() == 0) {
			System.out.println("No document found.");
		}
		for(Document doc : standardDocs){
			for(IndexableField field : doc.getFields()){
				if(field.name().equals("title")) {
					for(Ebook book : listOfBooks) {
						if(book.getTitle().equals(field.stringValue())) {
							returnList.add(book);
						}
					}
				}
				//System.out.println(field.name() + ": " + field.stringValue());
			}
		}
		
		return new ResponseEntity<List<Ebook>>(returnList, HttpStatus.OK);
	}
	
	@RequestMapping(value="/pdf", method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<Ebook> getInfoFromPdf(@RequestBody Ebook ebook) throws IOException {
		
		return new ResponseEntity<Ebook>(bookSer.uploadPDF(ebook), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Ebook> editBook(@PathVariable("id") Long id, @RequestBody Ebook ebook) throws IOException {

		Ebook editedBook = bookSer.findOne(id);
		
		editedBook.setTitle(ebook.getTitle());
		editedBook.setAuthor(ebook.getAuthor());
		editedBook.setKeywords(ebook.getKeywords());
		editedBook.setPublication_year(ebook.getPublication_year());
		editedBook.setFilename(ebook.getFilename());
		editedBook.setMime(ebook.getMime());
		editedBook.setImage(ebook.getImage());
		editedBook.setCategory(ebook.getCategory());
		editedBook.setLanguage(ebook.getLanguage());
		editedBook.setUser(ebook.getUser());
		
		bookSer.save(editedBook);
		return new ResponseEntity<Ebook>(editedBook, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<Ebook> saveBook(@RequestBody Ebook ebook) throws IOException {

		Ebook newBook = bookSer.save(ebook);
		return new ResponseEntity<Ebook>(newBook, HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Ebook> deleteBook(@PathVariable("id") Long id) {

		bookSer.delete(id);
		return new ResponseEntity<Ebook>(HttpStatus.OK);
	}
}
