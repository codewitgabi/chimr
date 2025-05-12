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

  clearAuthData(): void {
    localStorage.removeItem("auth.access_token");
    localStorage.removeItem("auth.user");
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();

    if (!token) {
      return false;
    }

    try {
      // Decode the JWT token

      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const { exp } = JSON.parse(jsonPayload);

      // Check if token is expired
      
      if (exp * 1000 < Date.now()) {
        this.clearAuthData();
        return false;
      }

      return true;
    } catch (error) {
      console.error(error);
      this.clearAuthData();
      return false;
    }
  }
}

const authService = new AuthService();
export default authService;
