const { usermodel } = require("../../model");
const { StatusCodes } = require("http-status-codes");
const { uploadphotoincloudinary } = require("../../services/cloudinary")

const GettheUser = async (request, response) => {
  try {
    const _id = request.user._id;

    const user = await usermodel.findOne({
      _id: _id,
    });

    return response.status(StatusCodes.OK).json({
      success: true,
      data: [user],
    });
  } catch (errors) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const UpdateUser = async (request, response) => {
  try {
    const id = request.user._id;
    const { name, email, image } = request.body;
    console.log(image, "image")


    const data = {};
    if (name) {
      data.name = name;
    }
    if (email) {
      data.email = email;
    }


    if (image) {
      const imageurl = await uploadphotoincloudinary(image);
      console.log(`imageurl`, imageurl)
      data.image = imageurl;
    }

    console.log(`data ${data}`)
    const updatedUser = await usermodel.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );

    if (!updatedUser) {
      return response.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    return response.status(StatusCodes.OK).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
};
module.exports = {
  GettheUser,
  UpdateUser,
};
