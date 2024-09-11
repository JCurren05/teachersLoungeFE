class OpenEducationalResourcesCommand {
  user;
  constructor(user) {
    this.user = user;
  }

  OpenResources({ navigation }, EdResType) {
    navigation.navigate(EdResType);
  }
}

export default OpenEducationalResourcesCommand;
