const uuid = require("uuid");
const nodemailer = require("nodemailer");
const { pass, EmailForNodeMailer } = require("../../config");
const { usermodel, forgetpassword } = require("../../model");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const forgotpassword = async (request, response) => {
  console.log(EmailForNodeMailer, pass);
  try {
    const { email } = request.body;
    console.log(email);
    const User = await usermodel.findOne({
      where: {
        email: email,
      },
    });

    if (!User)
      return response.status(StatusCodes.BAD_GATEWAY).json({
        sucess: true,
        data: "user does not exsit",
      });

    let id = uuid.v4();

    let forgetpasswordrecord = await forgetpassword.create({
      id: id,
      active: true,
      userId: User.id,
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
      html: `<a href='http://localhost:5173/resetpassword/${id}'>Click here for Reset Password</a>`,
    };

    let senddata = await transporter.sendMail(mailOptions);

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
    const { newPassword, id } = request.body;
    const forgetRecord = await forgetpassword.findOne({ where: { id } });

    if (!forgetRecord || !forgetRecord.active) {
      return response.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Invalid or expired reset password link",
      });
    }

    const user = await usermodel.findByPk(forgetRecord.userId);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hashedPassword });

    await forgetRecord.update({ active: false });

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
