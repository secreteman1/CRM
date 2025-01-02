import loginMainImage from "../../assets/loginMainImage.png";
import loginSecondaryImage from "../../assets/loginSecondaryImage.png";
import "./LoginPage.scss";
import { Button, Form, Input, Typography, Checkbox, Modal, Spin } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { loginProfile } from "../../api/auth";
import { useDispatch } from "react-redux";
import { setIsAuthorized } from "../../store/authSlice";
import { setAccessToken } from "../../api/user";

function LoginPage() {
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (error) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(false);
      navigate("/todos");
    }
  };

  type UserLogin = {
    login: string;
    password: string;
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLoginButtonClick = async (values: UserLogin) => {
    showModal();
    setLoading(true);
    setError(null);
    try {
      const data = await loginProfile(values);
      if (typeof data === "string") {
        setError(data);
        return;
      }
      dispatch(setIsAuthorized(true));
      setAccessToken(data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      form.resetFields();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="main-login">
      <div className="div-main-login-image">
        <img src={loginMainImage} className="main-login-image"></img>
      </div>
      <div className="div-login-section">
        <img src={loginSecondaryImage} className="secondary-login-image "></img>
        <div className="div-login-form">
          <div className="div-login-form-upper-text">
            <Typography
              style={{
                fontSize: "36px",
                font: "Nunito Sans",
                fontWeight: "600",
                color: "rgba(82, 82, 82, 1)",
                height: "52px",
              }}
            >
              Login to your Account
            </Typography>
            <Typography
              style={{
                fontSize: "16px",
                font: "Nunito Sans",
                fontWeight: "400",
                color: "rgba(82, 82, 82, 1)",
                height: "22px",
              }}
            >
              See what is going on with your business
            </Typography>
          </div>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleLoginButtonClick}
            style={{ height: "266px", marginTop: "2rem" }}
          >
            <Form.Item
              name="login"
              label="Login"
              rules={[
                {
                  required: true,
                  message: "Неообходимо заполнить данное поле",
                },
                {
                  min: 2,
                  message: `Минимальное количество символов — 2`,
                },
                {
                  max: 60,
                  message: `Максимальное количество символов — 60`,
                },
                {
                  pattern: new RegExp(
                    /^[a-zA-Z@~`!@#$%^&*()_=+\\\\';:"\\/?>.<,-]+$/i
                  ),
                  message: "Только символы латинского алфавита",
                },
              ]}
            >
              <Input
                style={{
                  height: "45px",
                  borderColor: "rgba(222, 210, 217, 1)",
                }}
                size="large"
                placeholder="mail@abs.com"
              ></Input>
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              style={{ marginBottom: "0" }}
              rules={[
                {
                  required: true,
                  message: "Неообходимо заполнить данное поле",
                },
                {
                  min: 6,
                  message: `Минимальное количество символов — 6`,
                },
                {
                  max: 60,
                  message: `Максимальное количество символов — 60`,
                },
              ]}
            >
              <Input.Password
                style={{
                  height: "45px",
                  borderColor: "rgba(222, 210, 217, 1)",
                }}
                size="large"
                placeholder="****************"
              ></Input.Password>
            </Form.Item>
            <Form.Item>
              <Typography
                style={{
                  color: "#A1A1A1",
                  fontWeight: "400",
                  fontSize: "12px",
                  font: "Nunito Sans",
                  height: "16px",
                  gap: "5px",
                  display: "flex",
                }}
              >
                <Checkbox></Checkbox>
                Remember Me
                <Typography
                  style={{
                    color: "#7F265B",
                    fontWeight: "500",
                    fontSize: "12px",
                    font: "Nunito Sans",
                    marginLeft: "12.5rem",
                    paddingRight: "5px",
                    height: "16px",
                  }}
                >
                  Forgot Password?
                </Typography>
              </Typography>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                disabled={loading}
                style={{
                  width: "420px",
                  height: "50px",
                  backgroundColor: "#7F265B",
                  color: "#FFFF",
                  fontWeight: "700",
                  fontSize: "18px",
                  font: "Login",
                }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <Modal
            title={
              error ? (
                <div className="modal-title-text">
                  <CloseCircleTwoTone twoToneColor="#eb2f96" />
                  Ошибка
                </div>
              ) : (
                <div className="modal-title-text">
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                  Успех
                </div>
              )
            }
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Spin spinning={loading}>
              {error ? (
                <p>{error}</p>
              ) : (
                <p>
                  Вы успешно вошли. После нажажатия на кнопку OK вы перейдете на
                  главную страницу.
                </p>
              )}
            </Spin>
          </Modal>
          <div className="div-login-form-lower-text">
            <Typography
              style={{
                color: "#828282",
                fontWeight: "400",
                fontSize: "18px",
                font: "Nunito Sans",
                height: "25px",
                width: "170px",
              }}
            >
              Not Registered Yet?
            </Typography>
            <Typography
              style={{
                color: "#7F265B",
                fontWeight: "600",
                fontSize: "18px",
                font: "Nunito Sans",
                height: "25px",
                width: "160px",
              }}
            >
              <Link to="/register">Create an account</Link>
            </Typography>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
