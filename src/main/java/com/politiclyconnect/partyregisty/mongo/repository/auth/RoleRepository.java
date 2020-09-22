package com.politiclyconnect.partyregisty.mongo.repository.auth;

import java.util.Optional;

import com.politiclyconnect.partyregisty.mongo.document.auth.ERole;
import com.politiclyconnect.partyregisty.mongo.document.auth.Role;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}