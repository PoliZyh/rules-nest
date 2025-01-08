
export const extractObjects = (data) => {
  let result = [];

  function traverse(nodes) {
    for (let node of nodes) {
      if (node.isFolder) {
        if (node.children && node.children.length > 0) {
            traverse(node.children)
        }
      } else {
        result.push(node);
      }
    }
  }

  traverse(data);
  return result;
}

// 数据结构转为字符串
export function mapStructureToString(structure) {
  if (!Array.isArray(structure)) {
      return "";
  }

  function mapConditionToString(condition) {
      if (!condition || typeof condition !== "object") {
          return "";
      }

      const left = (condition.left && (condition.left.libId >= 0))
          ? `#${condition.left.libId}#${condition.left.varName || ""}#`
          : "";
      const operator = condition.operator || "";
      const right = (condition.right && (condition.right.libId >= 0))
          ? `#${condition.right.libId}#${condition.right.varName || ""}#`
          : "";

      return `${left}${operator}${right}`;
  }

  function mapBodyToString(body) {
      if (!Array.isArray(body)) {
          return "";
      }

      return body
          .map((item) => {
              if (item.type === "if" || item.type === "else if") {
                  const conditions = item.conditions
                      .map(mapConditionToString)
                      .join("")

                  const nestedBody = mapBodyToString(item.body);

                  return `${item.type}(${conditions}){${nestedBody}}`;
              } else if (item.type === 'while') {
                  const conditions = item.conditions
                      .map(mapConditionToString)
                      .join("")
                      const nestedBody = mapBodyToString(item.body);

                      return `${item.type}(${conditions}){${nestedBody}}`;
              } else if (item.type === "else") {
                  return `${item.type}{${mapBodyToString(item.body)}}`;
              } else if (item.type === "calculate") {
                  const received = `#${item.received.libId}#${item.received.varName}#`;
                  const addStr = mapConditionToString(item.calculate)

                  return `${received}=${addStr};`;
              } else if (item.type === "print") {
                  const received = `#${item.received.libId}#${item.received.varName}#`;

                  return "$" + `${received}$;`;
              }

              return "";
          })
          .join(";");
  }

  const result = structure
      .map((item) => {
          if (item.type === "if" || item.type === "else if") {
              const conditions = item.conditions
                  .map(mapConditionToString)
                  .join("")

              const body = mapBodyToString(item.body);

              return `${item.type}(${conditions}){${body}}`;
          } else if (item.type === "while") {
              const conditions = item.conditions
                  .map(mapConditionToString)
                  .join("")

              const body = mapBodyToString(item.body);

              return `${item.type}(${conditions}){${body}}`;
          } else if (item.type === "else") {
              return `${item.type}{${mapBodyToString(item.body)}}`;
          }

          return "";
      })
      .join("");

  return result;
}

