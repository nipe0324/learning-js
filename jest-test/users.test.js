const axios = require('axios');
const Users = require('./users');

jest.mock('axios');

it('should fetch users', async () => {
  const users = [{ name: 'Bob' }];
  const resp = { data: users };
  axios.get.mockResolvedValue(resp);
  // もしくは mockImplementationで次のように実装可能
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  const data = await Users.all()
  expect(data).toEqual(users);
});
