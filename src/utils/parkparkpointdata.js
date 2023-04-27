
function parkparkpointdata(parkdata){
	var res = [];
	res.push({
		name: parkdata[1],
		value: parkdata[0].concat(parkdata[2])
	})
	return res;
}
export default parkparkpointdata;