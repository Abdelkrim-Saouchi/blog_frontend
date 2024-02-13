import { hostname } from "../globals/hostname";

export const login = async (formData) => {
  try {
    return await fetch(`${hostname}/api/v1/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
