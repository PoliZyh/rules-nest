import { Positions } from "src/interface/common.interface";


const PositionsMap = {
    [Positions.Leader]: '队长',
    [Positions.Member]: '成员'

}

export function enum2positions(position: Positions) {
    return PositionsMap[position]
}