// grouping of each host into network base on connection pair
// find smallest subnetmark for each networks

// groupingHostIntoNetwork({
//     hosts:[
//         "a",
//         "b",
//         "c",
//         "d",
//         "e"
//     ],
//     connection:[
//         ["a","b"],
//         ["b","d"],
//         ["c","e"],
//         ["a","c"]
//     ]
// });

const https = require("https");
const http = require("http");
const fs = require("fs");

https.get("https://jobs.taamkru.com/desperandro@gmail.com/regigigas/info",(res)=>{
    let chunks = [];
    res.setEncoding("utf8");
    res.on("data",(chunk)=>{
        chunks.push(chunk);
    });
    res.on("end",(chunk)=>{
        if(chunk)chunks.push(chunk);
        let response = JSON.parse(chunks.join(""));
        let ansHosts = response.hosts;
        let networks = groupingHostIntoNetwork(response);
        let hosts = assignNetworkAddress(networks);
        hosts.forEach(host=>{
            let i =ansHosts.indexOf( host.name );
            ansHosts[i] = host;
        });
        postAnswer({
            "hosts":ansHosts
        });
    });
});
function postAnswer(hosts){
    let ans = JSON.stringify(hosts);
    fs.writeFile("rock_cave_rs.json",ans,'utf8');
    let options = {
        path:"https://jobs.taamkru.com/desperandro@gmail.com/regigigas/submit",
        port:8888,
        method:"POST",
        host: "127.0.0.1",
        headers:{
            'Content-Type': 'application/json;charset=utf-8',
            'Content-Length': Buffer.byteLength(ans)
        }
    };
    // let options = {
    //     path:"/desperandro@gmail.com/regigigas/submit",
    //     host:"jobs.taamkru.com",
    //     port:443,
    //     method:"POST",
    //     headers:{
    //         'Content-Type': 'application/json; charset=utf-8',
    //         'Content-Length':ans.length
    //     }
    // };    
    
    let post_req = http.request(options,(res)=>{
        let data = [];
        res.setEncoding("utf8");
        res.on("data",(chunk)=>{
            data.push(chunk);
        });
        res.on("end",(res)=>{
            console.log( data.join("") );

        })
    });
    post_req.on("error",(err)=>{
        console.log(err);
    })
    post_req.write(ans);
    post_req.end();
}
function assignNetworkAddress(networks){
    let hosts = [];
    networks.forEach(( network,i)=>{
        let subnetmarkArr = [
            255,
            255,
            255,
            calSmallestSubnet(network)
        ];
        let subnetmark = subnetmarkArr.join(".");
        network.forEach( (host,j)=>{
            let ip = [
                192,
                168,
                i,
                j+1
            ];
            hosts.push({
                "name": host,
                "addr": ip.join("."),
                "subnet": subnetmark
            });
            // console.log("%s : %s",subnetmark,ip.join("."));
        });
    });
    
    return hosts;
}
function calSmallestSubnet(network){
    //assume that hosts per network's doesn't grater than 255
    let numHost = network.length;
    let binaryPosition = Math.ceil( Math.log(numHost)/Math.log(2) );
    if( Math.pow(2,binaryPosition)-2 < numHost ){
        binaryPosition++;
    }
    // console.log("pos:%d",binaryPosition);
    return 255-( Math.pow(2,binaryPosition)-1 );

}
function groupingHostIntoNetwork(response){
    let {
        hosts,
        connection
    } = response;
    console.log(hosts.length);
    console.log(connection.length);

    let networks = [];
    connection.forEach(pair=>{
        //pair host => a,b

        let networkIndex = findNetworkIndexs(pair,networks);
        // console.log(JSON.stringify(networks) );
        // console.log("index:",networkIndex);
        if( networkIndex[0] === -1 && networkIndex[1] === -1){
            //a,b doesn't exist 
            // add new network
            networks.push(pair);
        }else if( networkIndex[0] === -1 && networkIndex[1] !== -1 ){
            // b exist
            // add a to network of b
            let network = networks[ networkIndex[1] ];
            network.push( pair[0] );
        }else if( networkIndex[0] !==-1 && networkIndex[1] === -1 ){
            // a exist
            // add b to network of a
            let network = networks[ networkIndex[0] ];
            network.push( pair[1] );
        }else{
            // a,b have their own network
            // merge 2 network
            let networkA = networks[ networkIndex[0] ];
            let networkB = networks[ networkIndex[1] ];
            networks[ networkIndex[0] ] = networkA.concat(networkB);
            //remove netoworkB
            networks.splice( networkIndex[1], 1);
        }
    });
    console.log( JSON.stringify(networks) );
    return networks;
}
function insertIndex(item,network){
    let index = network.indexOf( item );
    return index === -1? network.length : index;
}
function findNetworkIndexs(pair,networks){
    let rs = [-1,-1];
    pair.forEach( (host,i)=>{
        networks.forEach( (network,networkIndex)=>{
            if( network.indexOf(host) !== -1 ){
                rs[i] = networkIndex;
            }
        } );
    });

    return rs;
}
