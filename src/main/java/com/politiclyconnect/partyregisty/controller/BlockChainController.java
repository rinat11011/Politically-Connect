package com.politiclyconnect.partyregisty.controller;

import com.politiclyconnect.partyregisty.mongo.document.Block;
import com.politiclyconnect.partyregisty.service.BlockChainService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("blockChain")
@AllArgsConstructor
public class BlockChainController {

    private BlockChainService blockChainService;

    @PostMapping("/mineBlock")
    public ResponseEntity<Boolean> createBlock() {
        boolean res = blockChainService.addNewBlock();
        return ResponseEntity.ok(res);
    }

    @GetMapping("/getChain")
    public ResponseEntity<Page<Block>> getChain(@RequestParam(required = false, defaultValue = "0") Integer pageNum,
                                                @RequestParam(required = false, defaultValue = "10") Integer pageSize) {// read from client current getChain web page
       return ResponseEntity.ok(blockChainService.getPageChain(pageNum, pageSize));
        //return  ResponseEntity.ok(blockChainService.getChain());
    }


}
