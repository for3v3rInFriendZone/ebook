package com.ebookrepository.app.controller;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.ResourceBundle;

import org.apache.commons.io.FileUtils;
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
import com.ebookrepository.app.luceneUtil.UDDIndexer;
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
	
	@RequestMapping(value = "/search/{query}", method = RequestMethod.GET)
	public ResponseEntity<List<Ebook>> searchBook(@PathVariable String query) {

		List<Ebook> listOfBooks = (List<Ebook>) bookSer.findAll();
		List<Ebook> returnList = new ArrayList<Ebook>();
		StandardSearcher standardSearcher = new StandardSearcher();
		
		Term searchTerm = new Term("title", query);
		
		List<Document> standardDocs = standardSearcher.search(searchTerm);
		
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

		byte[] decodedPdf = Base64.getDecoder().decode(ebook.getFilename().split(",")[1].getBytes(StandardCharsets.UTF_8));
		Path destinationFile = Paths.get("C:\\Users\\Marko\\git\\ebook\\app\\src\\main\\resource\\booksPdf", ebook.getMime());
		Files.write(destinationFile, decodedPdf);
		
	//	FileUtils f;
		
		File docsDir = new File(ResourceBundle.getBundle("index").getString("docs"));
		UDDIndexer indexer = new UDDIndexer(true);
		indexer.index(docsDir);
		
		Document[] docs = indexer.getAllDocuments();
		String keywords = "";
		// TODO Ispisati rezultate pretrage
		for(Document doc : docs){
			for(IndexableField field : doc.getFields()){
				if(field.name().equals("title")) {
					ebook.setTitle(field.stringValue());
				} else if(field.name().equals("author")) {
					ebook.setAuthor(field.stringValue());
				} else if(field.name().equals("keyword")) {
					keywords = keywords + " " + field.stringValue();
				} else if(field.name().equals("fileName")) {
					/*byte[] decodedPdf2 = Base64.getDecoder().decode(ebook.getFilename().split(",")[1].getBytes(StandardCharsets.UTF_8));
					Path destinationFile2 = Paths.get("C:\\Users\\Marko\\git\\ebook\\app\\src\\main\\resource\\booksPdf", field.stringValue());
					Files.write(destinationFile2, decodedPdf2);*/
					ebook.setFilename(ebook.getMime());
				}
				
			}
		}
		ebook.setKeywords(keywords);
		ebook.setMime("application/pdf");
		
		return new ResponseEntity<Ebook>(ebook, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Ebook> editBook(@PathVariable("id") Long id, @RequestBody Ebook ebook) {

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
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	public ResponseEntity<Ebook> deleteBook(@PathVariable("id") Long id) {

		bookSer.delete(id);
		return new ResponseEntity<Ebook>(HttpStatus.OK);
	}
}
