import { Injectable } from '@nestjs/common';
import { CreateEngineDto } from './dto/create-engine.dto';
import { UpdateEngineDto } from './dto/update-engine.dto';
import { Variable } from 'src/variable/entities/variable.entity';
import { Any, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VariableType } from 'src/interface/common.interface';


@Injectable()
export class EngineService {

  // 匹配变量
  private readonly numberLetterPattern = /#(-?\d+)#(.+?)#/g;
  // 匹配输出
  private readonly dollarSignPattern = /\$(.*?)\$/g;

  private varsMap = {} //  '9': { varId: '9', varName: 'a', value: null, type: 1 }
  private outputs = []
  private readonly mapName = 'varsMap'
  private readonly propName = 'value'

  // 计算动作的名单
  private readonly caculateList = [
    VariableType.Int, VariableType.Double
  ]

  // 引擎errors
  private readonly errors = {
    'exeError': '[执行错误]: 请检测认规则语法或联系管理员',
    'varError': '[数据库错误]: 请检查变量是否在变量库中存在',
    'bracketError': '[括号失配]: 请检查规则的括号是否匹配'
  }

  // 空规则
  private readonly emptyRules = [
    // 先删除else if 最长匹配优先原则
    'else if(){}',
    'if(){}',
    'else{}'
  ]


  constructor(
    @InjectRepository(Variable) private readonly variable: Repository<Variable>
  ) { }


  // 初始化全局变量
  initGlobalVars() {
    this.varsMap = {}
    this.outputs = []
  }

  async runEngine(rule: string) {
    this.initGlobalVars()
    return await this.handleCatchErrors(rule)
  }


  /**
   * 第一层 异常捕获层
   */
  async handleCatchErrors(rule: string) {

    try {

      await this.handleGrammar(rule)

    } catch (error) {

      this.outputs = []
      this.outputs.push(error.message)

    }

    return this.outputs

  }

  /**
   * 第二层 语法解析层
   * 找出变量、输出语句
   * TODO 验证输入的语法正确性more
   */
  async handleGrammar(rule: string) {

    // 验证语法正确性
    if (!this.isBracketMatched(rule)) {
      throw new Error(this.errors.bracketError)
    }

    // 正则表达式匹配 #数字#字母# 的形式
    const numberLetterMatches = [];

    // 正则表达式匹配 $$ 内部的内容
    const dollarSignMatches = [];

    // 找到所有 #数字#字母 的匹配项
    let match;
    while ((match = this.numberLetterPattern.exec(rule)) !== null) {
      // 常量不需要存储
      if (match[1] == 0) continue
      numberLetterMatches.push({
        number: match[1],
        letter: match[2]
      });
    }

    // 找到 $$ 内部的匹配项
    while ((match = this.dollarSignPattern.exec(rule)) !== null) {
      dollarSignMatches.push(match[1]);
    }

    return await this.handleSemantics(rule, numberLetterMatches, dollarSignMatches)
  }


  /**
   * 第三层 语义解释层
   * 将rule字符串转换为可执行字符串
   * TODO 验证规则逻辑正确性
   */
  async handleSemantics(rule, varMatches, outputMatches) {
    let exeCode = this.removeEmptyRules(rule)

    // 记录变量
    this.varsMap = this.varMatches2Map(varMatches)


    // 将rule转换为code
    // 替换所有 #数字#字母 的匹配项
    exeCode = exeCode.replace(this.numberLetterPattern, (matchStr) => {
      let match = this.numberLetterPattern.exec(matchStr)
      // 重置 `lastIndex`，确保正则可以多次使用
      this.numberLetterPattern.lastIndex = 0;

      return this.var2MapString(match[1], match[2])
    })

    // 替换所有 $输出$ 的匹配项
    exeCode = exeCode.replace(this.dollarSignPattern, (matchStr) => {
      let match = this.dollarSignPattern.exec(matchStr)
      this.dollarSignPattern.lastIndex = 0
      let typeStr = match[1]
      if (typeStr == typeStr.replace(/\.value/g, '.type')) {
        // 常量
        return `this.collectOutputs(${match[1]}, ${VariableType.String})`
      } else {
        typeStr = typeStr.replace(/\.value/g, '.type')
        return `this.collectOutputs(${match[1]}, ${typeStr})`
      }

      
    })


    return await this.dataViste(exeCode)


  }


  /**
   * 第四层 数据访问层
   *  从数据库检索变量等数据
   *  验证数据访问的正确性
   */
  async dataViste(exeCode) {

    // 遍历Map挂载变量value
    for (const key of Object.keys(this.varsMap)) {
      await this.handleMountVars(+key)
    }


    return await this.executeCode(exeCode)

  }



  /**
   * 第五层 执行层
   *  执行处理好的可执行代码
   *  将输出信息返回给用户
   */
  async executeCode(exeCode) {

    // const testStr = 'leti a = 1'
    // console.log(exeCode)

    try {

      eval(exeCode)

    } catch (error) {
      console.log(error)

      throw new Error(this.errors.exeError)

    }

    return this.outputs

  }



