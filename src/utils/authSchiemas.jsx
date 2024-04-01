export const loginSchiema = [
  {
    placeholder: "Email",
    name: "email",
    type: "email",
    required: true,
  },
  {
    placeholder: "Password",
    name: "password",
    type: "password",
    required: true,
  },
];

export const registerSchiema = [
  {
    placeholder: "Name",
    name: "name",
    type: "text",
    required: true,
  },
  {
    placeholder: "Email",
    name: "email",
    type: "email",
    required: true,
  },
  {
    placeholder: "Birthdate",
    name: "birth_date",
    type: "date",
    required: true,
  },
  {
    placeholder: "MembershipNumber",
    name: "membership_id",
    type: "number",
    required: false,
  },
  {
    placeholder: "Address",
    name: "address",
    type: "text",
    required: true,
  },
  {
    placeholder: "Gender",
    name: "gender",
    type: "select",
    required: true,
  },
  {
    placeholder: "NationalID",
    name: "national_id",
    type: "text",
    required: true,
  },
  {
    placeholder: "PhoneNumber",
    name: "phone",
    type: "number",
    required: true,
  },
  {
    placeholder: "Password",
    name: "password",
    type: "password",
    required: true,
  },
  {
    placeholder: "PasswordConfirmation",
    name: "confirm-password",
    type: "password",
  },
];

export const forgetPasswordSchiema = [
  {
    placeholder: "Email",
    name: "email",
    type: "email",
    required: true,
  },
  {
    placeholder: "Code",
    name: "code",
    type: "text",
    required: true,
  },
  {
    placeholder: "Password",
    name: "password",
    type: "password",
    required: true,
  },
  {
    placeholder: "PasswordConfirmation",
    name: "confirm_password",
    type: "password",
  },
];
