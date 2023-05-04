 function line(data,index){
    var res = [];
    let tulicolor=[["#2764a5","#eb7f21"],["#2764a5","#379c3a"],["#2764a5","#c83537"],["#eb7f21","#379c3a"],["#eb7f21","#c83537"],["#379c3a","#c83537"]]
    let id=[["原始方案","全局优化方案"],["原始方案","偏好方案1"],["原始方案","偏好方案2"],["全局优化方案","偏好方案1"],["全局优化方案","偏好方案2"],["偏好方案1","偏好方案2"]]
    for(var i = 0;i<data.length;i++){
        var color,groupId;
        if(data[i][5]==='first')
            groupId = id[index][0],
            color = tulicolor[index][0]
        else
            groupId = id[index][1],
            color = tulicolor[index][1]
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