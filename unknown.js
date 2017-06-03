//find smallest subnet mark from all ip (unknow_input.txt) in the same network
const fs = require("fs");
const os = require("os");
fs.readFile("unknown_input.txt",'utf8',(err,data)=>{
    let ipList = data.split(os.EOL);
    let networkIp = ipList[0].split('.');
    let subnetmark = [255,255,255,255];
    let numberOfNetworkBit = 0;
    let finish;
    ipList.forEach(ip=>{
        let ipArr = ip.split('.');
        finish = false;
        ipArr.forEach( (ipPortion,i)=>{
            
            if(finish){
                subnetmark[i] =0;
                networkIp[i] = 0;
            }
            else{
                subnetmark[i] = getSubnetMark(networkIp[i],ipPortion,subnetmark[i]);
                networkIp[i] = Number(ipPortion) & subnetmark[i];
            }

            if(subnetmark[i]!== 255){
                finish=true;
            }
        });
        
    });
    numberOfNetworkBit = calNumberNetworkBit(subnetmark);
    console.log(subnetmark.join("."));
    console.log(networkIp.join("."));
    console.log(numberOfNetworkBit);
})
function getSubnetMark(networkIpPortion,ipPortion,oldSubnetmarkPortion){
    let xor = Number(networkIpPortion) ^ Number(ipPortion);
    let subnetmark;
    if(xor===0){
        subnetmark = 255;
    }else{
        let notSubnetmarkNumber = xor.toString(2).length;
        subnetmark = 255 - ( Math.pow(2,notSubnetmarkNumber) -1);
        if(subnetmark > oldSubnetmarkPortion )subnetmark = oldSubnetmarkPortion ;
    }
    return subnetmark;
}
function calNumberNetworkBit(subnetmark){
    let numberOfNetworkBit = 0;
    let rs = 0;
    subnetmark.forEach(subnetmarkPortion=>{
        if( subnetmarkPortion === 255)rs+=8;
        else{
            numberOfNetworkBit = 8-(255-subnetmarkPortion).toString(2).length;
            rs += numberOfNetworkBit;
        }
    });
    return rs;
}