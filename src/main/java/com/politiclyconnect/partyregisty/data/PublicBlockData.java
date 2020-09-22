package com.politiclyconnect.partyregisty.data;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class PublicBlockData {
    // <HashID - hash code build from candidate id, HashParty - hash code build from Party Name>
    private Map<String, String> data;

    public PublicBlockData() {

        data = new HashMap<>();
    }

    public void addPublicData(String key, String value) {
        if (!data.containsKey(key))
            data.put(key, value);
    }

}
