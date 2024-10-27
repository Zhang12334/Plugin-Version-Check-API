// plugin.js
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

export default async (req, res) => {
  const { name } = req.query;

  try {
    const filePath = path.resolve('./plugins.yml');
    const file = fs.readFileSync(filePath, 'utf8');
    const pluginsData = YAML.parse(file);

    const version = pluginsData[pluginName]?.version;

    if (version) {
      res.status(200).json({ version });
    } else {
      res.status(404).json({ error: 'Plugin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error reading version from YAML file' });
  }
};
