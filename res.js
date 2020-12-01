'use strict';

const { response } = require("express");

exports.ok = function(values, res){
    var data = {
        'status':200,
        'values':values
    };

     res.json(data);
     res.end();
};

//RESPONSE NESTED
exports.nested = function (values, res) {
    //akumulasi
    const hasil = values.reduce((akumulasikan, item)=>{
        //key group
        if(akumulasikan[item.name]){
            //buat variabel group nama
            const group = akumulasikan[item.name];
            //cek isi array
            if(Array.isArray(group.name_school)){
                //tambahkan value kedalam group
                group.name_school.push(item.name_school);
            }else{
                group.name_school = [group.name_school, item.name_school];
            }
        }else{
            akumulasikan[item.name] = item;
        }
        return akumulasikan;
    }, {});

    var data = {
        'status':200,
        'values':hasil
    };
    
    response.json(data);
    res.end();
};