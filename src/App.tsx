import {
  // LoginPage,
  // type Credentials,
  type RSACredentials,
  RSALoginPage,
} from "ui-kit";
import productIcon from "./assets/new_logo.svg";

function App() {
  // const selectOptions: { label: string; value: string }[] = [
  //   { label: "This BMC UI", value: "bmc_ui" },
  //   { label: "LDAP", value: "ldap" },
  //   { label: "Active Directory", value: "active_dir" },
  // ];

  // const links = [
  //   { label: "Help", href: "https://www.dell.com/support/home" },
  //   {
  //     label: "Drivers & Downloads",
  //     href: "https://www.dell.com/support/home/en-us?app=drivers",
  //   },
  //   {
  //     label: "Manuals",
  //     href: "https://www.dell.com/support/home/en-us?app=manuals",
  //   },
  //   { label: "TechCenter", href: "https://developer.dell.com" },
  // ];

  // const handleLogin = (credentials: Credentials) => {
  //   console.log(credentials);
  // };

  const handleRSALogin = (credentials: RSACredentials) => {
    console.log(credentials);
  };

  const onCancel = () => {
    console.log("action canceled");
  };

  return (
    <div>
      {/* <LoginPage
        productIcon={<img src={productIcon} alt="product icon" />}
        productTitle="Server BMC GUI"
        productSubtitle="Server Hostname | Server Model | License Type"
        domainOptions={selectOptions}
        onSubmit={handleLogin}
        linksArray={links}
        miscellaneousMsg="Security Notice: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        "
      /> */}
      <RSALoginPage
        productIcon={<img src={productIcon} alt="product icon" />}
        productTitle="Server BMC GUI"
        onSubmit={handleRSALogin}
        onCancel={onCancel}
        miscellaneousMsg="Copyright Notice: Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
    </div>
  );
}

export default App;
