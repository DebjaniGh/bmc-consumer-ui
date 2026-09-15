import {
  LoginPage,
  RSALoginPage,
  SmartCardLoginPage,
  type Credentials,
  type RSACredentials,
  type SCCredentials,
} from "@debjani6ghosh/bmc-ui-kit";
import productIcon from "../../assets/new_logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export function Login() {
  /* state */
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState<
    "default" | "rsa" | "smart-card"
  >("default");
  const showDefaultLogin = loginState === "default";

  const productTitle = "Server BMC GUI";

  /** LoginPage state and handler  */
  const selectOptions: { label: string; value: string }[] = [
    { label: "This BMC UI", value: "bmc_ui" },
    { label: "LDAP", value: "ldap" },
    { label: "Active Directory", value: "active_dir" },
    { label: "Smart Card", value: "smart_card" },
    { label: "RSA", value: "rsa" },
  ];

  const links = [
    { label: "Help", href: "https://www.dell.com/support/home" },
    {
      label: "Drivers & Downloads",
      href: "https://www.dell.com/support/home/en-us?app=drivers",
    },
    {
      label: "Manuals",
      href: "https://www.dell.com/support/home/en-us?app=manuals",
    },
    { label: "TechCenter", href: "https://developer.dell.com" },
  ];

  const handleLogin = (credentials: Credentials) => {
    const { username, password, domain } = credentials;
    if (username === "user123" && password === "xyz123") {
      if (domain === "bmc_ui") {
        navigate("/dashboard", { replace: true });
      } else if (domain === "rsa") {
        setLoginState("rsa");
      } else if (domain === "smart_card") {
        setLoginState("smart-card");
      }
    }
  };

  /** RSALoginPage state and handler */
  const showRSALogin = loginState === "rsa";

  const handleRSALogin = (credentials: RSACredentials) => {
    const { passcode } = credentials;
    if (passcode === "121234") {
      navigate("/dashboard", { replace: true });
    } else {
      // show error msg
    }
  };

  /** SCLoginPage state and handler */
  const showSCLogin = loginState === "smart-card";
  const handleSmartCardLogin = (credentials: SCCredentials) => {
    const { scpin } = credentials;
    if (scpin === "121234") {
      navigate("/dashboard", { replace: true });
    } else {
      // show error msg
    }
  };

  const onLoginCancel = () => {
    setLoginState("default");
  };

  return (
    <div>
      {showDefaultLogin && (
        <LoginPage
          productIcon={<img src={productIcon} alt="product icon" />}
          productTitle={productTitle}
          productSubtitle="Server Hostname | Server Model | License Type"
          domainOptions={selectOptions}
          onSubmit={handleLogin}
          linksArray={links}
          miscellaneousMsg="Security Notice: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        "
        />
      )}
      {showRSALogin && (
        <RSALoginPage
          productIcon={<img src={productIcon} alt="product icon" />}
          productTitle={productTitle}
          onSubmit={handleRSALogin}
          onCancel={onLoginCancel}
          miscellaneousMsg="Copyright Notice: Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
      )}
      {showSCLogin && (
        <SmartCardLoginPage
          productIcon={<img src={productIcon} alt="product icon" />}
          productTitle={productTitle}
          onSubmit={handleSmartCardLogin}
          onCancel={onLoginCancel}
          miscellaneousMsg="Security Notice: Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
      )}
    </div>
  );
}
