import { axios } from "./axios";

export const loginUser = async (body: {
  email: string;
  password: string;
}): Promise<[Error | null, { token: string; message: string } | null]> => {
  try {
    const response = await axios.post("/user/login", body);
    return [null, response.data];
  } catch (err: any) {
    console.error("login err", err.response?.data || err.message);
    return [err, null];
  }
};
