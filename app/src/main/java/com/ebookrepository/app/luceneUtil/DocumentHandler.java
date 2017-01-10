package com.ebookrepository.app.luceneUtil;

import java.io.File;

import org.apache.lucene.document.Document;


public abstract class DocumentHandler {
	public abstract Document getDocument(File file) throws IncompleteIndexDocumentException;
}
