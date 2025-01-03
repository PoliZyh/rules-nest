

import { Operation } from "src/interface/common.interface";


// export enum Operation {
//     Create = 0,
//     Delete = 1,
//     Update_Close = 2,
//     Update_Open = 3
// }

const OpMap = {
    [Operation.Create]: '创建',
    [Operation.Delete]: '删除',
    [Operation.Update_Close]: '关闭',
    [Operation.Update_Open]: '开启'
}
export function enum2operation(username: string, operation: Operation, ruleName: string) {
    return `${username}${OpMap[operation]}规则[${ruleName}]`
}