  /**
   * 将Matches映射为varsMap
   */
  varMatches2Map(matches) {
    const varsMap = {}
    matches.forEach(match => {
      varsMap[match.number] = {
        varId: match.number,
        varName: match.letter,
        value: null
      }
    });
    return varsMap
  }

  /**
   * 将变量映射为Map字符串
   */
  var2MapString(varId, val) {
    // varId==0 常量
    return varId == 0 ? `${val.toString()}`
    : `this.${this.mapName}[${varId}].${this.propName}`
  }

  /**
   * 收集输出
   */
  collectOutputs(outputStr, typeStr) {
    const type = eval(typeStr)
    if (this.caculateList.includes(type)) {
      return this.outputs.push(eval(outputStr))
    } else if (type == VariableType.String) {
      return this.outputs.push(eval(`(() => { return ${JSON.stringify(outputStr)}; })()`))
    }
  }


  /**
   */
  async findVarById(id: number) {
    const info = await this.variable.findOne({
      where: { id }
    })
    return info
  }

  /**
   * 将变量信息挂载到引擎上
   */
  async handleMountVars(varId: number) {

    if (varId == 0) {
      // id为0则表明为常量

    
    } else {
      // 存储于数据库的变量
      const varInfo = await this.findVarById(varId)
      this.varsMap[varId].type = varInfo.variableType

      // 异常处理-数据库出错
      try {

        this.varsMap[varId].value =
          this.caculateList.includes(varInfo.variableType) ?
            +varInfo.default : varInfo.default

      } catch {

        throw new Error(this.errors.varError)

      }
    }



  }

  /**
   * 删除空白规则
   */
  removeEmptyRules(rule) {
    this.emptyRules.forEach(emptyRule => {
      rule = rule.replaceAll(emptyRule, '')
    })
    return rule
  }

  /**
   * 检查左右括号是否匹配
   */
  isBracketMatched(str: string) {
    const stack = []; // 用于存储左括号
    const brackets = {
      '(': ')',
      '[': ']',
      '{': '}',
    };

    for (let char of str) {
      if (brackets[char]) {
        // 如果是左括号，入栈
        stack.push(char);
      } else if (Object.values(brackets).includes(char)) {
        // 如果是右括号，检查栈顶是否匹配
        if (stack.length === 0 || brackets[stack.pop()] !== char) {
          return false; // 不匹配
        }
      }
    }

    // 栈为空则表示完全匹配
    return stack.length === 0;
  }




  /**
   * openAPI下无需数据库直接执行
   */
  async runEngineUnderOpenAPI(rule, vars) {
    // 初始化
    this.initGlobalVars()

    // 异常处理
    try {

      await this.handleGrammarUnderOpenAPI(rule, vars)

    } catch (error) {

      this.outputs = []
      this.outputs.push(error.message)

    }

    return this.outputs

  }

  async handleGrammarUnderOpenAPI(rule, vars) {

    // 验证语法正确性
    if (!this.isBracketMatched(rule)) {
      throw new Error(this.errors.bracketError)
    }

    // 替换varId
    rule = rule.replace(this.numberLetterPattern, (matchStr) => {
      let match = this.numberLetterPattern.exec(matchStr)
      // 重置 `lastIndex`，确保正则可以多次使用
      this.numberLetterPattern.lastIndex = 0;
      // 根据match[2]找到varId
      const result: any = Object.values(vars).find((item: any) => item.varName == match[2]);

      return `#${result.varId}#${match[2]}#`
    })

    return await this.handleSemanticsUnderOpenAPI(rule, vars)
  }

  async handleSemanticsUnderOpenAPI(rule, vars) {
    let exeCode = this.removeEmptyRules(rule)

    // 记录变量
    this.varsMap = vars

    // 将rule转换为code
    // 替换所有 #数字#字母 的匹配项
    exeCode = exeCode.replace(this.numberLetterPattern, (matchStr) => {
      let match = this.numberLetterPattern.exec(matchStr)
      // 重置 `lastIndex`，确保正则可以多次使用
      this.numberLetterPattern.lastIndex = 0;

      return this.var2MapString(match[1], match[2])
    })

    // 替换所有 $输出$ 的匹配项
    exeCode = exeCode.replace(this.dollarSignPattern, (matchStr) => {
      let match = this.dollarSignPattern.exec(matchStr)
      this.dollarSignPattern.lastIndex = 0
      let typeStr = match[1]
      if (typeStr == typeStr.replace(/\.value/g, '.type')) {
        // 常量
        return `this.collectOutputs(${match[1]}, ${VariableType.String})`
      } else {
        typeStr = typeStr.replace(/\.value/g, '.type')
        return `this.collectOutputs(${match[1]}, ${typeStr})`
      }
      
    })

    return await this.executeCode(exeCode)


  }




}
