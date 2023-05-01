 function line(data){
    var res = [];
    for(var i = 0;i<data.length;i++){
        var color,groupId;
        if(data[i][5]==='raw')
            groupId = "原始方案",
            color = "#db253e"
        else
            groupId = "偏好方案",
            color = "#6ab92c"
        res.push({
            coords: [data[i][0],data[i][2]],
            name: data[i][1]+'——'+data[i][3],
            value: [data[i][4], groupId],
            lineStyle:{
                color: color,
                width: data[i][4]/15+0.8,
                opacity: data[i][4]/25+0.1,
                curveness: 0.2,
            }
        })
    }
    return res;
}
export default line;