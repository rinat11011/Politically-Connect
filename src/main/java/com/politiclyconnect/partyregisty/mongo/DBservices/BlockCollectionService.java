package com.politiclyconnect.partyregisty.mongo.DBservices;

import com.politiclyconnect.partyregisty.mongo.document.Block;
import com.politiclyconnect.partyregisty.mongo.repository.BlockChainRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
public class BlockCollectionService {
    private BlockChainRepository blockChainRepository;

    @PostConstruct
    public void init() {
        blockChainRepository.deleteAll();
    }

    public BlockCollectionService(BlockChainRepository blockChainRepository) {
        this.blockChainRepository = blockChainRepository;
    }

    public void addBlock(Block block) {
        blockChainRepository.save(block);
    }

    public List<Block> getChain() {
        return blockChainRepository.findAll();
    }

    public Page<Block> getPageChain(int pageNum, int pageSize) {
        return blockChainRepository.findAll(PageRequest.of(pageNum, pageSize));
    }
}
