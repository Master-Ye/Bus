function difparkpointdata(parkdata){
    var res = [];
    for(var i = 0;i<parkdata.length;i++){
        res.push({
            name: parkdata[i][1],
            value: parkdata[i][0].concat(parkdata[i][2])
        })
    }
    return res;
}
export default difparkpointdata;