import path from 'path';
const camelCase = require('just-camel-case');
const dotenv = require('dotenv').config({ path: path.join(__dirname, '/../.env') });

interface ConfigItem {
  key: string,
  value: any
}

class Config {
  private store: ConfigItem[] = [];

  constructor () {
    this.store.push({ key: 'version', value: 1 });
  }

  get (key: string) {
    const item: ConfigItem = this.store.filter((item) => item.key === key)[0] ?? { key: key, value: null };
    return item.value ?? null;
  }

  put (key: string, value: any) {
    this.delete(key);
    this.store.push({ key: key, value: value });
  }

  delete (key: string) {
    this.store = this.store.filter((element) => element.key !== key);
  }

  loadFromEnv () {
    Object.keys(dotenv.parsed).forEach((key, index) => this.put(camelCase(key), dotenv.parsed[key]));
  }
}

export default new Config();
