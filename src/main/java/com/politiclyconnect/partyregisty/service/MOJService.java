package com.politiclyconnect.partyregisty.service;

import com.politiclyconnect.partyregisty.blockchain.noobchain.CryptographyUtil;
import com.politiclyconnect.partyregisty.blockchain.noobchain.ShamirCalculator;
import com.politiclyconnect.partyregisty.blockchain.noobchain.StringByteConverter;
import com.politiclyconnect.partyregisty.blockchain.noobchain.StringUtil;
import com.politiclyconnect.partyregisty.data.Pair;
import com.politiclyconnect.partyregisty.mongo.DBservices.PartiesInformationService;
import com.politiclyconnect.partyregisty.mongo.DBservices.PublicKeysService;
import com.politiclyconnect.partyregisty.mongo.document.Block;
import com.politiclyconnect.partyregisty.mongo.document.MOJShamirParty;
import com.politiclyconnect.partyregisty.mongo.document.PartyInformation;
import com.politiclyconnect.partyregisty.mongo.document.PublicKeys;
import com.politiclyconnect.partyregisty.mongo.repository.PublicKeysRepository;
import lombok.Data;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.*;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

//change a-symmetric to symmetric for supporting candidate registration
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.PrivateKey;
import java.security.PublicKey;


@Service
@Data
public class MOJService {
    //change a-symmetric to symmetric for supporting candidate registration
    PublicKeysService publicKeysService;
    PartiesInformationService partiesInformationService;
    KeyPairGenerator keygen;


    public MOJService(PartiesInformationService partiesInformationService1, PublicKeysService publicKeysService1) throws NoSuchAlgorithmException {
        partiesInformationService = partiesInformationService1;
        publicKeysService = publicKeysService1;
        keygen  = KeyPairGenerator.getInstance("RSA");
    }

    // TODO: For Tracking on the parties for the MOJ functionality we need to add to the database of the tracking the new party
    // TODO: create document of MOJ include create shamir parts and return them via method
    //public List<Pair<String, String>> addParties(List<String> parties) {
    public Pair<String, String> addParties(String partyName) {
        //List<Pair<String, String>> shamir_list = new ArrayList<>();
        //for (String partyName : parties) {
            Pair<String, String> pair = new Pair<>("","");
            String hashId = StringUtil.applySha256(partyName);
            if (!partiesInformationService.exists(hashId)) {
                PartyInformation temp = new PartyInformation(partyName, hashId);

                //change a-symmetric to symmetric for supporting candidate registration
                KeyPair kp = keygen.generateKeyPair();
                Map<Integer, byte[]> shamir_parts = ShamirCalculator.splitShamir(kp.getPrivate());

                //Map<Integer, byte[]> shamir_parts = createAndEncryptSecretKey(temp);
                //call shamir algo
                //first shamir for the party
                //temp.setSecretKey(shamir_parts.get(1));
                temp.setPrivKey(shamir_parts.get(1));
                //temp.setPubKey(kp.getPublic());
                temp.setPubKey(kp.getPublic().getEncoded());
                //add party to db
                partiesInformationService.addParty(temp);
                //add public key to public collection
                PublicKeys publicKey = new PublicKeys(hashId,kp.getPublic());
                publicKeysService.addPublicKey(publicKey);
                //TODO: need to add the third part to our repo
                //add shamir party to MOJ repo
                MOJShamirParty mojShamirParty = new MOJShamirParty(hashId, shamir_parts.get(2));
                partiesInformationService.addShamirPart(mojShamirParty);
                //TODO: decide where to put our part of the shamir
                //Pair pair = new Pair<>(hashId, new String(shamir_parts.get(3)));
                //Pair pair = new Pair<>(partyName, StringByteConverter.decodeUTF8(shamir_parts.get(3)));
                //Pair<String, String> pair = new Pair<>(partyName, Base64.getEncoder().encodeToString(shamir_parts.get(3)));
                pair.setFirst(partyName);
                pair.setSecond(Base64.getEncoder().encodeToString(shamir_parts.get(3)));
                //Using when need to create Shamir
                //byte [] yosi = Base64.getDecoder().decode(pair.getSecond());
                //shamir_list.add(pair);
            //}
        }
            else{

            }
        //return shamir_list;
        return pair;
    }

//    private Map<Integer, byte[]> createAndEncryptSecretKey(PartyInformation temp) {
//        KeyGenerator KeyGen = null;
//        try {
//            KeyGen = KeyGenerator.getInstance("AES");
//
//            KeyGen.init(256);
//
//            SecretKey secKey = KeyGen.generateKey();
//
//            return ShamirCalculator.splitShamir(secKey);
//
//
//        } catch (NoSuchAlgorithmException e) {
//            e.printStackTrace();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        return null;
//    }

    public List<String> removeParties(List<String> parties) {
        partiesInformationService.removeUsers(parties);
        publicKeysService.removePublicKey(parties);
        return partiesInformationService.removeParties(parties.stream().map(StringUtil::applySha256).collect(Collectors.toList()));
    }

    public String getPartyName(String username){
        return partiesInformationService.getPartyName(username);
    }
    public List<PartyInformation> getParties() {
        return partiesInformationService.getParties();
    }

}
