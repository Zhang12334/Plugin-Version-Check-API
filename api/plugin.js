// api/plugin.js
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

export default async (req, res) => {
  const { name } = req.query;  // 从查询参数中获取插件名称

  try {
    const filePath = path.resolve('./plugins.yml'); // 假设YAML文件在根目录
    const file = fs.readFileSync(filePath, 'utf8');
    const pluginsData = YAML.parse(file);

    const version = pluginsData[name]?.version;

    if (version) {
      res.status(200).json({ version });
    } else {
      res.status(404).json({ error: 'Plugin not found' });
    }
  } catch (error) {
    console.error('Error reading version:', error);
    res.status(500).json({ error: 'Error reading version from YAML file' });
  }
};
