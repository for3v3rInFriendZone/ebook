package com.ebookrepository.app.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.ebookrepository.app.model.Language;

@Repository
public interface LanguageRepository extends CrudRepository<Language, Long>{

}
