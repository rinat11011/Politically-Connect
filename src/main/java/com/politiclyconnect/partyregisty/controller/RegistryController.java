package com.politiclyconnect.partyregisty.controller;

import com.politiclyconnect.partyregisty.data.Person;
import com.politiclyconnect.partyregisty.service.RegistryService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
@RequestMapping("registry")
@AllArgsConstructor
public class RegistryController {

    private RegistryService registryService;

    @PostMapping("/addregisters")
    public ResponseEntity<List<Person>> register(@RequestBody @Valid @NotNull List<Person> candidates) {
        return ResponseEntity.ok(registryService.registerCandidates(candidates, true));
    }

    @PostMapping("/removeregisters")
    public ResponseEntity<List<Person>> remove(@RequestBody @Valid @NotNull List<Person> candidates) {
        return ResponseEntity.ok(registryService.registerCandidates(candidates, false));
    }

    @PostMapping("/printPending")
    public ResponseEntity<List<String>> print() throws Exception {
        return ResponseEntity.ok(registryService.printPending());
    }
}
