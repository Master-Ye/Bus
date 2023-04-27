function  findarray(arr, name)
{
    const result = arr.find(element => element[1] === name);

    return result;
}
export default findarray;