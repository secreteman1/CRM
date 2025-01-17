import {
  Layout,
  Form,
  Button,
  Input,
  Typography,
  Modal,
  Spin,
  Flex,
  Space,
} from "antd";
import { Link } from "react-router-dom";
import "./RegisterPage.scss";
import { useState } from "react";
import { registerProfile } from "../../api/auth";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { UserRegistration } from "../../types/types";

const MIN_USERNAME_LENGTH = 1;
const MAX_USERNAME_LENGTH = 60;

const MIN_LOGIN_LENGTH = 2;
const MAX_LOGIN_LENGTH = 60;

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 60;

function RegisterPage() {
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (error) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(false);
      navigate("/login");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleRegisterButtonClick = async (values: UserRegistration) => {
    showModal();
    setLoading(true);
    setError(null);
    try {
      const data = await registerProfile(values);
      if (typeof data === "string") {
        setError(data);
        return;
      }
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
    <>
      <Layout style={{ marginTop: "3rem" }}>
        <main className="main-register">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleRegisterButtonClick}
          >
            <div className="div-register-form-upper-text">Регистрация</div>
            <Form.Item
              label="Имя пользователя"
              required
              name="username"
              rules={[
                {
                  required: true,
                  message: "Неообходимо заполнить данное поле",
                },
                {
                  min: MIN_USERNAME_LENGTH,
                  message: `Минимальное количество символов — ${MIN_USERNAME_LENGTH}`,
                },
                {
                  max: MAX_USERNAME_LENGTH,
                  message: `Максимальное количество символов — ${MAX_USERNAME_LENGTH}`,
                },
                {
                  pattern: new RegExp(
                    /^[а-яА-Яa-zA-Z@~`!@#$%^&*()_=+\\\\';:"\\/?>.<,-]+$/i
                  ),
                  message: "Только символы русского и латинского алфавита",
                },
              ]}
            >
              <Input
                style={{
                  height: "45px",
                  borderColor: "rgba(222, 210, 217, 1)",
                }}
                size="large"
                placeholder="Имя пользователя"
              ></Input>
            </Form.Item>
            <Form.Item
              label="Логин"
              name="login"
              rules={[
                {
                  required: true,
                  message: "Неообходимо заполнить данное поле",
                },
                {
                  min: MIN_LOGIN_LENGTH,
                  message: `Минимальное количество символов — ${MIN_LOGIN_LENGTH}`,
                },
                {
                  max: MAX_LOGIN_LENGTH,
                  message: `Максимальное количество символов — ${MAX_LOGIN_LENGTH}`,
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
                placeholder="Логин"
              ></Input>
            </Form.Item>
            <Form.Item
              name="password"
              label="Пароль"
              rules={[
                {
                  required: true,
                  message: "Неообходимо заполнить данное поле",
                },
                {
                  min: MIN_PASSWORD_LENGTH,
                  message: `Минимальное количество символов — ${MIN_PASSWORD_LENGTH}`,
                },
                {
                  max: MAX_PASSWORD_LENGTH,
                  message: `Максимальное количество символов — ${MAX_PASSWORD_LENGTH}`,
                },
              ]}
            >
              <Input.Password
                style={{
                  height: "45px",
                  borderColor: "rgba(222, 210, 217, 1)",
                }}
                size="large"
                placeholder="Пароль"
              ></Input.Password>
            </Form.Item>
            <Form.Item
              name="repeatpassword"
              label="Повторите пароль"
              rules={[
                {
                  required: true,
                  message: "Неообходимо заполнить данное поле",
                },

                (formInstance) => ({
                  message: "Пароли не совпадают!",
                  validator(_, value) {
                    if (value !== formInstance.getFieldValue("password")) {
                      return Promise.reject(new Error());
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input.Password
                style={{
                  height: "45px",
                  borderColor: "rgba(222, 210, 217, 1)",
                }}
                size="large"
                placeholder=" Повторите пароль"
              ></Input.Password>
            </Form.Item>
            <Form.Item
              name="email"
              label="Почтовый адрес"
              rules={[
                {
                  required: true,
                  message: "Неообходимо заполнить данное поле",
                },
                {
                  pattern: new RegExp(
                    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
                  ),
                  message: "Почтовый адрес должен быть валидным",
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
              name="phoneNumber"
              label="Телефон"
              rules={[
                {
                  pattern: new RegExp(/^\+7\d{10}$/),
                  message: "Телефон должен быть валидным",
                },
              ]}
            >
              <Input
                style={{
                  height: "45px",
                  borderColor: "rgba(222, 210, 217, 1)",
                }}
                size="large"
                placeholder="+7XXXXXXXXXX"
              ></Input>
            </Form.Item>
            <Form.Item>
              <Button
                style={{
                  width: "420px",
                  height: "50px",
                  backgroundColor: "#7F265B",
                  color: "#FFFF",
                  fontWeight: "700",
                  fontSize: "18px",
                  font: "Login",
                }}
                htmlType="submit"
                type="primary"
                size="large"
                disabled={loading}
              >
                Зарегистрироваться
              </Button>
            </Form.Item>
            <Form.Item>
              <Flex justify="center">
                <Typography
                  style={{
                    color: "#828282",
                    fontWeight: "400",
                    fontSize: "18px",
                    font: "Nunito Sans",
                    height: "25px",
                    width: "210px",
                  }}
                >
                  Already Registered?
                </Typography>
                <Typography
                  style={{
                    color: "#7F265B",
                    fontWeight: "600",
                    fontSize: "18px",
                    font: "Nunito Sans",
                    height: "25px",
                  }}
                >
                  <Link to="/login">Login to your account</Link>
                </Typography>
              </Flex>
            </Form.Item>
          </Form>
          <Modal
            title={
              error ? (
                <Space>
                  <CloseCircleTwoTone twoToneColor="#eb2f96" />
                  Ошибка
                </Space>
              ) : (
                <Space>
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                  Успех
                </Space>
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
                  Вы успешно зарегестрировались. После нажажатия на кнопку OK вы
                  перейдете на страницу авторизации для входа в систему.
                </p>
              )}
            </Spin>
          </Modal>
        </main>
      </Layout>
    </>
  );
}

export default RegisterPage;
