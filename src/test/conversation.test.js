import Conversation from "../Model/Conversation";

test("Conversation init full", () => {
  var conversation1 = new Conversation(1, "Friend", "friend@email.com", "Hi");
  expect(conversation1).toBeDefined();
  expect(conversation1.id).toEqual(1);
  expect(conversation1.title).toEqual("Friend");
  expect(conversation1.members).toEqual("friend@email.com");
  expect(conversation1.lastMessageText).toEqual("Hi");
  conversation1.setLastMessageText("Howdy");
  expect(conversation1.lastMessageText).toEqual("Howdy");
});

test("Friend init partial", () => {
  var conversation2 = new Conversation(1, "Friend");
  expect(conversation2).toBeDefined();
  expect(conversation2.id).toEqual(1);
  expect(conversation2.title).toEqual("Friend");
  expect(conversation2.members).not.toBeDefined();
  expect(conversation2.lastMessageText).not.toBeDefined();
  conversation2.setLastMessageText("Howdy");
  expect(conversation2.lastMessageText).toEqual("Howdy");
});

test("Friend init empty", () => {
  var conversation3 = new Conversation();
  expect(conversation3).toBeDefined();
  expect(conversation3.id).not.toBeDefined();
  expect(conversation3.title).not.toBeDefined();
  expect(conversation3.members).not.toBeDefined();
  expect(conversation3.lastMessageText).not.toBeDefined();
  conversation3.setLastMessageText("Howdy");
  expect(conversation3.lastMessageText).toEqual("Howdy");
});
