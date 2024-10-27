// api/plugin.js
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

export default async (req, res) => {
  const { pluginName } = req.query;  // 从请求参数中获取插件名

  try {
    // 读取文件
    const filePath = path.resolve('./plugins.yml');
    const file = fs.readFileSync(filePath, 'utf8');
    const pluginsData = YAML.parse(file);
    // 查找插件的版本号
    const version = pluginsData[pluginName]?.version;
    if (version) {
      res.status(200).json({ version });
    } else {
      res.status(404).json({ error: 'Plugin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error reading plugin version' });
  }
};
