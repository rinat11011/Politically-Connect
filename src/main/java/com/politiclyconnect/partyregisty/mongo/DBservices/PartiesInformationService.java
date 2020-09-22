package com.politiclyconnect.partyregisty.mongo.DBservices;

import com.politiclyconnect.partyregisty.mongo.document.MOJShamirParty;
import com.politiclyconnect.partyregisty.mongo.document.PartyInformation;
import com.politiclyconnect.partyregisty.mongo.repository.MOJShamirRepository;
import com.politiclyconnect.partyregisty.mongo.repository.PartiesInformationRepository;
import com.politiclyconnect.partyregisty.mongo.repository.auth.UserRepository;
import lombok.Data;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.management.Query;
import javax.swing.text.html.Option;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Data
public class PartiesInformationService {

    PartiesInformationRepository partiesInformationRepository;
    MOJShamirRepository mojShamirRepository;
    AuthDBService authDBService;


    public PartiesInformationService(PartiesInformationRepository partiesInformationRepository, MOJShamirRepository mojShamirRepository,AuthDBService authDBService) {
        this.partiesInformationRepository = partiesInformationRepository;
        this.mojShamirRepository = mojShamirRepository;
        this.authDBService = authDBService;
    }

    @PostConstruct
    public void init() {
       // partiesInformationRepository.deleteAll();
       // mojShamirRepository.deleteAll();
    }

    public void addParty(PartyInformation party) {
        partiesInformationRepository.save(party);
    }

    // the string is sha_name
    public List<String> removeParties(List<String> parties) {
        List<String> removed_list = new ArrayList();

        for (String partyName : parties) {
            Optional<PartyInformation> partyInformationOptional = partiesInformationRepository
                    .findById(partyName);
            partyInformationOptional.ifPresent(party -> {
                partiesInformationRepository
                        .deleteById(partyName);
                removeShamirPart(partyName);
                removed_list.add(partyName);
            });
        }
        return removed_list;
    }

    public void removeUsers(List<String> parties){
        authDBService.removeUsers(parties);
    }

    public String getPartyName(String username) {
        return authDBService.getPartyName(username);
    }
    public List<PartyInformation> getParties() {
        return partiesInformationRepository.findAll();
    }

    public boolean exists(String partyHashId) {
        return partiesInformationRepository.findById(partyHashId).isPresent();
    }

//    public PublicKey getPublicKeyByPartyId(String partyId) {
//        Optional<PartyInformation> party = partiesInformationRepository.findById(partyId);
//        PublicKey publicKey = null;
//        try {
//            KeyFactory kf = KeyFactory.getInstance("RSA");
//            publicKey = kf.generatePublic(new X509EncodedKeySpec(party.get().getPublicKey()));
//        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
//            e.printStackTrace();
//        }
//        //maybe need ifPresent
//        return publicKey;
//    }

    public void addShamirPart(MOJShamirParty mojShamirParty) {
        mojShamirRepository.save(mojShamirParty);
    }

    public void removeShamirPart(String hash_name) {
        mojShamirRepository.deleteById(hash_name);
    }

    public byte[] getShamirMOJPart(String hash_name) {
        Optional<MOJShamirParty> shamir = mojShamirRepository.findById(hash_name);
        if (shamir.isPresent())
            return shamir.get().getShamir();
        return "".getBytes(); //TODO: check what to do in case where no record found
    }

    public byte[] getPrivateKey(String shaParty) {
        Optional<PartyInformation> party = partiesInformationRepository.findById(shaParty);
        if (party.isPresent())
            return party.get().getPrivKey();
        else
            return "".getBytes();//TODO: check what to do in case where no record found
    }

    public PublicKey getPublicKey(String partyIdHashed) {
        Optional<PartyInformation> party = partiesInformationRepository.findById(partyIdHashed);
        if (party.isPresent()) {
            try {
                return KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec( party.get().getPubKey()));
            } catch (InvalidKeySpecException e) {
                e.printStackTrace();
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            }
        }

        return null;//TODO: check what to do in case where no record found
    }

//    //for debuging
//    public byte[] getShamirPartyPart(String hash_name) {
//        Optional<PartyInformation> shamir = partiesInformationRepository.findById(hash_name);
//        if (shamir.isPresent())
//            return shamir.get().getPrivateKey();
//        else
//            return "".getBytes(); //TODO: check what to do in case where no record found
//    }

/*    public byte[] getSecretKey(String hash_name) {
        Optional<PartyInformation> party = partiesInformationRepository.findById(hash_name);
        if (party.isPresent())
            return party.get().getSecretKey();
        else
            return "".getBytes();//TODO: check what to do in case where no record found
    }*/


}
