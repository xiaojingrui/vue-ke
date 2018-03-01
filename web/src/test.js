// let md5 = require('js-md5')

// console.log(md5.hex('123'))

// let md52 = require('../../server/src/md5')

// console.log(md52.md5Encrypt('123'))

// let obj = { a: 1, b: 2 }

// console.log(...obj)

let arr = [{ a: 1, type: 1 }, { a: 2, type: 1 }]

let filterArr = arr.filter(item => item.a === 1)

for (let item of filterArr) {
  item.a = 'aaaaaa'
}

console.log(arr)
