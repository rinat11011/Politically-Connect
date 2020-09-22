package com.politiclyconnect.partyregisty.mongo.document;


import com.politiclyconnect.partyregisty.blockchain.noobchain.StringUtil;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.security.PublicKey;

@Document(collection = "parties")
@Data
public class PartyInformation {

    @Id
    private String id; //HashPartyId
    private String name;
    //public byte[] secretKey; // symetric key for encrypt the data, the public will encrypt the secretKey
  //  private PublicKey pubKey;
    private byte [] privKey;
    private byte [] pubKey;

    public PartyInformation() {
    }

    public PartyInformation(String p_name) {
        name = p_name;
        id = StringUtil.applySha256(name);
    }

    public PartyInformation(String p_name, String hash_name) {
        name = p_name;
        id = hash_name;
    }

//    public PartyInformation(String p_name, String hash_name,/* byte[] publicKey1, byte[] privateKey1,*/ byte[] secretKey1) {
//        name = p_name;
//        id = hash_name;
////        publicKey = publicKey1;
////        privateKey = privateKey1;
//        //secretKey = secretKey1;
//    }
    public PartyInformation(String p_name, String hash_name, byte[] privateKey1, PublicKey publicKey1) {
            name = p_name;
            id = hash_name;
          //  pubKey = publicKey1;
            pubKey = publicKey1.getEncoded();
            privKey = privateKey1;
        }

}
