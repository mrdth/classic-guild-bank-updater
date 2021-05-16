import Config from './Config';

describe('Config', () => {
  const config = Config;

  it('can retrieve a config item', () => {
    expect(config.get('version')).toEqual(1);
  });

  it('can store new config items', () => {
    const msg = 'Hello, World!';
    config.put({ key: 'hello', value: msg });

    expect(config.get('hello')).toEqual('Hello, World!');
  });

  it('can delete an item', () => {
    const msg = 'Hello, World!';
    config.put({ key: 'hello', value: msg });
    config.delete('hello');

    expect(config.get('hello')).toBeNull();
  });

  it('can update config items', () => {
    config.put({ key: 'hello', value: 'Hello, World!' });
    expect(config.get('hello')).toEqual('Hello, World!');

    config.put({ key: 'hello', value: 'Hello, My Baby. Hello, My Honey. Hello, My Ragtime Gal!' });

    expect(config.get('hello')).toEqual('Hello, My Baby. Hello, My Honey. Hello, My Ragtime Gal!');
  });
});
