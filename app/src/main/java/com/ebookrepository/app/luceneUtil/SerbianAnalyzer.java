package com.ebookrepository.app.luceneUtil;

import java.io.Reader;

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.TokenStream;
import org.apache.lucene.analysis.Tokenizer;
import org.apache.lucene.analysis.core.StopFilter;
import org.apache.lucene.analysis.miscellaneous.ASCIIFoldingFilter;
import org.apache.lucene.analysis.snowball.SnowballFilter;
import org.apache.lucene.analysis.standard.StandardTokenizer;
import org.apache.lucene.util.Version;

public class SerbianAnalyzer extends Analyzer {

Version version;
	
	private static final String[] SERBIAN_STOP_WORDS = {
		"biti", "ne", 
		"jesam", "sam", "jesi", "si", "je", "jesmo", "smo", "jeste", "ste", "jesu", "su",
		"nijesam", "nisam", "nijesi", "nisi", "nije", "nijesmo", "nismo", "nijeste", "niste", "nijesu", "nisu",
		"budem", "budeš", "bude", "budemo", "budete", "budu",
		"budes",
		"bih",  "bi", "bismo", "biste", "biše", 
		"bise",
		"bio", "bili", "budimo", "budite", "bila", "bilo", "bile", 
		"ću", "ćeš", "će", "ćemo", "ćete", 
		"neću", "nećeš", "neće", "nećemo", "nećete", 
		"cu", "ces", "ce", "cemo", "cete",
		"necu", "neces", "nece", "necemo", "necete",
		"mogu", "možeš", "može", "možemo", "možete",
		"mozes", "moze", "mozemo", "mozete"};
	
	/*
	 * TODO
	 * prosiriti listu stop reci
	 */
	
	/**
	 * 
	 */
	public SerbianAnalyzer(Version version) {
		super();
		this.version = version;
	}
	
	public SerbianAnalyzer(){
		super();
		this.version = Version.LUCENE_4_9;
	}


	@Override
	protected TokenStreamComponents createComponents(String fieldName, Reader reader) {
		Tokenizer source = new StandardTokenizer(version,reader);
		//TokenStream result = new LowerCaseFilter(version, source);
		
		//TODO rezultat provuci kroz filtere redom
		//TODO filter za mala slova
		TokenStream result = new LCFilter(source);
		//TODO cirilica u latinicu filter
		result = new CyrilicToLatinFilter(result);
		//TODO filter stop reci
		result = new StopFilter(version, result, StopFilter.makeStopSet(version, SERBIAN_STOP_WORDS));
		//TODO filter snowball filter koji ce da upotrebi srpski stemmer
		result = new SnowballFilter(result, new SimpleSerbianStemmer());
		//TODO filter koji ce da ukloni akcente - ascii folding
		result = new ASCIIFoldingFilter(result);
		
		// redosled filtera je veoma bitan !!! zasto?
		return new TokenStreamComponents(source, result);
	}

}
