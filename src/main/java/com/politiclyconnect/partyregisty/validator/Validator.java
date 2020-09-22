package com.politiclyconnect.partyregisty.validator;

import com.politiclyconnect.partyregisty.blockchain.noobchain.CitizenChain;
import com.politiclyconnect.partyregisty.data.STATUS;
import com.politiclyconnect.partyregisty.mongo.DBservices.BlockCollectionService;
import com.politiclyconnect.partyregisty.mongo.DBservices.PendingService;
import com.politiclyconnect.partyregisty.mongo.document.Block;
import com.politiclyconnect.partyregisty.mongo.DBservices.PartiesInformationService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


@Component
public class Validator {
    private PendingService pendingService;
    private PartiesInformationService partiesInformationService;
    private BlockCollectionService blockCollectionService;

    public Validator(PendingService pendingService, PartiesInformationService partiesInformationService,
                     BlockCollectionService blockCollectionService) {
        this.pendingService = pendingService;
        this.partiesInformationService = partiesInformationService;
        this.blockCollectionService = blockCollectionService;
    }

    //TODO - check if party is active
    public STATUS checkValid(String candidateHashId, String partyHashedId, boolean addAction) {

        if (!partiesInformationService.exists(partyHashedId))
            return STATUS.FAILED_PARTY_NOT_EXISTS;
        if (pendingService.getPublicBlockData().getData() != null) {
            for (String waiting : pendingService.getPublicBlockData().getData().keySet()) {
                if (candidateHashId.equals(waiting))
                    return STATUS.FAILED_DUPLICATE;
            }
        }
        //ArrayList<Block> tempChain = CitizenChain.blockchain;
        List<Block> tempChain = blockCollectionService.getChain();
        for (int i = tempChain.size() - 1; i >= 0; i--) {
            STATUS status = getStatusAboutBlock(addAction, candidateHashId, partyHashedId, tempChain, i);
            if (status != null)
                return status;
        }
        if (addAction)
            return STATUS.SUCCESS;
        else
            return STATUS.FAILED_PERSON_NOT_EXISTS;
    }

    private STATUS getStatusAboutBlock(boolean addAction, String candidateHashId, String partyId, List<Block> tempChain, int i) {
        boolean isInBlock = tempChain.get(i).getPublicBlockData().getData().containsKey(candidateHashId);
        String party;
        if (isInBlock) {
            party = tempChain.get(i)
                    .getPublicBlockData()
                    .getData()
                    .get(candidateHashId);
            if (addAction)
                if (party.equals(""))
                    return STATUS.SUCCESS; // there is a remove action ant hence we can add.
                else
                    return STATUS.FAILED_DUPLICATE; // already exist in the System.
            else {
                if (party.equals(partyId))
                    return STATUS.SUCCESS;
                else
                    return STATUS.FAILED_WRONG_PARTY;
            }
        }
        return null;
    }
}