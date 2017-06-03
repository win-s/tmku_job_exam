var https = require("https");

var a = [9,8,7,6,5,4,3,2,1,0];
var start = 0;
var end = 999999;
var searchId = 1153908843224;
var searchTime = 0;

https.get("https://jobs.taamkru.com/desperandro@gmail.com/dodorio/info",(res)=>{
    let data = "";
    res.setEncoding("utf8");
    res.on('data',(chunk)=>{
        data += chunk.toString();
    });
    res.on('end',(chunk)=>{
        if(chunk)data += chunk.toString();
        let rs = JSON.parse(data);
        console.log("time:%s",rs.valid_through);
        console.log("search:%s",rs.term);
        searchId = Number(rs.term);
        search();
    });
});

// search();

function search(){
    if(searchTime <= 25){
        searchTime++;

        let index = parseInt( (end + start)/2 );
        // id = search(index);
        console.log("index:%d",index);
        console.log("start:%d",start);
        console.log("end:%d",end);
        getData(index,(json)=>{
            let fileId = parseInt(json.data);
            if(fileId === searchId){
                console.log(index);
                https.get("https://jobs.taamkru.com/desperandro@gmail.com/dodorio/submit?data="+index,(res)=>{
                    let data = "";
                    res.setEncoding("utf8");
                    res.on('data',(chunk)=>{
                        data += chunk.toString();
                    });
                    res.on('end',(chunk)=>{
                        if(chunk)data += chunk.toString();
                        let rs = JSON.parse(data);
                        console.log("answer:%s",rs.status_message);
                    })
                });
            }
            else{
                if( fileId < searchId){
                    start = index + 1;
                }else{
                    end = index -1;
                }

                if(end < start)console.log("not found");
                else search();
            }
        });
    }
}
function getData(id,callback){
    https.get("https://jobs.taamkru.com/desperandro@gmail.com/dodorio/database/"+id,(res)=>{
        let data = "";
        res.setEncoding("utf8");
        res.on('data',(chunk)=>{
            data += chunk.toString();
        });
        res.on('end',(chunk)=>{
            if(chunk)data += chunk.toString();
            let rs = JSON.parse(data);
            console.log("data:%s",data);
            callback(rs);
        })
    });
}