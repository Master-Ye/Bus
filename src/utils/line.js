function line(data){
    var res = [];
    for(var i = 0;i<data.length;i++){
        res.push({
            coords: [data[i][0],data[i][2]],
            name: data[i][1]+'——'+data[i][3],
            value: data[i][4],
            lineStyle:{
                width: data[i][4]/25+1.2,
                opacity: data[i][4]/25+0.3,
                curveness: 0.2,
            }
        })
    }
    return res;
}
export default line;