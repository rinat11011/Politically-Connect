package com.politiclyconnect.partyregisty.mongo.repository;

import com.politiclyconnect.partyregisty.mongo.document.Pending;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PendingRepository extends MongoRepository<Pending, String> {

}
