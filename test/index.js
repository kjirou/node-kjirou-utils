import assert from 'assert';

import {
  createClassBasedResourceList,
  toSignedNumber,
  within,
} from '../src';


describe('node-kjirou-utils', () => {

  it('within', () => {
    assert.strictEqual(within(10, 8, 12), 10);
    assert.strictEqual(within(10, 8, 9.9), 9.9);
    assert.strictEqual(within(10, 10.1, 12), 10.1);
  });

  it('toSignedNumber', () => {
    assert.strictEqual(toSignedNumber(1), '+1');
    assert.strictEqual(toSignedNumber(-1), '-1');
    assert.strictEqual(toSignedNumber(0), '0');
    assert.strictEqual(toSignedNumber(0, 'x'), 'x0');
  });

  it('createClassBasedResourceList', () => {
    class Item {}
    const itemListData = [
      {
        constants: {
          label: 'Bomb',
        },
        properties: {
          damage: 10,
          price: 100,
        },
      },
      {},
    ];
    let itemList;

    itemList = createClassBasedResourceList(Item, itemListData);

    assert(itemList[0].prototype instanceof Item);
    assert.strictEqual(itemList[0].label, 'Bomb');

    const item = new itemList[0];
    assert.strictEqual(item.damage, 10);
    assert.strictEqual(item.price, 100);

    new itemList[1]();  // should be created as a class


    // test options.naming
    itemList = createClassBasedResourceList(Item, itemListData, {
      naming: ({ Resource, constants, properties }) => {
        if (typeof constants.label === 'string') {
          return constants.label + 'Item';
        }
        return null;
      },
    });

    assert.strictEqual(itemList[0].name, 'BombItem');
    assert.strictEqual(itemList[1].name, 'Resource');
  });
});
