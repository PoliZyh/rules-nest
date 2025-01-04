import { VariableType } from "src/interface/common.interface";

const variableMap = {
    [VariableType.Int]: 'Int',
    [VariableType.Double]: 'Double',
    [VariableType.String]: 'String',
    [VariableType.Object]: 'Objection'
}

export function enum2type(variableType: VariableType) {
    return variableMap[variableType]
}