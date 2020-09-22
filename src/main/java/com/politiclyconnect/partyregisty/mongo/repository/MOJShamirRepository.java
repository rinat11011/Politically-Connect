package com.politiclyconnect.partyregisty.mongo.repository;

import com.politiclyconnect.partyregisty.mongo.document.MOJShamirParty;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MOJShamirRepository extends MongoRepository<MOJShamirParty, String> {
}
