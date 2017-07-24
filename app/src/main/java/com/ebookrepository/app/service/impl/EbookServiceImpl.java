package com.ebookrepository.app.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64; 
import java.util.ResourceBundle;

import org.apache.lucene.document.Document;
import org.apache.lucene.document.TextField;
import org.apache.lucene.document.Field.Store;
import org.apache.lucene.index.IndexableField;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ebookrepository.app.luceneUtil.IndexManager;
import com.ebookrepository.app.luceneUtil.UDDIndexer;
import com.ebookrepository.app.model.Ebook;
import com.ebookrepository.app.repository.EbookRepository;
import com.ebookrepository.app.service.EbookService;

@Service
public class EbookServiceImpl implements EbookService{

	@Autowired
	EbookRepository ebookRepo;
	
	@Override
	public Ebook save(Ebook ebook) throws IOException {
		// TODO Auto-generated method stub
		
		byte[] decodedPdf = Base64.getDecoder().decode(ebook.getFilename().split(",")[1].getBytes(StandardCharsets.UTF_8));
		Path destinationFile = Paths.get(ResourceBundle.getBundle("index").getString("docs"), ebook.getMime());
		Files.write(destinationFile, decodedPdf);
		
		File pdfFile = new File(ResourceBundle.getBundle("index").getString("docs"));
		UDDIndexer indexer = IndexManager.getInstance();
		indexer.index(pdfFile);
		
		Document[] docs = indexer.getAllDocuments();
		for(Document doc : docs) {
			if(ebook.getMime().equals(doc.get("fileName"))) {
				TextField title = new TextField("title", ebook.getTitle(), Store.YES);
				TextField author = new TextField("author", ebook.getAuthor(), Store.YES);
				TextField keyword = new TextField("keyword", ebook.getKeywords(), Store.YES);
				indexer.updateDocument(doc, title, author, keyword);
				break;
			}
		}
		
		ebook.setFilename(ebook.getMime());
		ebook.setMime("application/pdf");
		
		return ebookRepo.save(ebook);
	}

	@Override
	public Ebook findOne(Long id) {
		// TODO Auto-generated method stub
		return ebookRepo.findOne(id);
	}

	@Override
	public Iterable<Ebook> findAll() {
		// TODO Auto-generated method stub
		return ebookRepo.findAll();
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		ebookRepo.delete(id);
	}

	@Override
	public void delete(Ebook ebook) {
		// TODO Auto-generated method stub
		ebookRepo.delete(ebook);
	}

	@Override
	public void deleteAll() {
		// TODO Auto-generated method stub
		ebookRepo.deleteAll();
	}

	@Override
	public Ebook uploadPDF(Ebook ebook) throws IOException {
		
		byte[] decodedPdf = Base64.getDecoder().decode(ebook.getFilename().split(",")[1].getBytes(StandardCharsets.UTF_8));
		File tempFile = File.createTempFile("template", ".pdf", null);
		FileOutputStream fos = new FileOutputStream(tempFile);
		fos.write(decodedPdf);
		
		//temporary indexer, just to return metadata.
		UDDIndexer indexer = new UDDIndexer(true);
		indexer.index(tempFile);
		
		Document[] docs = indexer.getAllDocuments();
		String keywords = "";
		// TODO Ispisati rezultate pretrage
		for(Document doc : docs){
			for(IndexableField field : doc.getFields()){
				if(field.name().equals("id")) {
					ebook.setId(Long.parseLong(field.stringValue()));
				} else if(field.name().equals("title")) {
					ebook.setTitle(field.stringValue());
				} else if(field.name().equals("author")) {
					ebook.setAuthor(field.stringValue());
				} else if(field.name().equals("keyword")) {
					keywords = keywords + " " + field.stringValue();
				}	
			}
		}
		ebook.setKeywords(keywords);
		
		return ebook;
	}

	@Override
	public Ebook update(Long id, Ebook ebook) {
		
		Ebook editedBook = ebookRepo.findOne(id);
		
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
		
		UDDIndexer indexer = IndexManager.getInstance();
		
		Document[] docs = indexer.getAllDocuments();
		for(Document doc : docs) {
			if(ebook.getFilename().equals(doc.get("fileName"))) {
				Document docCopy = doc;
				TextField title = new TextField("title", editedBook.getTitle(), Store.YES);
				TextField author = new TextField("author", editedBook.getAuthor(), Store.YES);
				TextField keyword = new TextField("keyword", editedBook.getKeywords(), Store.YES);
				indexer.updateDocument(doc, title, author, keyword);
				break;
			}
		}
		
		ebookRepo.save(editedBook);
		
		return editedBook;
	}

}
