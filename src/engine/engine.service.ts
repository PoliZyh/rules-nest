import { Injectable } from '@nestjs/common';
import { CreateEngineDto } from './dto/create-engine.dto';
import { UpdateEngineDto } from './dto/update-engine.dto';
import { Variable } from 'src/variable/entities/variable.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VariableType } from 'src/interface/common.interface';

@Injectable()
export class EngineService {

  // 匹配变量
  private readonly numberLetterPattern = /#(-?\d+)#(.+?)#/g;
  // 匹配输出
  private readonly dollarSignPattern = /\$(.*?)\$/g;

  private varsMap = {} //  '9': { varId: '9', varName: 'a', value: null }
  private outputs = []
  private readonly mapName = 'varsMap'
  private readonly propName = 'value'

  private readonly caculateList = [
    VariableType.Int, VariableType.Double
  ]

  constructor (
    @InjectRepository(Variable) private readonly variable: Repository<Variable>
  ) {}


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

      return await this.handleGrammar(rule)

    } catch (error) {



    }

  }

  /**
   * 第二层 语法解析层
   * 找出变量、输出语句
   * TODO 验证输入的语法正确性
   */
  async handleGrammar(rule: string) {
    // 正则表达式匹配 #数字#字母 的形式
    const numberLetterMatches = [];

    // 正则表达式匹配 $$ 内部的内容
    const dollarSignMatches = [];

    // 找到所有 #数字#字母 的匹配项
    let match;
    while ((match = this.numberLetterPattern.exec(rule)) !== null) {
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
   * TODO 将rule字符串转换为可执行字符串
   * TODO 验证规则逻辑正确性
   */
  async handleSemantics(rule, varMatches, outputMatches) {
    let exeCode = rule

    // 记录变量
    this.varsMap = this.varMatches2Map(varMatches)


    // 将rule转换为code
    // 替换所有 #数字#字母 的匹配项
    exeCode = exeCode.replace(this.numberLetterPattern, (matchStr) => {
      let match = this.numberLetterPattern.exec(matchStr)
      // 重置 `lastIndex`，确保正则可以多次使用
      this.numberLetterPattern.lastIndex = 0;
      
      // console.log(this.var2MapString(match[1]))

      return this.var2MapString(match[1])
    })

    // 替换所有 $输出$ 的匹配项
    exeCode = exeCode.replace(this.dollarSignPattern, (matchStr) => {
      let match = this.dollarSignPattern.exec(matchStr)
      this.dollarSignPattern.lastIndex = 0
      return `this.collectOutputs(${match[1]})`
    })

    return await this.dataViste(exeCode)


  }


  /**
   * 第四层 数据访问层
   * TODO 从数据库检索变量等数据
   * TODO 验证数据访问的正确性
   */
  async dataViste(exeCode) {

    // 遍历Map挂载变量value
    for(const key of Object.keys(this.varsMap)) {
      await this.handleMountVars(+key)
    }

    return await this.executeCode(exeCode)

  }



  /**
   * 第五层 执行层
   * TODO 执行处理好的可执行代码
   * TODO 将输出信息返回给用户
   */
  async executeCode(exeCode) {

    try {
      eval(exeCode)
      console.log(exeCode)
    } catch(error) {
      console.log('err', error)
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
  var2MapString(varId) {
    return `this.${this.mapName}[${varId}].${this.propName}`
  }

  /**
   * 收集输出
   */
  collectOutputs (outputStr) {
    return this.outputs.push(eval(outputStr))
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
    const varInfo = await this.findVarById(varId)
    // this.varsMap[varId].type = varInfo.variableType
    this.varsMap[varId].value = 
      this.caculateList.includes(varInfo.variableType) ?
      +varInfo.default : varInfo.default
  }


}
