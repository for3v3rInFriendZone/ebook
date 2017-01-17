package com.ebookrepository.app.luceneUtil;

import java.io.File;
import java.util.List;
import java.util.ResourceBundle;
import org.apache.lucene.document.Document;
import org.apache.lucene.index.IndexableField;
import org.apache.lucene.index.Term;


public class TestV4 {
	
	public static void main(String[] args) {
		/*
		 * Zavrstit sve handler-e i UDDIndexer.getHandler() metodu
		 * 		svi dokumenti moraju da imaju sledece metapodatke
		 * 			- text/sadrzaj
		 *  		- autor
		 *  		- kljucne reci
		 *  		- naslov - title
		 *  		- file name
		 *  		- location
		 *  
		 * indeksirati sve dokumente iz docs foldera
		 * 
		 * izvrsiti nekoliko proizvoljnih pretraga pomocu kojih ce se dobiti vecinu tih dokumenata
		 */
		
		
		File docsDir = new File(ResourceBundle.getBundle("index").getString("docs"));
		UDDIndexer indexer = new UDDIndexer(true);
		indexer.index(docsDir);
		/*
		Document[] docs = indexer.getAllDocuments();
		// TODO Ispisati rezultate pretrage
		for(Document doc : docs){
			for(IndexableField field : doc.getFields()){
				if(field.name().equals("text")) {
					System.out.println("text: ..."); //tekst je uglavnom predugacak, pa se zato preskace
					continue;
				}
				System.out.println(field.name() + ": " + field.stringValue());
			}
			System.out.println();
		}
	*/
		StandardSearcher standardSearcher = new StandardSearcher();
		
		Term searchTerm = new Term("text", "is one of the online resources for general movie information");
		
		List<Document> standardDocs = standardSearcher.search(searchTerm);
		
		if(standardDocs.size() == 0) {
			System.out.println("No document found.");
		}
		for(Document doc : standardDocs){
			for(IndexableField field : doc.getFields()){
				if(field.name().equals("text")) {
					System.out.println("text: ..."); //tekst je uglavnom predugacak, pa se zato preskace
					continue;
				}
				System.out.println(field.name() + ": " + field.stringValue());
			}
			System.out.println();
		}
	}

}
