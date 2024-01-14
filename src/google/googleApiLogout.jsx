import { GoogleLogin, GoogleLogout } from "react-google-login";

const clientId =
  "526490962762-8q7l0cbrfu9gh82nk3jqa8hrbve2n3bg.apps.googleusercontent.com";

function Logout() {
  const onSuccess = () => {
    console.log("Log out successfull!");
  };

  return (
    <div id="logOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText={"logout"}
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default Logout;
