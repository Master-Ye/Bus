function findArray(arr,value) {
    arr.sort((a, b) => a[0] - b[0]); // 按照第一个元素的大小进行排序
    let left = 0, right = arr.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid][0] === value) {
        return mid;
      } else if (arr[mid][0] < 1) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return -1; // 如果没有找到符合条件的子数组，返回 -1
  }
export default findArray;