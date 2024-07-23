const { hash } = require("bcrypt");

const rawPassword = "3uca1iptu5";
(async () => {
  const password = await hash(rawPassword, 10);
  console.log(password);
})();
