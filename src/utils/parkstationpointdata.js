function stationpointdata(stationdata){
    var res = [];
    for(var i = 0;i<stationdata.length;i++){
        res.push({
            name: stationdata[i][1],
            value: stationdata[i][0]
        })
    }
    return res;
}
export default stationpointdata;