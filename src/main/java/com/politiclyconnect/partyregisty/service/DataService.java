package com.politiclyconnect.partyregisty.service;

import com.politiclyconnect.partyregisty.data.EncryptedDataAndKey;
import org.apache.commons.codec.binary.Base64;
import com.politiclyconnect.partyregisty.blockchain.noobchain.CryptographyUtil;
import com.politiclyconnect.partyregisty.blockchain.noobchain.ShamirCalculator;
import com.politiclyconnect.partyregisty.blockchain.noobchain.StringByteConverter;
import com.politiclyconnect.partyregisty.blockchain.noobchain.StringUtil;
import com.politiclyconnect.partyregisty.mongo.DBservices.PartiesInformationService;
import com.politiclyconnect.partyregisty.mongo.document.Block;
import lombok.Data;
import org.bouncycastle.jce.spec.MQVPrivateKeySpec;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.EncryptedPrivateKeyInfo;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.*;

@Service
@Data
public class DataService {


    BlockChainService blockChainService;
    PartiesInformationService partiesInformationService;

    public DataService(BlockChainService blockChainService1, PartiesInformationService partiesInformationService1) {
        blockChainService = blockChainService1;
        partiesInformationService = partiesInformationService1;
    }

    //TODO: get party name but when we wil add user information we will use the login active.
    public List<String> getMembers(int pageNum,int pageSize,String privateKey, String nameParty) throws Exception {
        String shaParty = StringUtil.applySha256(nameParty);
        //byte[] key = ShamirCalculator.reconstructPrivateKey(partiesInformationService.getSecretKey(shaParty),partiesInformationService.getShamirMOJPart(shaParty));
        byte[] key = ShamirCalculator.reconstructPrivateKey(partiesInformationService.getPrivateKey(shaParty),partiesInformationService.getShamirMOJPart(shaParty));
        KeyFactory kf = KeyFactory.getInstance("RSA");
        PrivateKey privateKey1 = kf.generatePrivate(new PKCS8EncodedKeySpec(key)); //TODO: check if algorithm is ok.

        Cipher rsaCipher = Cipher.getInstance("RSA");
        rsaCipher.init(rsaCipher.DECRYPT_MODE,privateKey1);


        Cipher AesCipher = Cipher.getInstance("AES");

/*        Cipher AesCipher = Cipher.getInstance("AES");
        SecretKey secretKey = new SecretKeySpec(key, 0, key.length,"AES");
        AesCipher.init(Cipher.DECRYPT_MODE,secretKey);*/


        List<Block> blockChain = blockChainService.getChain();
        ArrayList<String> res = new ArrayList<>();
        for (Block block : blockChain) {
            List<EncryptedDataAndKey> blockParty = block.getPrivateBlockData().getPrivateBlockData().get(shaParty);
            if (blockParty == null)
                continue;
            for (EncryptedDataAndKey encodeData : blockParty) {
                byte[] encodedata = new byte[0];
                encodedata = new Base64().decode(encodeData.getEncryptedData().getBytes("UTF-8"));
                byte [] encodekey = new Base64().decode(encodeData.getEncryptedKey().getBytes("UTF-8"));//TODO: check if need the BASE64
                byte [] keyByte = rsaCipher.doFinal(encodekey);
                SecretKey secretKey = new SecretKeySpec(keyByte, 0, keyByte.length,"AES");
                AesCipher.init(Cipher.DECRYPT_MODE,secretKey);
                byte[] decrypted = AesCipher.doFinal(encodedata);
                res.add(new String(decrypted,"UTF-8"));
            }
        }

        if((pageNum+1)*pageSize <= res.size())
            return res.subList(pageSize*pageNum,(pageNum+1)*pageSize);
        return res;
    }


    public List<String> getAllMembers(String privateKey, String nameParty) throws Exception {
        String shaParty = StringUtil.applySha256(nameParty);
        //byte[] key = ShamirCalculator.reconstructPrivateKey(partiesInformationService.getSecretKey(shaParty),partiesInformationService.getShamirMOJPart(shaParty));
        byte[] key = ShamirCalculator.reconstructPrivateKey(partiesInformationService.getPrivateKey(shaParty),partiesInformationService.getShamirMOJPart(shaParty));
        KeyFactory kf = KeyFactory.getInstance("RSA");
        PrivateKey privateKey1 = kf.generatePrivate(new PKCS8EncodedKeySpec(key)); //TODO: check if algorithm is ok.

        Cipher rsaCipher = Cipher.getInstance("RSA");
        rsaCipher.init(rsaCipher.DECRYPT_MODE,privateKey1);


        Cipher AesCipher = Cipher.getInstance("AES");
        List<Block> blockChain = blockChainService.getChain();
        ArrayList<String> res = new ArrayList<>();
        for (Block block : blockChain) {
            List<EncryptedDataAndKey> blockParty = block.getPrivateBlockData().getPrivateBlockData().get(shaParty);
            if (blockParty == null)
                continue;
            for (EncryptedDataAndKey encodeData : blockParty) {
                byte[] encodedata = new byte[0];
                encodedata = new Base64().decode(encodeData.getEncryptedData().getBytes("UTF-8"));
                byte [] encodekey = new Base64().decode(encodeData.getEncryptedKey().getBytes("UTF-8"));//TODO: check if need the BASE64
                byte [] keyByte = rsaCipher.doFinal(encodekey);
                SecretKey secretKey = new SecretKeySpec(keyByte, 0, keyByte.length,"AES");
                AesCipher.init(Cipher.DECRYPT_MODE,secretKey);
                byte[] decrypted = AesCipher.doFinal(encodedata);
                res.add(new String(decrypted,"UTF-8"));
            }
        }

        return res;
    }
}
