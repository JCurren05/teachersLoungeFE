import React from "react";

class Community {
  constructor(id, name) {
    // id is a arbitrary primary key (INTEGER type) for each community
    this.id = id;
    // name is the community name, in VARCHAR(45) type
    this.name = name;
  }
}

export default Community;
