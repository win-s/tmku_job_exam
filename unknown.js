const fs = require("fs");
const os = require("os");
fs.readFile("unknown_input.txt",'utf8',(err,data)=>{
    let ipList = data.split(os.EOL);
    let bitwiseAnd = ipList[0].split('.');
    let bitwiseInvertXOr = ipList[0].split('.');
    ipList.forEach(ip=>{
        let ipArr = ip.split('.');
        
        ipArr.forEach( (ipPortion,i)=>{
            if(networkIp[i]===null)networkIp[i] = ipPortion;
            else{
                networkIp = greatestEqualBit(networkIp,ipArr);
            }
        })
    });
    console.log(networkIp.join("."));
})
function greatestEqualBit(bitwiseAnd,bitwiseInvertXOr,ipArr){
    let rs = [];
    networkIp.forEach( (networkIpPortion,i)=>{
        let newNetworkProtionIp = Number(networkIpPortion) & Number( ipArr[i] );
        rs.push(newNetworkProtionIp); 
    });
    return rs;
}