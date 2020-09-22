package com.politiclyconnect.partyregisty.mongo.DBservices;


import com.politiclyconnect.partyregisty.mongo.document.PartyInformation;
import com.politiclyconnect.partyregisty.mongo.document.PublicKeys;
import com.politiclyconnect.partyregisty.mongo.repository.PublicKeysRepository;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;
import java.util.List;
import java.util.Optional;

@Service
public class PublicKeysService {
    private PublicKeysRepository publicKeysRepository;
//
//    @PostConstruct
//    public void init()
//    {
//        publicKeysRepository.deleteAll();
//    }

    public PublicKeysService(PublicKeysRepository publicKeysRepository1)
    {
        publicKeysRepository = publicKeysRepository1;
    }

    public void addPublicKey (PublicKeys pb) {
        publicKeysRepository.save(pb);
    }

    public void removePublicKey (List<String> parties)
    {
        for(String HashId : parties)
            publicKeysRepository.deleteById(HashId);
    }

    public PublicKey getPublicKey(String partyIdHashed) {
        Optional<PublicKeys> partyPublicKey  = publicKeysRepository.findById(partyIdHashed);
        if(partyPublicKey.isPresent())

            try {
                return KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec( partyPublicKey.get().getPublicKey()));
            } catch (InvalidKeySpecException e) {
                e.printStackTrace();
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            }
        return null;
    }
}
