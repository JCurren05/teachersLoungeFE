import Community from "../Model/Community";

test("Community init", () => {
  var community1 = new Community(0, "University High School");
  expect(community1).toBeDefined();
});

test("Community init", () => {
  var community2 = new Community(9, "College State University");
  expect(community2).toBeDefined();
  expect(community2.id).toBeDefined();
  expect(community2.name).toBeDefined();
});

test("Community init", () => {
  var community3 = new Community();
  expect(community3).toBeDefined();
  expect(community3.id).not.toBeDefined();
  expect(community3.name).not.toBeDefined();
});
