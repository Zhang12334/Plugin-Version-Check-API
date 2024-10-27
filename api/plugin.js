// api/plugin.js
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

export default async (req, res) => {
  const { name } = req.query;  // 获取插件名称

  try {
    const filePath = path.resolve('./plugins.yml');
    const file = fs.readFileSync(filePath, 'utf8');
    const pluginsData = YAML.parse(file);

    const version = pluginsData[name]?.version;

    if (version) {
      res.status(200).send(version);  // 直接返回版本号
    } else {
      res.status(404).send('Plugin not found');  // 返回文本
    }
  } catch (error) {
    console.error('Error reading version:', error);
    res.status(500).send('Error reading version from YAML file');  // 返回文本
  }
};
