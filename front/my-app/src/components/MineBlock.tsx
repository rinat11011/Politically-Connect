import React, {useEffect, useState} from "react";
import {Block} from "../Interfaces/Block";
import {stringify} from "querystring";

export const MineBlock = (props: any) => {
    const [res, setRes] = useState(false);
    const [blockChain, setBlockChain] = useState([]);
    const [click, setClick] = useState(false);

    async function Mining () {
        const header = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        const response = await fetch("/blockChain/mineBlock", {
            method: "POST",
            headers: header
        });
        response.json().then((r)=>setRes(r));
        console.log(res);
    }

    async function getChain() {
        const header = new Headers();
        header.append('Access-Control-Allow-Origin', '*');
        const response = await fetch("/blockChain/getChain", {
            method: "GET",
            headers: header
        });
        //console.log(response.json());
        setBlockChain(await response.json());
        setClick(true);
        console.log(blockChain);
    }
/*    function createLists()
    {
        const {cont: tt} : any = blockChain;
        return <ol>{tt.json().map((x : any,index: any)=> { const {id,hash,previousHash,merkleRoot,publicBlockData,privateBlockData,createdDate,nonce} =x; return <li key={index}> id: {id}, hash: {hash}, prev: {previousHash}, merkel: {merkleRoot} </li>})}</ol>
    }*/
        return (
        <div>
            <h1>Push to Mine:</h1>
            <button onClick={()=> Mining()}> CLICK HERE </button>
            <p> Status of mining : {res.valueOf()?"true" : "false"}</p>
            <h2>Push to get Chain:</h2>
            <button onClick={()=> getChain()}> CLICK HERE </button>
            {/*{createLists()}*/}
            {/*<ol>{blockChain.map((x,index)=>{const {id,hash,} = x; return <li key={index}>{id}</li>})}</ol>*/}
        </div>
    )
}
/*
private String id;
private String hash;
private String previousHash;
private String merkleRoot;
private PublicBlockData publicBlockData;
private PrivateBlockData privateBlockData;
@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
private Date createdDate;
private int nonce;*/
