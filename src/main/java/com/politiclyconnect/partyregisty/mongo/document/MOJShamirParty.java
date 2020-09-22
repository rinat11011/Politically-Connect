package com.politiclyconnect.partyregisty.mongo.document;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "MOJ")
public class MOJShamirParty {

    @Id
    String hash_name;
    //String shamir;
    byte[] shamir;

    public MOJShamirParty() {
        hash_name = "";
        //shamir = "";
    }

    public MOJShamirParty(String hashId, byte[] shamire) {
        hash_name = hashId;
        shamir = shamire;
    }
}
