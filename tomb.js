// find result a + b

var a = "10,557,662,912,823,543,071,880,040,009,322,062,218,769,490,855,156,429,072,459,563,898,549,728,403,837,372,764,665,142,366,074,260,700,023,005,535,656,229,775,931,832,287,002,848,550,277,785,405,788,904,301".replace(/,/g,"");
var b = "5,279,056,293,131,170,679,371,482,618,562,912,498,378,771,083,788,392,995,586,522,789,877,925,079,820,876,073,092,851,502,657,642,898,841,905,722,458,548,917,327,728,329,080,823,575,678,532,501,630,115".replace(/,/g,"");
console.log(a);
a = a.split("").reverse();
b = b.split("").reverse();
console.log("a: "+a.join(""));
console.log("b: "+b.join(""));

var sum = "";
var add = 0;
var rs = 0;
var numberA ,numberB;
for(var i=0;i<a.length;i++){
    a[i] = a[i] || 0;
    b[i] = b[i] || 0;
    rs = add + ( Number(a[i]) + Number(b[i]) );

    sum = sum + rs%10;
    add = parseInt(rs/10);
    // console.log("%d %s %d",rs,sum,add);
}
if(add >0 )sum+= add;
console.log("reverse sum : %s",sum);
console.log("sum :%s",sum.split("").reverse().join(""));

//find 6 in the result
var count =0;
for(var i=0;i<sum.length;i++){
    count += ( sum[i] == 6 ? 1:0) ;
}
console.log(count);