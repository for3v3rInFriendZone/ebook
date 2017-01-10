package com.ebookrepository.app.luceneUtil;

import java.io.File;
import java.util.ResourceBundle;

import org.apache.lucene.document.Document;
import org.apache.lucene.index.IndexableField;

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

	}

}
