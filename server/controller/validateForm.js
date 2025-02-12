const yup = require("yup");

const formSchema = yup.object({
    username: yup
      .string()
      .required("username required")
      .min(5, "username too short")
      .max(20, "username too long"),
    password: yup
      .string()
      .required("password required")
      .min(5, "password too short")
      .max(20, "password too long"),
  });

const validateForm = (req,res) => {
    const formData = req.body;
    formSchema
      .validate(formData)
      .catch((err) => {
          res.status(422).send()
        console.log(err.errors);
      })
      .then((valid) => {
        if (valid) {
          console.log("form is good");
        }
      });   

}
module.exports = validateForm