import fs from 'fs';
import path from 'path';

const utilsDir = path.join(process.cwd(), 'utils');
const utils: { [key: string]: any } = {};

// 读取 utils 文件夹下的所有文件
fs.readdirSync(utilsDir).forEach((file) => {
  if (file.endsWith('.ts')) {
    const fileName = file.slice(0, -3);  // 去掉 .ts 后缀
    const filePath = path.join(utilsDir, file);

    // 动态导入并将其作为键值对添加到 utils 对象
    import(filePath).then((module) => {
      utils[fileName] = module;
    });
  }
});

// 导出所有 utils
export default utils;
