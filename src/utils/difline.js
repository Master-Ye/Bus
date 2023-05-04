 function line(data,index){
    var res = [];
    for(var i = 0;i<data.length;i++){
        var color,groupId;
        if(data[i][5]==='raw')
            groupId = "原始方案",
            color = "#1f77b4"
        else
            groupId = index==1?"全局优化方案":"偏好方案",
            color = index==1?"#ff7f0e":"偏好方案"
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