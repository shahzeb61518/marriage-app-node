const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const UserProfile = require("../models/UserProfile");
const jwt = require("jsonwebtoken");
// const { url } = require("./../config/constants");
const dotenv = require("dotenv");

dotenv.config({ path: "./../config/config.env" });

exports.createUser = (req, res, next) => {
  console.log("This is dataa :: ", req.body);

  let userProfile = new UserProfile({
    firstName: req.body.firstName,
    email: req.body.email,
    password: req.body.password,
    lastName: req.body.lastName,
    about: req.body.about,
    location: req.body.location,
    contactNumber: req.body.contactNumber,
    profession: req.body.profession,
  });
  userProfile
    .save()
    .then((result) => {
      res.status(201).json({
        message: "User created successfully!",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Invalid authentication credentials!",
      });
      console.log("error", err);
    });
};

exports.updateUserCreditCard = (req, res, next) => {
  console.log("This is dataa :: ", req.body);
  let userProfile = {
    _id: req.body.id,
    creditCard: true,
  };
  UserProfile.findOneAndUpdate({ _id: req.body.id }, userProfile)
    .then((result) => {
      res.status(200).json({
        message: "User credit card updated successfully!",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Invalid authentication credentials!",
      });
      console.log("error", err);
    });
};

exports.updateUser = (req, res, next) => {
  console.log("This is dataa :: ", req.body);

  // let url = "http://localhost:4006";
  // let url = "https://marriage-node.herokuapp.com";

  if (req.files) {
    let file = process.env.URL + "/profiles/" + req.files.image.name;
    req.files.image.mv("public/profiles/" + req.files.image.name, function (
      error
    ) {
      if (error) {
        console.log("Couldn't upload file");
        console.log(error);
      } else {
        console.log("File succesfully uploaded.");
      }
    });

    let userProfile = {
      _id: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      about: req.body.about,
      location: req.body.location,
      contactNumber: req.body.contactNumber,
      profession: req.body.profession,
      image: file,
    };
    UserProfile.findOneAndUpdate({ _id: req.body.id }, userProfile)
      .then((result) => {
        res.status(201).json({
          message: "User updated successfully!",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Invalid authentication credentials!",
        });
        console.log("error", err);
      });
  } else {
    let userProfile = {
      _id: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      about: req.body.about,
      location: req.body.location,
      contactNumber: req.body.contactNumber,
      profession: req.body.profession,
    };
    UserProfile.findOneAndUpdate({ _id: req.body.id }, userProfile)
      .then((result) => {
        res.status(201).json({
          message: "User updated successfully!",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Invalid authentication credentials!",
        });
        console.log("error", err);
      });
  }
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  let email = req.body.email;
  email = email.toLowerCase();
  UserProfile.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(200).json({
          message: "Invalid email or password",
        });
      }
      fetchedUser = user;
      // return bcrypt.compare(req.body.userPassword, user.password);
      return req.body.password === user.password;
    })
    .then((result) => {
      if (!result) {
        return res.status(200).json({
          message: "Invalid email or password",
        });
      }
      console.log("fetchedUser>>>>", fetchedUser);
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id,
          name: fetchedUser.firstName + " " + fetchedUser.lastName,
        },
        "secret_this_should_be_longer",
        { expiresIn: "10h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 360000,
        userId: fetchedUser._id,
        name: fetchedUser.firstName + " " + fetchedUser.lastName,
        email: fetchedUser.email,
        creditCard: fetchedUser.creditCard,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Invalid authentication credentials!",
      });
    });
};

exports.userProfileCreate = async (req, res, next) => {
  let userId = req.body.id;
  let data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    about: req.body.about,
    location: req.body.location,
    contactNumber: req.body.contactNumber,
    profession: req.body.profession,
  };
  console.log("This is dataa :: ", req.body);
  console.log("This is uuuu :: ", userId);

  // let url = "http://localhost:4006";
  // let url = "https://marriage-node.herokuapp.com";

  if (req.files) {
    data.image = process.env.URL + "/profiles/" + req.files.image.name;
    await req.files.image.mv(
      "public/profiles/" + req.files.image.name,
      function (error) {
        if (error) {
          console.log("Couldn't upload file");
          console.log(error);
        } else {
          console.log("File succesfully uploaded.");
        }
      }
    );
  }

  let userProfile = await UserProfile.findOneAndUpdate(
    { user_id: userId },
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: userProfile,
  });
};

