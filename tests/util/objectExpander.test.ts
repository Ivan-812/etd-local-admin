import { objectExpand } from '../../utils/objectExpander';
test('Simple expand', () => {
  let object = {
    name: 'abc',
    data: {
      age: 30,
      weight: 30,
    },
  };

  let values = objectExpand(object, []);
  expect(values.length).toBe(3);
});
