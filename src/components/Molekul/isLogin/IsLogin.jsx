import { useNavigate } from "react-router-dom";
import Button from "../../components-detail/Button";
import "./isLogin.scss";

const IsLogin = ({ isPopUp }) => {
  const Navigate = useNavigate();
  return (
    <div className="container-is-login">
      <div className="content">
        <div className="buttonCancel">
          <Button
            classButton="secondary"
            label="Cancel"
            click={() => isPopUp(false)}
          />
        </div>
        <img
          src="https://cdn.pixabay.com/photo/2020/09/22/14/55/sad-emoji-5593352_960_720.png"
          alt=""
          width={150}
          height={170}
        />
        <p>Anda belum login harap login terlebih dahulu</p>
        <div className="buttonLogin">
          <Button
            classButton="primary"
            label="Login"
            click={() => Navigate("/login")}
          />
        </div>
      </div>
    </div>
  );
};

export default IsLogin;
