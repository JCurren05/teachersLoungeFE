import Comment from "../Model/Posts/Comment";

class CreateCommentCommand {
  constructor(comments = []) {
    this.comments = comments; // Initialize local state for comments
  }

  /**
   * Add a new comment and save it to the backend
   * @param {object} navigation - Navigation object for routing
   * @param {string} userName - User's name or email
   * @param {string} image - User's image or avatar URL
   * @param {string} content - The comment text
   * @param {string} nickName - User's nickname
   * @param {number} postId - The ID of the post to comment on
   * @param {string} choice - Route to navigate after comment creation
   */
  async addComment(navigation, userName, image, content, nickName, postId, choice) {
    if (!content) {
      alert("Content cannot be empty.");
      return;
    }

    try {
      // Save comment to backend
      const response = await fetch("/api/addCommentToPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userName, // Assuming userName is the email
          content: content,
          postId: postId,
          time: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save comment to backend");
      }

      const savedComment = await response.json();
      console.log("Comment successfully saved:", savedComment);

      // Add the saved comment to local state
      const newComment = new Comment(userName, image, content, nickName);
      this.comments.push(newComment);

      // Navigate to the appropriate screen
      if (choice === "Profile") {
        navigation.navigate("Profile");
      } else {
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment. Please try again.");
    }
  }

  /**
   * Fetch comments for a specific post from the backend
   * @param {number} postId - The ID of the post to fetch comments for
   */
  async fetchComments(postId) {
    if (!postId) {
      console.error("Invalid postId provided for fetching comments.");
      return;
    }

    try {
      const response = await fetch(`/api/getCommentsByPostID?postId=${postId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch comments from backend");
      }

      const data = await response.json();

      // Update local state with fetched comments
      this.comments = data.data.map((comment) => {
        return new Comment(
          comment.email,
          "", // Assuming no image field is available in response
          comment.content,
          comment.email // Assuming nickName is same as email
        );
      });

      console.log("Comments fetched successfully:", this.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  /**
   * Get all comments stored in the local state
   */
  getComments() {
    return this.comments;
  }
}

export default CreateCommentCommand;