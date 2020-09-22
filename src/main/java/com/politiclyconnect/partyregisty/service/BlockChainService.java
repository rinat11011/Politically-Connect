package com.politiclyconnect.partyregisty.service;

import com.politiclyconnect.partyregisty.blockchain.noobchain.CalculateMarkleRoot;
import com.politiclyconnect.partyregisty.blockchain.noobchain.StringUtil;
import com.politiclyconnect.partyregisty.data.PrivateBlockData;
import com.politiclyconnect.partyregisty.data.PublicBlockData;
import com.politiclyconnect.partyregisty.mongo.DBservices.BlockCollectionService;
import com.politiclyconnect.partyregisty.mongo.DBservices.PendingService;
import com.politiclyconnect.partyregisty.mongo.document.Block;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

@Service
@Data
public class BlockChainService {
    BlockCollectionService blockCollectionService;
    String lastHashedBlock;
    PendingService pendingService;
    final int difficulty = 3;

    public BlockChainService(PendingService pendingService, BlockCollectionService blockCollectionService) {
        this.pendingService = pendingService;
        this.blockCollectionService = blockCollectionService;
    }

    @PostConstruct
    public void initFirstBlock() {
        lastHashedBlock = "Genesis";
        //pendingService.resetData();
        Block block = new Block("Genesis", new PublicBlockData(), new PrivateBlockData());
        try {
            mineBlock(block);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        blockCollectionService.addBlock(block);
        lastHashedBlock = block.getHash();
    }


    public boolean addNewBlock() {
        //no need to mine block if no actions were made
        if (pendingService.getPublicBlockData().getData().isEmpty())
            return false;
        String prev = getLastHashedBlock();
        PublicBlockData publicBlockData = pendingService.getPublicBlockData();
        PrivateBlockData privateBlockData = pendingService.getPrivateBlockData();

        Block newBlock = new Block(prev, publicBlockData, privateBlockData);
        try {
            mineBlock(newBlock);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        if (isChainValid()) {
            blockCollectionService.addBlock(newBlock);
            updateLast(newBlock.getHash());
            pendingService.resetData();
            return true;
        }
        return false;
    }

    public Boolean isChainValid() {
        Block currentBlock;
        Block previousBlock;
        ArrayList<Block> blockchain = new ArrayList<>(blockCollectionService.getChain());
        String hashTarget = new String(new char[difficulty]).replace('\0', '0');

        //loop through blockchain to check hashes:
        for (int i = 1; i < blockchain.size(); i++) {
            currentBlock = blockchain.get(i);
            previousBlock = blockchain.get(i - 1);
            //compare registered hash and calculated hash:
            String currentBlockHash = calculateHash(currentBlock);
            if (!currentBlock.getHash().equals(currentBlockHash)) {
                System.out.println("#Current Hashes not equal");
                return false;
            }
            //compare previous hash and registered previous hash
            if (!previousBlock.getHash().equals(currentBlock.getPreviousHash())) {
                System.out.println("#Previous Hashes not equal");
                return false;
            }
            //check if hash is solved
            if (!currentBlock.getHash().substring(0, difficulty).equals(hashTarget)) {
                System.out.println("#This block hasn't been mined");
                return false;
            }
        }
        System.out.println("Blockchain is valid");
        return true;
    }


    public void updateLast(String newHash) {
        lastHashedBlock = newHash;
    }

    public List<Block> getChain() {
        return blockCollectionService.getChain();
    }

    public Page<Block> getPageChain(int pageNum, int pageSize) {
        return blockCollectionService.getPageChain(pageNum, pageSize);
    }

    public String calculateHash(Block currentBlock) {
        return StringUtil.applySha256(currentBlock.getPreviousHash() +
                currentBlock.getCreatedDate().getTime() + currentBlock.getNonce() + currentBlock.getMerkleRoot());
    }

    public void mineBlock(Block currentBlock) throws NoSuchAlgorithmException {
        currentBlock.setMerkleRoot(CalculateMarkleRoot.calculateMarkleRoot(currentBlock.getPrivateBlockData(),
                currentBlock.getPublicBlockData()));
        String target = StringUtil.getDificultyString(difficulty); //Create a string with difficulty * "0"
        String hash = calculateHash(currentBlock);
        while (!hash.substring(0, difficulty).equals(target)) {
            currentBlock.setNonce(currentBlock.getNonce() + 1);
            hash = calculateHash(currentBlock);
        }
        currentBlock.setHash(hash);
        System.out.println("Block Mined!!! : " + hash);
    }


//	public static void print_chain() {
//		System.out.println("Our BlockChain:");
//		System.out.println("The Pending list: ");
//		int i = 0;
//		for (Pair<String, String> pendin : ) {
//			System.out.println("Number of pending: " + i);
//			System.out.println("--------------------------------------------------------------");
//			System.out.println("HashId: " + pendin.getFirst());
//			System.out.println("HashParty: " + pendin.getSecond());
//			System.out.println("EncryptedData: " + Pending.get(pendin));
//			System.out.println("--------------------------------------------------------------");
//		}
//		System.out.println("The Chain description:");
//		for (i = blockchain.size() - 1; i >= 0; i--) {
//			Block block = blockchain.get(i);
//			System.out.println("Number of Block: " + i);
//			System.out.println("---------------------------------------------------------------");
//			System.out.println("HashCode: " + block.getHash());
//			System.out.println("PrevHashCode: " + block.getPreviousHash());
//			System.out.println("Nnoce: " + block.getNonce());
//			System.out.println("Merkel root: " + block.getMerkleRoot());
//			System.out.println("----------------------------------------------------------------");
//		}
//
//	}


}
