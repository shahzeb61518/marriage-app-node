const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  email: {
    type: String,
    default: "Not set",
  },
  password: {
    type: String,
    default: "Not set",
  },
  firstName: {
    type: String,
    default: "Not set",
  },
  lastName: {
    type: String,
    default: "Not set",
  },

  contactNumber: {
    type: String,
    default: "Not Provided",
  },

  about: {
    type: String,
    default: "Not set",
  },
  location: {
    type: String,
    default: "Not set",
  },
  profession: {
    type: String,
    default: "Not set",
  },
  image: {
    type: String,
    default: "./assets/img/profiles/profile.png",
  },

  basic_details: {
    profile_created_for: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    body_type: {
      type: String,
      default: "",
    },
    age: {
      type: String,
      default: "",
    },
    physical_status: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "",
    },
    weight: {
      type: String,
      default: "",
    },
    mother_tongue: {
      type: String,
      default: "",
    },
    marital_status: {
      type: String,
      default: "",
    },
    number_of_children: {
      type: String,
      default: "",
    },
    child_living_status: {
      type: String,
      default: "",
    },
    eating_habits: {
      type: String,
      default: "",
    },
    drinking_habits: {
      type: String,
      default: "",
    },
    smoking_habits: {
      type: String,
      default: "",
    },
  },
  religion_information: {
    religion: {
      type: String,
      default: "",
    },
    cast_sub: {
      type: String,
      default: "",
    },
    gothram: {
      type: String,
      default: "",
    },
    start_raasi: {
      type: String,
      default: "",
    },
    dosh: {
      type: String,
      default: "",
    },
    time_of_birth: {
      type: String,
      default: "",
    },
    place_of_biryh: {
      type: String,
      default: "",
    },
  },
  groom_location: {
    country: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    resident_status: {
      type: String,
      default: "",
    },
    citizenship: {
      type: String,
      default: "",
    },
  },
  professional_information: {
    education: {
      type: String,
      default: "",
    },
    education_in_detail: {
      type: String,
      default: "",
    },
    college_institution: {
      type: String,
      default: "",
    },
    employed_in: {
      type: String,
      default: "",
    },
    occupation_in: {
      type: String,
      default: "",
    },
    occupation_in_detail: {
      type: String,
      default: "",
    },
    organization: {
      type: String,
      default: "",
    },
    annual_income: {
      type: String,
      default: "",
    },
  },
  family_details: {
    family_values: {
      type: String,
      default: "",
    },
    father_occupation: {
      type: String,
      default: "",
    },
    family_type: {
      type: String,
      default: "",
    },
    mother_occupation: {
      type: String,
      default: "",
    },
    family_status: {
      type: String,
      default: "",
    },
    number_of_brothers: {
      type: String,
      default: "",
    },
    ancestral_family_origin: {
      type: String,
      default: "",
    },
    number_of_sisters: {
      type: String,
      default: "",
    },
    family_location: {
      type: String,
      default: "",
    },
  },
  about_my_family: {
    type: String,
    default: "",
  },
  life_style: {
    hobbies_and_interests: {
      type: String,
      default: "",
    },
    sports_fitness_activities: {
      type: String,
      default: "",
    },
    spoken_languages: {
      type: String,
      default: "",
    },
  },
  user_id: {
    type: String,
  },
  creditCard: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("UserProfile", UserProfileSchema);
