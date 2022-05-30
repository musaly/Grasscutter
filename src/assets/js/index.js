// 分割数组，n为分割的数组长度，array为分割的数组
function splitArray(n, array){
    var newArray = []
    for (let i = 0; array.length > 0; i++){
    newArray.push(array.splice(0, n))
    }
    return newArray
  }

export default {
  splitArray
}
