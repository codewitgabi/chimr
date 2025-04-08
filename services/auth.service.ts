import { IUser } from "@/types/user.types";

class AuthService {
  setAccessToken(token: string): void {
    localStorage.setItem("auth.access_token", token);
  }

  getAccessToken(): string | null {
    const token = localStorage.getItem("auth.access_token");

    return token;
  }

  setUser(user: IUser) {
    localStorage.setItem("auth.user", JSON.stringify(user));
  }

  getUser(): IUser | null {
    const user = localStorage.getItem("auth.user");

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  }
}

const authService = new AuthService();
export default authService;
