package com.politiclyconnect.partyregisty.mongo.document;

import com.politiclyconnect.partyregisty.data.PrivateBlockData;
import com.politiclyconnect.partyregisty.data.PublicBlockData;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@Document(collection = "blockchain")
public class Block {

    @Id
    private String id;
    private String hash;
    private String previousHash;
    private String merkleRoot;
    private PublicBlockData publicBlockData;
    private PrivateBlockData privateBlockData;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date createdDate;
    private int nonce;

    //Constructor
    public Block(String previousHash, PublicBlockData publicBlockData, PrivateBlockData privateBlockData) {
        hash = null;
        this.publicBlockData = publicBlockData;
        this.privateBlockData = privateBlockData;
        createdDate = new Date();
        this.nonce = 0;
        this.previousHash = previousHash;
    }

}
