package com.politiclyconnect.partyregisty.mongo.DBservices;

import com.politiclyconnect.partyregisty.mongo.document.auth.ERole;
import com.politiclyconnect.partyregisty.mongo.document.auth.Role;
import com.politiclyconnect.partyregisty.mongo.document.auth.User;
import com.politiclyconnect.partyregisty.mongo.repository.auth.RoleRepository;
import com.politiclyconnect.partyregisty.mongo.repository.auth.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Optional;

@Service
public class AuthDBService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @PostConstruct
    public void init(){
        if(roleRepository.count() == 0) {
            Role user = new Role(ERole.ROLE_USER);
            Role mod = new Role(ERole.ROLE_MODERATOR);
            Role admin = new Role(ERole.ROLE_ADMIN);
            roleRepository.save(user);
            roleRepository.save(mod);
            roleRepository.save(admin);
        }
    }
    public String getPartyName(String username){
        Optional<User> user = userRepository.findByUsername(username);
        if(user.isPresent())
            return user.get().getPartyName();
        return "Error: didn't find user with the username ";
    }

    public void removeUsers(List<String> parties){
        for(String partyName: parties){
            if(userRepository.existsByPartyName(partyName)){
                userRepository.deleteByPartyName(partyName);
            }
        }
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return  userRepository.existsByEmail(email);
    }

    public Optional<Role> findByName(ERole roleUser) {
        return roleRepository.findByName(roleUser);
    }

    public void save(User user) {
        userRepository.save(user);
    }

}
