package com.politiclyconnect.partyregisty.blockchain.noobchain;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.nio.charset.Charset;

//import org.apache.commons.codec.binary.Base64;

@Data
@Component
public class StringByteConverter {
    private static final Charset UTF8_CHARSET = Charset.forName("UTF-8");

    public static String decodeUTF8(byte[] bytes) {
        return new String(bytes, UTF8_CHARSET);
    }

    public static byte[] encodeUTF8(String string) {
        return string.getBytes(UTF8_CHARSET);
    }

}