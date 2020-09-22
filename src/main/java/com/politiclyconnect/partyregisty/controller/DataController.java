package com.politiclyconnect.partyregisty.controller;

import com.google.gson.Gson;
import com.politiclyconnect.partyregisty.data.Person;
import com.politiclyconnect.partyregisty.data.STATUS;
import com.politiclyconnect.partyregisty.mongo.document.Block;
import com.politiclyconnect.partyregisty.service.DataService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("Data")
@AllArgsConstructor
public class DataController {

    DataService dataService;

    @GetMapping("/getMembersInformation")
    public ResponseEntity<List<Person>> getMembersData(@RequestParam @Valid @NotNull List<String> input,
                                                             @RequestParam Optional<Integer> pageNum,
                                                             @RequestParam Optional<Integer> pageSize)
    {
        try {
            List <String> members = dataService.getMembers(pageNum.orElse(0),pageSize.orElse(20),input.get(0),input.get(1));
            //List<String> new_members = new ArrayList<>();
            List<Person> new_members = new ArrayList<>();
            for(String member : members){
                String [] str = member.split(",");
                //String json = new Gson().toJson(Arrays.asList(str) );
                System.out.println(member);
                Person person = new Person(str[0],str[1],str[2],str[3], STATUS.SUCCESS,str[5],str[6],str[7],str[8],str[9],str[10],str[11],str[12],str[13]);
                //new_members.add(json);
                new_members.add(person);
            }
            return ResponseEntity.ok(new_members);
            //return ResponseEntity.ok(dataService.getMembers(pageNum.orElse(0),pageSize.orElse(10),input.get(0),input.get(1)));

        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(new ArrayList<>());
    }

    @GetMapping("/getAllMembersInformation")
    public ResponseEntity<List<Person>> getMembersData(@RequestParam @Valid @NotNull List<String> input)
    {
        try {
            List <String> members = dataService.getAllMembers(input.get(0),input.get(1));
            //List<String> new_members = new ArrayList<>();
            List<Person> new_members = new ArrayList<>();
            for(String member : members){
                String [] str = member.split(",");
                System.out.println(member);
                Person person = new Person(str[0],str[1],str[2],str[3], STATUS.SUCCESS,str[5],str[6],str[7],str[8],str[9],str[10],str[11],str[12],str[13]);
                //new_members.add(json);
                new_members.add(person);
            }
            return ResponseEntity.ok(new_members);
            //return ResponseEntity.ok(dataService.getMembers(pageNum.orElse(0),pageSize.orElse(10),input.get(0),input.get(1)));

        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(new ArrayList<>());
    }


}
