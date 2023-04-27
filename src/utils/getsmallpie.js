function  getSmallPie (arr) {
let  res = [];
let j=0
for (let i = 2; i < arr.length; i++,j++) {

    res[j] = {
      value: arr[i][1],
      name: arr[i][0]
    };
  }
  return res;
}
export default getSmallPie;
