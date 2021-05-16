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

  put (item: ConfigItem) {
    this.delete(item.key);
    this.store.push(item);
  }

  delete (key: string) {
    this.store = this.store.filter((element) => element.key !== key);
  }
}

export default new Config();
