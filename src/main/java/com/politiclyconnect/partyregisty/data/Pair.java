package com.politiclyconnect.partyregisty.data;

import lombok.Data;

@Data
public class Pair<T, R> {
    private T first;
    private R second;

    public Pair(T firstE, R secondE) {
        first = firstE;
        second = secondE;
    }

    public void setFirst(T newFirst)
    {
        first = newFirst;
    }
    public void setSecond(R newSecond) { second = newSecond; }
}
