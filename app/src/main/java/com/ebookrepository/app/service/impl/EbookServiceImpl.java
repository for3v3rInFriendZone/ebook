package com.ebookrepository.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ebookrepository.app.model.Ebook;
import com.ebookrepository.app.repository.EbookRepository;
import com.ebookrepository.app.service.EbookService;

@Service
public class EbookServiceImpl implements EbookService{

	@Autowired
	EbookRepository ebookRepo;
	
	@Override
	public Ebook save(Ebook ebook) {
		// TODO Auto-generated method stub
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

}
