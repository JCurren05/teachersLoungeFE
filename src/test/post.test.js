import Post from "../Model/Posts/Post";

describe("Post class", () => {
  it("should have an id", () => {
    const post = new Post(
      1,
      "user",
      "This is a post.",
      0,
      null,
      "Nick Name",
      [],
      null
    );

    expect(post.id).toBe(1);
  });

  it("should have a postContent", () => {
    const post = new Post(
      1,
      "user",
      "This is a post.",
      0,
      null,
      "Nick Name",
      [],
      null
    );

    expect(post.postContent).toBe("This is a post.");
  });

  it("should have a likes count of 0 by default", () => {
    const post = new Post(
      1,
      "user",
      "This is a post.",
      0,
      null,
      "Nick Name",
      [],
      null
    );

    expect(post.likes).toBe(0);
  });

  it("should have a user", () => {
    const post = new Post(
      1,
      "user",
      "This is a post.",
      0,
      null,
      "Nick Name",
      [],
      null
    );

    expect(post.user).toBe("user");
  });

  it("should have an image, optionally", () => {
    const post = new Post(
      1,
      "user",
      "This is a post.",
      0,
      null,
      "Nick Name",
      [],
      null
    );

    expect(post.image).toBeNull();

    const postWithImage = new Post(
      1,
      "user",
      "This is a post with an image.",
      0,
      "https://example.com/image.png",
      "Nick Name",
      [],
      null
    );

    expect(postWithImage.image).toBe("https://example.com/image.png");
  });

  it("should have a nickName", () => {
    const post = new Post(
      1,
      "user",
      "This is a post.",
      0,
      null,
      "Nick Name",
      [],
      null
    );

    expect(post.nickName).toBe("Nick Name");
  });

  it("should have an empty comments list by default", () => {
    const post = new Post(
      1,
      "user",
      "This is a post.",
      0,
      null,
      "Nick Name",
      [],
      null
    );

    expect(post.comments).toEqual([]);
  });

  it("should have a fileUrl, optionally", () => {
    const post = new Post(
      1,
      "user",
      "This is a post.",
      0,
      null,
      "Nick Name",
      [],
      null
    );

    expect(post.fileUrl).toBeNull();

    const postWithFileUrl = new Post(
      1,
      "user",
      "This is a post with a file URL.",
      0,
      null,
      "Nick Name",
      [],
      "https://example.com/file.pdf"
    );

    expect(postWithFileUrl.fileUrl).toBe("https://example.com/file.pdf");
  });
});