exports.updateBasicDetails = async (req, res, next) => {
  let basicdetails = req.body.basic_details;
  let userId = basicdetails.id;
  console.log("req.body>>>", req.body);
  console.log("updateBasicDetails hit>>>");
  let basic_details = {
    profile_created_for: basicdetails.profile_created_for,
    name: basicdetails.name,
    body_type: basicdetails.body_type,
    age: basicdetails.age,
    physical_status: basicdetails.physical_status,
    height: basicdetails.height,
    weight: basicdetails.weight,
    mother_tongue: basicdetails.mother_tongue,
    marital_status: basicdetails.marital_status,
    number_of_children: basicdetails.number_of_children,
    child_living_status: basicdetails.child_living_status,
    eating_habits: basicdetails.eating_habits,
    drinking_habits: basicdetails.drinking_habits,
    smoking_habits: basicdetails.smoking_habits,
  };
  UserProfile.findOneAndUpdate(
    { _id: userId },
    { basic_details: basic_details }
  )
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "User updated successfully!",
        });
      } else {
        res.status(201).json({
          message: "User NOT updated successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Invalid authentication credentials!",
      });
      console.log("error", err);
    });

  // let userProfile = await UserProfile.findOneAndUpdate(
  //   { _id: userId },
  //   basicDetails,
  //   {
  //     new: true,
  //     runValidators: true,
  //   }
  // );
  // res.status(200).json({
  //   success: true,
  //   data: userProfile,
  // });
};

exports.updateFamilyDetails = async (req, res, next) => {
  let familyDetail = req.body;
  let userId = familyDetail.id;
  console.log("req.body>>>", req.body);
  console.log("familyDetail hit>>>");
  let family = {
    ancestral_family_origin: familyDetail.ancestral_family_origin,
    family_location: familyDetail.family_location,
    family_status: familyDetail.family_status,
    family_type: familyDetail.family_type,
    family_values: familyDetail.family_values,
    father_occupation: familyDetail.father_occupation,
    mother_occupation: familyDetail.mother_occupation,
    number_of_brothers: familyDetail.number_of_brothers,
    number_of_sisters: familyDetail.number_of_sisters,
  };
  let userProfile = await UserProfile.findOneAndUpdate(
    { _id: userId },
    { family_details: family },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    data: userProfile,
  });
};

exports.updateAboutFamily = async (req, res, next) => {
  let about_my_family = req.body;
  let userId = req.body.id;
  console.log("req.body>>>", req.body);
  console.log("aboutFamily hit>>>");
  console.log("aboutFamily hit>>>");
  let userProfile = await UserProfile.findOneAndUpdate(
    { _id: userId },
    about_my_family,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    data: userProfile,
  });
};

exports.updateGroomDetail = async (req, res, next) => {
  let groomDetail = req.body;
  let userId = groomDetail.id;
  console.log("groomDetail hit>>>", req.body);

  let groom_location = {
    citizenship: groomDetail.citizenship,
    city: groomDetail.city,
    state: groomDetail.state,
    country: groomDetail.country,
    resident_status: groomDetail.resident_status,
  };

  console.log("groomDetail hit>>>");
  let userProfile = await UserProfile.findOneAndUpdate(
    { _id: userId },
    { groom_location: groom_location },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    data: userProfile,
  });
};

exports.updateLifeStyle = async (req, res, next) => {
  let lifeStyle = req.body;
  let userId = lifeStyle.id;
  console.log("req.body>>>", req.body);
  console.log("lifeStyle hit>>>");
  console.log("lifeStyle hit>>>");
  let life_style = {
    hobbies_and_interests: lifeStyle.hobbies_and_interests,
    spoken_languages: lifeStyle.spoken_languages,
    sports_fitness_activities: lifeStyle.sports_fitness_activities,
  };

  let userProfile = await UserProfile.findOneAndUpdate(
    { _id: userId },
    { life_style: life_style },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    data: userProfile,
  });
};

