function addUniqueElements(arr1, arr2) {
    const set = new Set(arr2);
    for (let i = 0; i < arr1.length; i++) {
      if (!set.has(arr1[i])) {
        arr2.push(arr1[i]);
        set.add(arr1[i]);
      }
    }
  }
export default addUniqueElements;