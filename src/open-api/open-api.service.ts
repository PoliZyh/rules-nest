import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenApiService {


  vars2Map(vars) {
    /**
     * [{
     *  varName: "a",
     *  value: 1
     * }]
     */
    let id = 1
    const res = {}
    vars.forEach(item => {
      res[id] = {
        varId: id++,
        varName: item.varName,
        value: item.value,
        type: item.type
      }
    })
    return res
  }



}
