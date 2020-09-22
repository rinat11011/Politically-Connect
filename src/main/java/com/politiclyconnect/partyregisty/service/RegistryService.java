package com.politiclyconnect.partyregisty.service;

import com.politiclyconnect.partyregisty.blockchain.noobchain.CryptographyUtil;
import com.politiclyconnect.partyregisty.blockchain.noobchain.ShamirCalculator;
import com.politiclyconnect.partyregisty.blockchain.noobchain.StringByteConverter;
import com.politiclyconnect.partyregisty.blockchain.noobchain.StringUtil;
import com.politiclyconnect.partyregisty.data.EncryptedDataAndKey;
import com.politiclyconnect.partyregisty.data.Person;
import com.politiclyconnect.partyregisty.data.STATUS;
import com.politiclyconnect.partyregisty.mongo.DBservices.PartiesInformationService;
import com.politiclyconnect.partyregisty.mongo.DBservices.PendingService;
import com.politiclyconnect.partyregisty.mongo.DBservices.PublicKeysService;
import com.politiclyconnect.partyregisty.validator.Validator;
import lombok.AllArgsConstructor;
import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.PublicKey;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

//import org.apache.commons.codec.digest.DigestUtils;

@Service
@AllArgsConstructor
public class RegistryService {
    private PendingService pendingService;
    public Validator validator;
    public PartiesInformationService partiesInformationService;
    public StringByteConverter stringByteConverter;
    private PublicKeysService publicKeysService;


    /**
     * sha
     * check if valid
     * if not valid blockChain -> nothing
     * if not valid pendings -> nothing
     * else
     * encrypt data
     * save privat encrypted data
     * save public sha
     * return all failures
     */
    public List<Person> registerCandidates(List<Person> candidates, boolean action) {

        candidates.forEach(person -> {
            String personIdsha = StringUtil.applySha256(person.getId());
            String partyIdHashed = StringUtil.applySha256(person.getParty());
            person.setStatus(validator.checkValid(personIdsha, partyIdHashed, action));
        });
        candidates.forEach(person -> {
            if (person.getStatus() == STATUS.SUCCESS) {
                String personIdsha = StringUtil.applySha256(person.getId());
                try {
                    if (action) { //if action = add, we will add the candidate to the private and the public blocks
                        addAction(person, personIdsha);
                    } else { // if action = remove we will add the candidate only to the public block
                        pendingService.addPublicData(personIdsha, "");
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

        return candidates.stream().
                filter(person -> person.getStatus() != STATUS.SUCCESS)
                .collect(Collectors.toList());
    }

    private void addAction(Person person, String personIdsha) throws Exception {
        //TODO: override to string
        String data = person.toString();
        System.out.println("************PERSON STRING: "+data);
        String partyIdHashed = StringUtil.applySha256(person.getParty());



        //Map<Integer, byte[]> parts = new HashMap<>();
        //parts.put(1, partiesInformationService.getSecretKey(partyIdHashed));
        //parts.put(2, partiesInformationService.getShamirMOJPart(partyIdHashed));



        // we have the private key!!
       // byte[] key = ShamirCalculator.joinShamir(parts);
        KeyGenerator keygen = KeyGenerator.getInstance("AES");
        keygen.init(128);
        SecretKey secretKey = keygen.generateKey();

        Cipher AesCipher = Cipher.getInstance("AES");
        //SecretKey secretKey = new SecretKeySpec(key, 0, key.length, "AES");
        AesCipher.init(Cipher.ENCRYPT_MODE, secretKey);


        byte[] encrypted_data = AesCipher.doFinal(data.getBytes());
        byte[] encryptedByteValue = new Base64().encode(encrypted_data);
        String encrypted_data_str = new String(encryptedByteValue);

        //encrypt secretKey using PublicKey
        //TODO: SWITCH TO PUBLICKEYS REPOSITORY
       //PublicKey pubKey = publicKeysService.getPublicKey(partyIdHashed);
       PublicKey pubKey = partiesInformationService.getPublicKey(partyIdHashed);
        if(pubKey == null)
            throw new Exception("Kapra");

        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.ENCRYPT_MODE, pubKey);
        String encryptedSecretKey = new String(new Base64().encode(cipher.doFinal(secretKey.getEncoded())));

        //save public sha
        pendingService.addPublicData(personIdsha, partyIdHashed);
        //save private encrypted data
        EncryptedDataAndKey edak = new EncryptedDataAndKey(encrypted_data_str,encryptedSecretKey);
        //pendingService.addPrivateData(partyIdHashed, encrypted_data_str);
        pendingService.addPrivateData(partyIdHashed, edak);
    }

    // TODO: Check if needed
    public List<String> printPending() throws Exception {
        List<String> to_string_list = new ArrayList<>();
        for (String partyIdHashed : pendingService.getPrivateBlockData().getPrivateBlockData().keySet()) {
/*            List<String> listOfValue = pendingService.getPrivateBlockData().getPrivateBlockData().get(partyIdHashed);
            for (String data : listOfValue) {
                to_string_list.add(data);
            }*/
            List<EncryptedDataAndKey> listOfValue = pendingService.getPrivateBlockData().getPrivateBlockData().get(partyIdHashed);
            for (EncryptedDataAndKey data : listOfValue) {
                to_string_list.add(data.getEncryptedData());
            }
        }
        return to_string_list;
    }

}