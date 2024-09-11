import Friend from "../Model/Friend";

test("Friend init full", () => {
  var friend1 = new Friend("friend@email.com", "Joe", "Smith", 1, "User");
  expect(friend1).toBeDefined();
  expect(friend1.email).toEqual("friend@email.com");
  expect(friend1.firstName).toEqual("Joe");
  expect(friend1.lastName).toEqual("Smith");
  expect(friend1.schoolId).toEqual(1);
  expect(friend1.role).toEqual("User");
});

test("Friend init partial", () => {
  var friend2 = new Friend("friend@email.com", "Joe", "Smith");
  expect(friend2).toBeDefined();
  expect(friend2.email).toEqual("friend@email.com");
  expect(friend2.firstName).toEqual("Joe");
  expect(friend2.lastName).toEqual("Smith");
  expect(friend2.id).not.toBeDefined();
  expect(friend2.role).not.toBeDefined();
});

test("Friend init empty", () => {
  var friend3 = new Friend();
  expect(friend3).toBeDefined();
  expect(friend3.email).not.toBeDefined();
  expect(friend3.firstName).not.toBeDefined();
  expect(friend3.lastName).not.toBeDefined();
  expect(friend3.id).not.toBeDefined();
  expect(friend3.role).not.toBeDefined();
});
