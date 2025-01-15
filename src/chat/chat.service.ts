import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';  // 用于将 Observable 转换为 Promise

@Injectable()
export class ChatService {

  constructor(private readonly httpService: HttpService) { }

  // 测试版本
  async chat(message: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${process.env.CHAT_ADDRESS}/chatRules`, {
          message: message,
        })
      );
      return response.data.response;  // 获取OpenAI的回复
    } catch (error) {
      console.log(error)
      throw new Error('Failed to communicate with Python API');
    }
  }


  // 获取rule
  async chatForRules(message) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${process.env.CHAT_ADDRESS}/chatRules`, { message: message })
      );
      return response.data.response;  // 获取OpenAI的回复
    } catch (error) {
      console.log(error)
      throw new Error('Failed to communicate with Python API');
    }
  }


  // 拆分[变量解释]、[规则]、[逻辑解释]
  extractContent(data) {
    // 提取[变量解释]部分
    const variablePattern = /\[变量解释\](.*?)\[规则\]/s;
    const variableExplanation = data.match(variablePattern)?.[1].trim();

    // 提取[规则]部分
    const rulePattern = /\[规则\](.*?)\[逻辑解释\]/s;
    const rules = data.match(rulePattern)?.[1].trim();

    // 提取[逻辑解释]部分
    const logicPattern = /\[逻辑解释\](.*?)\[逻辑结束\]/s;
    const logicExplanation = data.match(logicPattern)?.[1].trim();

    // console.log(rules)

    return {
      variableExplanation,
      rules,
      logicExplanation
    };
  }

  rulesJson2Js(rules) {
    console.log('r', rules)
    const jsonString = rules
      .match(/```js\n([\s\S]+?)\n```/)[1]  // Extract everything inside ```js ... ```
      .replace(/^export default /, '');   // Remove the `export default` part

    // Step 2: Convert the JSON string into a JavaScript object
    const jsonObject = eval('(' + jsonString + ')');
    return jsonObject
  }

  varStr2Map(ruleStr) {
    const regex = /([^-\s]+)-([^-\s]+)-([^；\s]+)/g;

    let matches;
    const result = [];

    // Step 2: Loop through all matches and create the object array
    while ((matches = regex.exec(ruleStr)) !== null) {
      result.push({
        varName: matches[1],   // First part (before the first '-')
        description: matches[2], // Second part (between the first and second '-')
        type: matches[3]       // Third part (after the second '-')
      });
    }

    return result
  }


}
