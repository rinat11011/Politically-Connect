package com.politiclyconnect.partyregisty.mongo.DBservices;

import com.politiclyconnect.partyregisty.data.EncryptedDataAndKey;
import com.politiclyconnect.partyregisty.data.PrivateBlockData;
import com.politiclyconnect.partyregisty.data.PublicBlockData;
import com.politiclyconnect.partyregisty.mongo.document.Pending;
import com.politiclyconnect.partyregisty.mongo.repository.PendingRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
@Log4j2 //Lombok Log annotation
public class PendingService {

    private PendingRepository pendingRepository;

    @PostConstruct
    public void initPending() {
        pendingRepository.deleteAll();
        Pending pending = new Pending();
        pendingRepository.save(pending);
    }

    public PendingService(PendingRepository pendingRepository) {
        this.pendingRepository = pendingRepository;
    }

    public void addPublicData(String key, String value) {
        Pending pending = getPending();
        pending.getPublicBlockData().addPublicData(key, value);
        pendingRepository.save(pending);

    }

/*    public void addPrivateData(String key, String value) {
        Pending pending = getPending();
        pending.getPrivateBlockData().addPrivateData(key, value);
        pendingRepository.save(pending);
    }*/
    public void addPrivateData(String key, EncryptedDataAndKey value) {
        Pending pending = getPending();
        pending.getPrivateBlockData().addPrivateData(key, value);
        pendingRepository.save(pending);
    }

    private Pending getPending() {
        return pendingRepository.findAll().get(0);
    }

    public PrivateBlockData getPrivateBlockData() {

        try {
            Pending pending = getPending();
            return pending.getPrivateBlockData();
        } catch (Exception e) {
            log.error("Pending is NULL");
            return null;
        }
    }

    public PublicBlockData getPublicBlockData() {
        try {
            Pending pending = getPending();
            return pending.getPublicBlockData();
        } catch (Exception e) {
            log.error("Pending is NULL");
            return null;
        }
    }

    public void resetData() {
        List<Pending> optionalPending = pendingRepository.findAll();
        if (!optionalPending.isEmpty()) {
            initPending();
        }
    }
}
