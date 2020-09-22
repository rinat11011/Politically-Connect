package com.politiclyconnect.partyregisty.mongo.repository;

import com.politiclyconnect.partyregisty.mongo.document.Block;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlockChainRepository extends MongoRepository<Block, String> {

}
