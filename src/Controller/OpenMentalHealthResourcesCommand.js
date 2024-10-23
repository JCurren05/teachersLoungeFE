class OpenMentalHealthResourcesCommand {
  user;
  constructor(user) {
    this.user = user;
  }

  OpenResources({ navigation }, MHResType) {
    navigation.navigate(MHResType);
  }
}

export default OpenMentalHealthResourcesCommand;
