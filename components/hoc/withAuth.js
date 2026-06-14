import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useAuthStore from "../../stores/authStore";
import Loading from "../UI/Loading";

const withAuth = (WrappedComponent, authType = "private") => {
  const AuthChecker = (props) => {
    const router = useRouter();

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const hydrate = useAuthStore((state) => state.hydrate);

    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
      hydrate();
      setIsCheckingAuth(false);
    }, []);

    useEffect(() => {
      if (isCheckingAuth || isAuthenticated === null) return;

      console.log(isAuthenticated);

      if (authType === "private" && isAuthenticated === "false") {
        console.log("private");

        router.replace("/");
      }

      if (authType === "public" && isAuthenticated) {
        router.replace("/Home");
      }
    }, [isAuthenticated, isCheckingAuth, router, authType]);

    if (
      isCheckingAuth ||
      (authType === "private" && !isAuthenticated) ||
      (authType === "public" && isAuthenticated)
    ) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            fontSize: "24px",
          }}
        >
          <Loading>Chargement de l'authentification...</Loading>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  AuthChecker.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return AuthChecker;
};

export default withAuth;
