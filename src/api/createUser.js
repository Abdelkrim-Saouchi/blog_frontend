import { hostname } from "../globals/hostname";

export const createUser = async (formData) => {
  try {
    return await fetch(`${hostname}/api/v1/users/signup`, {
      mode: "cors",
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
