// 数字转罗马
let intToRoman = function (num) {
    // 表明所需要的所有数字的对应关系表
    const map = {
        'M': 1000,
        'CM': 900,
        'D': 500,
        'CD': 400,
        'C': 100,
        'XC': 90,
        'L': 50,
        'XL': 40,
        'X': 10,
        'IX': 9,
        'V': 5,
        'IV': 4,
        'I': 1,
    }
    // 创建接受值
    const roman = [];
    // 使用 for in 来进行对象的遍历 , 得出的值名字叫 symbol
    for (const symbol in map) {
        // 使用 if 来判断 map 这个表里面是否有当前循环的 这个 symbol
        if (map.hasOwnProperty(symbol)) {
            // 如果有的情况, 则会走这里的代码

            // 用当前输入的值来进行判断 map 表中的当前值 是否 大于并且等于
            while (num >= map[symbol]) {
                // 如果满足条件, 则需要 num  =  num - map[symbol]
                num -= map[symbol];
                // 把得出的值给添加到 roman 这个数组中
                roman.push(symbol);
            }
        }
        // 上面的循环完毕之后, 会进行判断num 这个值是否已经 = 0 了. 等于了就给结束循环
        if (Number(num) === 0) {
            break;
        }
    }
    // 返回数组的roman的这个值, 然后用 join 的方法把数组转成 字符串
    return roman.join('');
};

// 罗马转数字
let romanToInt = function (s) {
    // s = IV
    // 定义字典 哈希 + 双指针
    let map = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    }
    // 定义结果
    let result = 0
    // 循环判断 , 判断所输入的值的长度是否等于 i
    // III
    for (let i = 0; i < s.length; i++) {
        // 定义当前值
        let front = s[i]   // I
        // 定义当前值往后一个的值
        let back = s[i + 1] // I
        // 判断 map 后面的当前值 是否小于 map 前面的当前值
        if (map[back] > map[front]) {
            result -= map[front]  // 小于的情况用减法  4 9
        } else {
            result += map[front]  // 大于的情况用加法  非 4 9
        }
    }
    // 返回结果
    return result
};

// 计算转换
let calculate = function (value) {
    // 1.转换成数组
    // 格式转换 以 \r\n 作为分割符号
    let snsArr = value.split(/[(\r\n)\r\n]+/);
    snsArr.forEach((item, index) => {
        if (!item) {
            snsArr.splice(index, 1);
        }
    })


    // console.log(snsArr);
    // let arr = ['III', 'IV', 'IX', 'LVIII', 'MCMXCIV', '64', '428', '3999']


    // 2. 判断是否是数字, 并且 push 到数组中
    let tempArr = []
    // 循环遍历当前获取的 数组
    snsArr.map(item => {
        // true // false
        if (isNum(item)) {
            // 是数字
            tempArr.push(intToRoman(item))
        } else {
            // 是罗马
            tempArr.push(romanToInt(item))
        }
    })

    // [ 3, 4, 9, 58, 1994, 'LXIV', 'CDXXVIII', 'MMMCMXCIX' ]

    // 3. 转换换行
    // 定义 接收值
    let arr2str = '';

    // 循环遍历 , tempArr 的长度 i 的长度 小于 tempArr 的长度, 则一直循环遍历下去
    for (let i = 0; i < tempArr.length; i++) {
        if (i === 0) {
            arr2str += tempArr[i];
        } else {
            arr2str += '\r\n' + tempArr[i];
        }
    }
    // 4. 返回换行后的值
    return arr2str
}

// 验证是否是数字   true  false
function isNum(s) {
    // 判断是否是数字  , 判断是否为空, 再判断是否为 ""
    if (s != null && s !== "") {
        return !isNaN(s);
    }
    return false;
}

// node 模块
const fs = require('fs');
// 读取⽂件
const input = fs.readFileSync('input.txt', {encoding: 'utf8'});

// 计算结果
let output = calculate(input);

// 写⼊⽂件
fs.writeFileSync('output.txt', output, {encoding: 'utf8'});
