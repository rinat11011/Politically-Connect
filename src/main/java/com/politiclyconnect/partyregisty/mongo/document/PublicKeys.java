package com.politiclyconnect.partyregisty.mongo.document;

import java.security.PrivateKey;
import java.security.PublicKey;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "publicKeys")
public class PublicKeys {
    @Id
    private String  PartyId;
   // private PublicKey publicKey;
   private byte [] publicKey;


    public  PublicKeys(String party, PublicKey publicKey1)
    {
        PartyId = party;
        publicKey = publicKey1.getEncoded();
    }
}