exports.updatePerosnalInfo = async (req, res, next) => {
  let perosnalInfo = req.body;
  let userId = perosnalInfo.id;
  console.log("req.body>>>", req.body);
  console.log("perosnalInfo hit>>>");

  let personalInfo = {
    annual_income: perosnalInfo.annual_income,
    college_institution: perosnalInfo.college_institution,
    education: perosnalInfo.education,
    education_in_detail: perosnalInfo.education_in_detail,
    employed_in: perosnalInfo.employed_in,
    occupation_in: perosnalInfo.occupation_in,
    occupation_in_detail: perosnalInfo.occupation_in_detail,
    organization: perosnalInfo.organization,
  };

  let userProfile = await UserProfile.findOneAndUpdate(
    { _id: userId },
    { professional_information: personalInfo },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    data: userProfile,
  });
};

exports.updateReligionDetails = async (req, res, next) => {
  let religionDetails = req.body;
  let userId = religionDetails.id;
  console.log("req.body>>>", req.body);
  console.log("religionDetails hit>>>");

  let religion_Details = {
    cast_sub: religionDetails.cast_sub,
    dosh: religionDetails.dosh,
    gothram: religionDetails.gothram,
    place_of_biryh: religionDetails.place_of_biryh,
    time_of_birth: religionDetails.time_of_birth,
    start_raasi: religionDetails.start_raasi,
    religion: religionDetails.religion,
  };
  let userProfile = await UserProfile.findOneAndUpdate(
    { _id: userId },
    { religion_information: religion_Details },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    data: userProfile,
  });
};

exports.getUserProfile = async (req, res, next) => {
  let userId = req.body.id;
  let userProfile = await UserProfile.findOne({ _id: userId });
  res.status(200).json({
    success: true,
    data: userProfile,
  });
};

exports.getallProfiles = async (req, res, next) => {
  let allProfiles = await UserProfile.find();

  res.status(200).json({
    success: true,
    data: allProfiles,
  });
};

exports.getProfileById = (req, res, next) => {
  // console.log("this is user id :: ", userId);
  UserProfile.findOne({ _id: req.body.id })
    .then((result) => {
      res.status(200).json({
        message: "User created successfully!",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Invalid authentication credentials!",
      });
      console.log("error", err);
    });
};

// login with google
exports.loginWithGoogle = (req, res, next) => {
  console.log("read>");
  if (req.body.token && req.body.email && req.body.name) {
    UserProfile.findOne({ userEmail: req.body.email }).then((user) => {
      if (!user) {
        let date = new Date();
        date.toString;
        let email = req.body.email;
        email = email.toLowerCase();
        const users = new UserProfile({
          email: email,
          firstName: req.body.name,
          lastName: req.body.name,
          password: "123",
        });
        users.save().then((result) => {
          const token = jwt.sign(
            {
              email: result.email,
              userId: result._id,
              firstName: result.name,
              lastName: result.name,
            },
            "secret_this_should_be_longer",
            { expiresIn: "10h" }
          );
          res.status(201).json({
            message: "User created successfully!",
            result: result,
            token: token,
          });
        });
      } else {
        fetchedUser = user;
        req.body.userPassword === user.userPassword;
        // console.log("fetchedUser>>>>", fetchedUser);
        const token = jwt.sign(
          {
            email: fetchedUser.email,
            userId: fetchedUser._id,
            firstName: fetchedUser.firstName,
            lastName: fetchedUser.lastName,
          },
          "secret_this_should_be_longer",
          { expiresIn: "10h" }
        );
        res.status(200).json({
          token: token,
          expiresIn: 360000,
          email: fetchedUser.email,
          userId: fetchedUser._id,
          firstName: fetchedUser.firstName,
          lastName: fetchedUser.lastName,
        });
      }
    });
  }
};