// 字符串转数据结构
export function parseStringToStructure(inputString) {
  const structure = [];

  function parseCondition(token) {
      const regex = /#(\d+)#(.*?)(==|!=|>|<|>=|<=|\&\&|\|\||[\+\-\*/!])#(\d+)#(.*?)\$/;
      const matches = token.match(regex);

      if (matches) {
          return {
              left: {
                  libId: parseInt(matches[1]),
                  varName: matches[2] || undefined,
              },
              operator: matches[3] || undefined,
              right: {
                  libId: parseInt(matches[4]),
                  varName: matches[5] || undefined,
              },
          };
      }

      return {};
  }

  function parseCalculate(token) {
      const arr =token.split('#')
      return {
          type: "calculate",
          received: {
              libId: arr[1],
              varName: arr[2],
          },
          calculate: {
              left: {
                  libId: arr[4],
                  varName: arr[5],
              },
              operator: arr[6],
              right: {
                  libId: arr[7],
                  varName: arr[8],
              }
          },
      };

  }

  function parsePrint(token) {
      const arr = token.split('#')
      console.log(arr)
      return {
          type: 'print',
          received: {
              libId: arr[1],
              varName: arr[2]
          },
          calculate: {
              left: {},
              operator: "",
              right: {}
          }
      };
  }

  const tokens = inputString.split(/(?<=\}|\]|;|{)/);
  let stack = [];
  let currentBlock = null;

  for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i].trim();
      console.log(token)

      if (token.startsWith("if(") || token.startsWith("else if(")) {
          const conditionsRegex = /\((.*?)\)/;
          const conditionsMatch = token.match(conditionsRegex);
          const conditions = conditionsMatch
              ? conditionsMatch[1].split(/(\&\&|\|\||==|!=|>|<|>=|<=)/)
              : [];
          const resConditions = []
          let index = 0
          conditions.forEach(element => {
              if (element === '&&' || element === '||') {

                  resConditions.push({
                      left: {

                      },
                      operator: element,
                      right: {

                      }
                  })

              } else if (element === '!') {
                  const mtr = conditions[index + 1].match(/#(\d+)#([a-zA-Z]+)/)
                  resConditions.push({
                      left: {

                      },
                      operator: element,
                      right: {
                          libId: mtr[1],
                          varName: mtr[2]
                      }
                  })
              } else if (element === '') {
                  resConditions.push({})
              } else if (element === '==' || element === '!=' || element === '>' || element === '<' || element === '>=' || element === '<=') {
                  const mtl = conditions[index - 1].match(/#(\d+)#([a-zA-Z]+)/)
                  const mtr = conditions[index + 1].match(/#(\d+)#([a-zA-Z]+)/)
                  resConditions.push({
                      left: {
                          libId: mtl[1],
                          varName: mtl[2]
                      },
                      operator: element,
                      right: {
                          libId: mtr[1],
                          varName: mtr[2]
                      }
                  })
              }
              index++
          });

          const newBlock = {
              type: token.startsWith("if(") ? "if" : "else if",
              conditions: resConditions,
              body: [],
          };

          if (currentBlock) {
              currentBlock.body.push(newBlock);
          } else {
              structure.push(newBlock);
          }
          stack.push(currentBlock);

          currentBlock = newBlock;
      } else if (token.startsWith("while")) {
          const conditionsRegex = /\((.*?)\)/;
          const conditionsMatch = token.match(conditionsRegex);
          const conditions = conditionsMatch
              ? conditionsMatch[1].split(/(\&\&|\|\||==|!=|>|<|>=|<=)/)
              : [];
          const resConditions = []
          let index = 0
          conditions.forEach(element => {
              if (element === '&&' || element === '||') {

                  resConditions.push({
                      left: {

                      },
                      operator: element,
                      right: {

                      }
                  })

              } else if (element === '!') {
                  const mtr = conditions[index + 1].match(/#(\d+)#([a-zA-Z]+)/)
                  resConditions.push({
                      left: {

                      },
                      operator: element,
                      right: {
                          libId: mtr[1],
                          varName: mtr[2]
                      }
                  })
              } else if (element === '') {
                  resConditions.push({})
              } else if (element === '==' || element === '!=' || element === '>' || element === '<' || element === '>=' || element === '<=') {
                  const mtl = conditions[index - 1].match(/#(\d+)#([a-zA-Z]+)/)
                  const mtr = conditions[index + 1].match(/#(\d+)#([a-zA-Z]+)/)
                  resConditions.push({
                      left: {
                          libId: mtl[1],
                          varName: mtl[2]
                      },
                      operator: element,
                      right: {
                          libId: mtr[1],
                          varName: mtr[2]
                      }
                  })
              }
              index++
          });
          const newBlock = {
              type: "while",
              conditions: resConditions,
              body: [],
          }
          if (currentBlock) {
              currentBlock.body.push(newBlock);
          } else {
              structure.push(newBlock);
          }
          stack.push(currentBlock);

          currentBlock = newBlock;
      } else if (token.startsWith("else")) {
          const newBlock = {
              type: "else",
              body: [],
          };

          if (currentBlock) {
              currentBlock.body.push(newBlock);
          } else {
              structure.push(newBlock);
          } 
          stack.push(currentBlock); // 将当前块压入栈中

          currentBlock = newBlock;
      } else if (token.startsWith("#")) {
          
          if (token.includes("=")) {
              currentBlock.body.push(parseCalculate(token));
          } 
      } else if(token.startsWith('$')) {
          currentBlock.body.push(parsePrint(token));
      } else if (token === "{") {
          // Do nothing for opening braces
      } else if (token === "}") {
          // Pop the current block from the stack
          currentBlock = stack.pop();
      }
  }

  return structure;
}