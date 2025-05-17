import api from "@/lib/api";
import { TOauthSuccessCallback } from "@/types/auth.types";
import { IUser } from "@/types/user.types";
import { AxiosError } from "axios";
import { UserCredential } from "firebase/auth";
import { toast } from "sonner";

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

  async loginViaSocialAuth(
    result: UserCredential,
    callback?: TOauthSuccessCallback,
    options?: {
      domain: string;
      extras?: {
        username?: string;
        jobTitle?: string;
        about?: string;
        profilePic?: string;
      };
    }
  ) {
    // Get userinfo
    const user = result.user;
    const token = await user.getIdToken();

    // Make server call
    try {
      const requestData = {
        domain: options?.domain || "github",
        idToken: token,
        ...(options?.extras && { extras: options.extras }),
      };

      const response = await api.post("/auth/oauth/convert-token", requestData);
      const data = response.data;

      if (data.status === "success") {
        // Check if account is new
        const isNewUser: boolean = response.data.data.isNewUser;

        if (isNewUser && !options?.extras) {
          const username = user?.displayName;
          callback?.(isNewUser, token, username);
          return;
        }

        // Login the user
        const {
          user: { username, _id, jobTitle, about, profilePic },
          accessToken,
        }: {
          accessToken: string;
          user: Exclude<IUser, "id"> & { _id: string };
        } = response.data.data;

        // Set access token
        authService.setAccessToken(accessToken);

        // Set user to local storage
        authService.setUser({
          id: _id,
          username,
          jobTitle,
          about,
          profilePic,
        });

        toast.success("Authentication", {
          description: "Login successful",
        });

        callback?.(isNewUser, token);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response?.data;

        toast.error("Authentication error", {
          description: data?.error.message,
        });
      } else {
        toast.error("Authentication error", {
          description: "Please try again",
        });
      }
    }
  }
}

const authService = new AuthService();
export default authService;
