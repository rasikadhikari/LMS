import { axios } from "./axios";

export interface LoginResponse {
  token: string;
  user: {
    role: string;
    _id: string;
    name: string;
    email: string;
  };
}

export const loginUser = async (body: {
  email: string;
  password: string;
}): Promise<[Error | null, LoginResponse | null]> => {
  try {
    const response = await axios.post("/user/login", body);
    return [null, response.data];
  } catch (err: any) {
    console.error("login err", err.response?.data || err.message);
    return [err, null];
  }
};
