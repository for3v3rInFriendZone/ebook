package com.ebookrepository.app.luceneUtil;

public class IndexManager {

	private static UDDIndexer instance = null;

	private IndexManager() {

	}

	public static UDDIndexer getInstance() {
		if (instance == null) {
			instance = new UDDIndexer(true);
		}
		return instance;
	}
}
