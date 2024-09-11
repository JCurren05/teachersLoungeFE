
import User from '../Model/User'
test('User init', () => {
    var user1 = new User('testemail');
  expect(user1).toBeDefined();
});
test('User role exists', () => {
  var user1 = new User('testemail', 'Test', 'User', 1, 'Guest');
  expect(user1.userRole).toBeDefined();
});
test('Approve user', () => {
  var user1 = new User('testemail', 'Test', 'User', 1, 'Guest');
  user1.approveUser()
  expect(user1.userRole).toBe("Approved");
});
test('Change the name of the user', () => {
  var newName = 'Jack Potter'
  var user1 = new User('testemail');
    user1.changeUserName(newName)
  expect(user1.userName).toBe(newName);
});
test('Change the user name', () => {
  var newName = 'Jack Potter'
  var user1 = new User('testemail');
    user1.changeUserUserName(newName)
  expect(user1.userUserName).toBe(newName);
});
test('Change school', () => {
  var newSchool = 'Harvard'
  var user1 = new User('testemail');
    user1.changeSchool(newSchool)
  expect(user1.school).toBe(newSchool);
});


