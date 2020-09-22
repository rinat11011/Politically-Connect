package com.politiclyconnect.partyregisty.mongo.repository.auth;
import java.util.Optional;

import com.politiclyconnect.partyregisty.mongo.document.auth.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Boolean existsByPartyName(String partyName);

    void deleteByPartyName(String partyName);

}