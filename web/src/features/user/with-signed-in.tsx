import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../main";
import React from "react";

function WithSignedIn(
  InnerComponent: React.ComponentType
): React.FunctionComponent {
  return function SignedIn(props) {
    const navigate = useNavigate();
    const signedInUser = useSelector(
      (state: RootState) => state.user.signedInUser
    );

    React.useEffect(() => {
      if (!signedInUser) {
        navigate("/auth/login");
      }
    }, [navigate, signedInUser]);

    return <InnerComponent {...props} />;
  };
}

export default WithSignedIn;
