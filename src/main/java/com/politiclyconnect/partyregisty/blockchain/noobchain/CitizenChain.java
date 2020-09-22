package com.politiclyconnect.partyregisty.blockchain.noobchain;

import com.politiclyconnect.partyregisty.mongo.document.Block;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class CitizenChain {

    public static ArrayList<Block> blockchain = new ArrayList<>();

}
