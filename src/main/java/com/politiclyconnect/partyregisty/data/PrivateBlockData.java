package com.politiclyconnect.partyregisty.data;

import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data

public class PrivateBlockData {
    //<HashParty - Hash code built from Party Name, List of Encrypted data - hash code built from the candidate data>
    //private Map<String, List<String>> privateBlockData;
    private Map<String, List<EncryptedDataAndKey>> privateBlockData;
    public PrivateBlockData() {

        privateBlockData = new HashMap<>();
    }

/*    public void addPrivateData(String key, String value) {
        List<String> lst = privateBlockData.get(key);
        if (lst == null)
            lst = new ArrayList<String>();
        if (!lst.contains(value))
            lst.add(value);
        privateBlockData.put(key, lst);
    }*/
    public void addPrivateData(String key, EncryptedDataAndKey value) {
        List<EncryptedDataAndKey> lst = privateBlockData.get(key);
        if (lst == null)
            lst = new ArrayList<>();
        if (!lst.contains(value))
            lst.add(value);
        privateBlockData.put(key, lst);
    }

}
