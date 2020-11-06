/* eslint-disable no-undef */
import { getUserByUsername } from "./db";
import { expect } from "chai";
import { getDatabaseData, resetDatabase, setDatabaseData } from "./test-helpers";
describe("getUserByUsername", () => {
  afterEach('reset the database', async () => {
    await resetDatabase();
  })
  it("get the correct user from the database given the user", async () => {

    const fakeData = [
      {
        id: "123",
        username: "abc",
        email: "abc@gmail.com",
      },
      {
        id: "124",
        username: "wrong",
        email: "wrong@wrong.com",
      },
    ];

    await setDatabaseData('users', fakeData);

    const actual = await getUserByUsername("abc");
    const finalDBState = await getDatabaseData('users')

    const expected = {
      id: "123",
      username: "abc",
      email: "abc@gmail.com",
    };

    expect(actual).excludingEvery('_id').to.deep.equal(expected);
    expect(finalDBState).excludingEvery('_id').to.deep.equal(fakeData);
  });

  it('returns null when the user not found', async () => {

    await setDatabaseData('users', [{
      id: '999',
      username: 'XYZ',
      email: 'nobody@gmail.com'
    }]);

    const actual = await getUserByUsername('def')

    expect(actual).to.be.null;
  });
});
