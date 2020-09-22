package com.politiclyconnect.partyregisty.service;

import com.politiclyconnect.partyregisty.Security.jwt.JwtUtils;
import com.politiclyconnect.partyregisty.Security.payload.requests.LoginRequest;
import com.politiclyconnect.partyregisty.Security.payload.requests.SignupRequest;
import com.politiclyconnect.partyregisty.Security.payload.responses.JwtResponse;
import com.politiclyconnect.partyregisty.Security.payload.responses.MessageResponse;
import com.politiclyconnect.partyregisty.Security.services.UserDetailsImpl;
import com.politiclyconnect.partyregisty.mongo.DBservices.AuthDBService;
import com.politiclyconnect.partyregisty.mongo.document.auth.ERole;
import com.politiclyconnect.partyregisty.mongo.document.auth.Role;
import com.politiclyconnect.partyregisty.mongo.document.auth.User;
import com.politiclyconnect.partyregisty.mongo.repository.auth.RoleRepository;
import com.politiclyconnect.partyregisty.mongo.repository.auth.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    AuthDBService authDBService;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    public JwtResponse signIn(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getPartyname(),
                userDetails.getEmail(),
                roles,
                userDetails.getUsername());
    }


    public ResponseEntity<MessageResponse> signUp(SignupRequest signUpRequest) {
        if (authDBService.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (authDBService.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getPartyName());

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = authDBService.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = authDBService.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "mod":
                        Role modRole = authDBService.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;
                    default:
                        Role userRole = authDBService.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        authDBService.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
