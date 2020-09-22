package com.politiclyconnect.partyregisty.blockchain.noobchain;

import com.politiclyconnect.partyregisty.data.PrivateBlockData;
import com.politiclyconnect.partyregisty.data.PublicBlockData;

import java.security.NoSuchAlgorithmException;

//import org.apache.commons.codec.digest.DigestUtils;

public class CalculateMarkleRoot {

    public static String calculateMarkleRoot(PrivateBlockData privateBlockData, PublicBlockData publicBlockData) throws NoSuchAlgorithmException {
        String publicStr = publicBlockData.toString();
        String privateStr = privateBlockData.toString();
        String all = publicStr + privateStr;
        String sha256hex = StringUtil.applySha256(all);

        return sha256hex;
    }
}