package com.politiclyconnect.partyregisty.controller;


import com.politiclyconnect.partyregisty.data.Pair;
import com.politiclyconnect.partyregisty.mongo.document.PartyInformation;
import com.politiclyconnect.partyregisty.service.MOJService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
@RequestMapping("partiesInformation")
@AllArgsConstructor
public class MOJController {

    //PartiesInformationService partiesInformationService;
    MOJService mojService;

    @PostMapping("/addParty")
    public ResponseEntity<Pair<String, String>> addParty(@RequestParam @Valid @NotNull String parties) {
        Pair <String,String> pair = mojService.addParties(parties);
        return ResponseEntity.ok(pair);
        //TODO : return object(public key, shamirs party part of private key)
    }

    @PostMapping("/removeParty")
    public ResponseEntity<List<String>> removeParty(@RequestParam @Valid @NotNull List<String> parties) {
        return ResponseEntity.ok(mojService.removeParties(parties));
    }

    @GetMapping("/getPartyName")
    public ResponseEntity<String> removeParty(@RequestParam @Valid @NotNull String username) {
        return ResponseEntity.ok(mojService.getPartyName(username));
    }

    @GetMapping("/getParties")
    public ResponseEntity<List<PartyInformation>> getChain() {
        List<PartyInformation> lst = mojService.getParties();
        return ResponseEntity.ok(lst);
    }

}
