const { AUTH_TOKEN_SALT } = process.env;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserService } = require("../services");
const { errorWrapper, errorGenerator } = require("../errors");

const signUp = errorWrapper(async (req, res) => {
  const { email, password, confirm_password, username } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  if (password !== confirm_password)
    errorGenerator({
      statusCode: 400,
      message: "Password confirmation does not match password",
    });

  const foundUser = await UserService.findUser({ email });
  if (foundUser) errorGenerator({ statusCode: 409, message: "duplicated" });

  const createdUser = await UserService.createUser({
    email,
    password: hashedPassword,
    confirm_password: hashedPassword,
    username,
  });

  res.status(201).json({
    message: "user created",
    email: createdUser.email,
  });
});

const logIn = errorWrapper(async (req, res) => {
  const { email, password: inputPassword } = req.body;

  const foundUser = await UserService.findUser({ email });
  if (!foundUser)
    errorGenerator({ statusCode: 400, message: "아이디를 확인해주세요" });

  const { id, password: hashedPassword } = foundUser;
  const isValidPassword = await bcrypt.compare(inputPassword, hashedPassword);
  if (!isValidPassword)
    errorGenerator({ statusCode: 400, message: "비밀번호를 확인해주세요" });

  const token = jwt.sign({ id }, AUTH_TOKEN_SALT);
  res.status(200).json({ message: "로그인 성공!", token });
});

module.exports = {
  signUp,
  logIn,
};
