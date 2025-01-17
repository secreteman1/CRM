import { Layout, Form, Button, Input, Modal, Spin, Flex, Space } from "antd";

import { useEffect, useState } from "react";

import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getUser, putUser } from "../../api/admin";
import { BasicUserData } from "../../types/types";

function EditPage() {
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({
    date: "",
    email: "",
    id: 0,
    isAdmin: true,
    isBlocked: false,
    phoneNumber: "",
    username: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      const data = await getUser(id);
      setUser(data);
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

  useEffect(() => {
    (async () => {
      await fetchUser();
    })();
  }, []);

  const handleOk = () => {
    if (error) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(false);
      navigate("/users");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeUserInfo = async () => {
    showModal();
    setLoading(true);
    setError(null);
    try {
      const currentValues = form.getFieldsValue();
      const changedValues: Partial<BasicUserData> = Object.fromEntries(
        Object.entries(currentValues).filter(
          ([key, value]) => user[key as keyof BasicUserData] !== value
        )
      );

      const data = await putUser(id, changedValues);
      if (typeof data === "string") {
        setError(data);
        return;
      }
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
          <Spin spinning={loading}>
            {user.username ? (
              <Form
                form={form}
                layout="vertical"
                onFinish={handleChangeUserInfo}
              >
                <Flex
                  justify="center"
                  style={{
                    color: "#828282",
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                  }}
                >
                  Редоктирование данных пользователя
                </Flex>
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
                      min: 1,
                      message: `Минимальное количество символов — 1`,
                    },
                    {
                      max: 60,
                      message: `Максимальное количество символов — 60`,
                    },
                    {
                      pattern: new RegExp(
                        /^[а-яА-Яa-zA-Z@~`!@#$%^&*()_=+\\\\';:"\\/?>.<,-]+$/i
                      ),
                      message: "Только символы русского и латинского алфавита",
                    },
                  ]}
                  initialValue={user.username}
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
                  initialValue={user.email}
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
                  initialValue={user.phoneNumber}
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
                    Сохранить
                  </Button>
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
                    onClick={() => navigate("/users")}
                    type="primary"
                    size="large"
                    disabled={loading}
                  >
                    Отмена
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <div>Loading user data...</div>
            )}

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
                    Вы успешно изменили данные пользователя. После нажажатия на
                    кнопку OK вы перейдете на страницу пользователи.
                  </p>
                )}
              </Spin>
            </Modal>
          </Spin>
        </main>
      </Layout>
    </>
  );
}

export default EditPage;
