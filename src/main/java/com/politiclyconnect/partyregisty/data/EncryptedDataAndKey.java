package com.politiclyconnect.partyregisty.data;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EncryptedDataAndKey {
    private String encryptedData;
    private String encryptedKey;
}
