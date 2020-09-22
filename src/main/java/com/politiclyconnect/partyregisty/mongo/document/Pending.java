package com.politiclyconnect.partyregisty.mongo.document;

import com.politiclyconnect.partyregisty.data.PrivateBlockData;
import com.politiclyconnect.partyregisty.data.PublicBlockData;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "pending")
public class Pending {

    @Id
    private String id;
    private PublicBlockData publicBlockData; // Map<String, String>
    private PrivateBlockData privateBlockData; //Map<String, List<String>>

    public Pending() {
        publicBlockData = new PublicBlockData();
        privateBlockData = new PrivateBlockData();
    }


}
