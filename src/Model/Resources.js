import React from "react";


//Contains all resources on the Resources page
class Resources {
  sources1 = [];
  sources2 = [];
  sources3 = [];

  constructor(id) {
    this.sources1 = [
      new Link(
        "ABC Mouse",
        "https://www.abcmouse.com/abc/?8a08850bc2=T2889518156.1667458405.0759&gclid=CjwKCAjwzNOaBhAcEiwAD7Tb6KMt0o0eWo9GKTCKiAAt1IZYhC6HbVVjTmuracFlMcdH40jv0jCyXRoCwjoQAvD_BwE&utm_campaignid=716461616&utm_adgroupid=36906904226&utm_adextensionid=&utm_targetid=kwd-305381101&utm_matchtype=e&utm_network=g&utm_device=c&utm_devicemodel=&utm_creativeid=532570393343&utm_placement=&utm_adposition=&utm_geo=US&gclid=CjwKCAjwzNOaBhAcEiwAD7Tb6KMt0o0eWo9GKTCKiAAt1IZYhC6HbVVjTmuracFlMcdH40jv0jCyXRoCwjoQAvD_BwE"
      ),
      new Link("Starfall", "https://www.starfall.com/h/"),
      new Link("PBS Kids", "https://pbskids.org"),
      new Link("Nick Jr.", "https://www.educationalappstore.com/app/nick-jr"),
      new Link("Funbrain", "https://www.funbrain.com"),
      new Link("Sesame Street", "https://www.sesamestreet.org/"),
      new Link("Reading Eggs", "https://readingeggsjunior.com"),
      new Link("Learn with Homer", "https://learnwithhomer.com"),
      new Link("Education.com", "https://www.education.com"),
      new Link("Jumpstart", "https://www.jumpstart.com/academy/preschool"),
      new Link("Epic!", "https://www.getepic.com"),
      new Link("ABCya", "https://www.abcya.com"),
    ];
    this.sources2 = [
      new Link("IXL Instructional Resources", "https://www.ixl.com/"),
      new Link("Education.com", "https://www.education.com/"),
      new Link("Everfi", "https://get.everfi.com/k12-remote-learning/"),
      new Link("Nearpod", "https://nearpod.com/"),
      new Link("TeacherVision", "https://www.teachervision.com/"),
      new Link("Khan Academy", "https://www.khanacademy.org/"),
    ];

    this.sources3 = [
      new Link("OER Commons", "https://www.oercommons.org/"),
      new Link("OpenStax", "https://openstax.org/"),
      new Link("Merlot", "https://merlot.org/merlot/"),
    ];
  }
}

class Link {
  constructor(sourceName, link) {
    this.sourceName = sourceName;
    this.link = link;
  }
}

export default Resources;
