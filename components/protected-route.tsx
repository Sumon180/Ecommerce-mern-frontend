"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authService, AuthState } from "../services/auth";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const [authState, setAuthState] = useState<AuthState>({
      isAuthenticated: false,
      user: null,
    });

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const user = await authService.login("username", "password"); // Example login call
          if (user) {
            setAuthState({ isAuthenticated: true, user });
          } else {
            setAuthState({ isAuthenticated: false, user: null });
            router.push("/auth/login");
          }
        } catch (error) {
          console.error("Authentication error:", error);
        }
      };

      checkAuth();
    }, []);

    if (!authState.isAuthenticated) {
      return null; // You can return a loading indicator or redirection message here
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
