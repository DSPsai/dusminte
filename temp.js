// var input1 = 0;
// var stdin_input = ""
// process.stdin.on("data", function (input) {
//     stdin_input += input;
//     input1 = stdin_input.split("\n")[0]
//     input1 = input1.split(',')
//     main(input1)
// });
// function main(input) {
//     let temper = []
//     for (i of input) {
//         temper.push(parseInt(i))
//     }
//     console.log(temper)
//     input = temper
//     input = input.sort()
//     let temp = {}
//     for (let i of input) {
//         if (!temp[i])
//             temp[i] = []
//         temp[i].push(i)
//     }
//     temp = Object.values(temp)
//     let temp1 = [[], []]
//     for (let i of temp) {
//         if (i.length > 1) {
//             temp1[0].push(...i)
//         } else { temp1[1].push(...i) }
//     }
//     temp1 = temp1
//     console.log(temp1[1].length - (temp1[0].length - 1))
// }
// // 7,4,2,4,1,4,3,4
