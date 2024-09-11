class UploadFileCommand {
    user;
    constructor(user) {
      this.user = user;
    }
  
    UploadFile({ navigation }, postContent) {
      navigation.navigate("Upload");
    }
  }
  
  export default UploadFileCommand;
  