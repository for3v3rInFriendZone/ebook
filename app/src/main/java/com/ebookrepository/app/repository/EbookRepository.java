package com.ebookrepository.app.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.ebookrepository.app.model.Ebook;


@Repository
public interface EbookRepository extends CrudRepository<Ebook, Long>{

}
