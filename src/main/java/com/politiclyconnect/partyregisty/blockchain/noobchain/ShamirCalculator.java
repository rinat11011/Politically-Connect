package com.politiclyconnect.partyregisty.blockchain.noobchain;

import com.codahale.shamir.Scheme;
import com.politiclyconnect.partyregisty.mongo.document.PartyInformation;

import javax.crypto.SecretKey;
import java.security.PrivateKey;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;

public class ShamirCalculator {

    static final Scheme scheme = new Scheme(new SecureRandom(), 3, 2);

//    public static Map<Integer, byte[]> splitShamir(PartyInformation partyInformation) {
//        //byte[] privateKey = partyInformation.getPrivateKey();
//        return scheme.split(privateKey);
//    }

//    public static Map<Integer, byte[]> splitShamir(SecretKey secKey) {
//        return scheme.split(secKey.getEncoded());
//    }
public static Map<Integer, byte[]> splitShamir(PrivateKey secKey) {
    return scheme.split(secKey.getEncoded());
}

    public static byte[] joinShamir(Map<Integer, byte[]> parts) {
        return scheme.join(parts);
    }

    public static byte [] reconstructPrivateKey(byte [] partyPart, byte[] mojPart)
    {
        Map<Integer, byte[]> parts = new HashMap<>();
        parts.put(1, partyPart);
        parts.put(2,mojPart);
        // we have the private key!!
        return ShamirCalculator.joinShamir(parts);
    }
}
