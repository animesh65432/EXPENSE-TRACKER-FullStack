const nodemailer = require("nodemailer");
const { pass, EmailForNodeMailer } = require("../../config");
const { usermodel, forgetpasswordmodel } = require("../../model");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const forgotpassword = async (request, response) => {
  try {
    const { email } = request.body;
    console.log(email);
    const User = await usermodel.findOne({
      email: email,
    });

    if (!User)
      return response.status(StatusCodes.BAD_GATEWAY).json({
        sucess: true,
        data: "user does not exsit",
      });

    let forgetpasswordrecord = await forgetpasswordmodel.create({
      active: true,
      user: User._id,
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EmailForNodeMailer,
        pass: pass,
      },
    });

    var mailOptions = {
      from: "Kiranduttta234@gmail.com",
      to: email,
      subject: "Sending Email using Node.js",
      text: "Click here For Set The New Password",
      html: `<a href='http://localhost:3000/resetpasswordwithnewone?id=${forgetpasswordrecord._id}'>Click here for Reset Password</a>`,
    };

    let senddata = await transporter.sendMail(mailOptions);
    console.log("sent");
    return response.status(StatusCodes.OK).json({
      success: true,
      data: "Reset password email sent successfully",
    });
  } catch (error) {
    console.log(error);
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: "Failed to send reset password email",
    });
  }
};

const updatePassword = async (request, response) => {
  try {
    const { id } = request.query;
    const { newPassword } = request.body;

    if (!newPassword || !id) {
      return response.status(StatusCodes.BAD_GATEWAY).json({
        message: "please give newpassword and id",
      });
    }
    console.log(id);
    const forgetRecord = await forgetpasswordmodel.findById(id);
    console.log(forgetRecord);

    if (!forgetRecord || !forgetRecord.active) {
      return response.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Invalid or expired reset password link",
      });
    }

    const user = await usermodel.findById(forgetRecord.user);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.updateOne({ password: hashedPassword });

    await forgetRecord.updateOne({ active: false });

    return response.status(StatusCodes.OK).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to update password",
    });
  }
};

module.exports = {
  forgotpassword,
  updatePassword,
};
