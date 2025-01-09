import {
  SearchOutlined,
  PhoneOutlined,
  MailOutlined,
  ArrowRightOutlined,
  DashOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Table,
  Input,
  Tag,
  Space,
  Alert,
  Spin,
  Button,
  Dropdown,
  Modal,
  Row,
  Col,
  Typography,
} from "antd";
import type { TableProps } from "antd";
import {
  getAllUsers,
  deleteUser,
  blockUser,
  unblockUser,
  updateRights,
} from "../../api/admin.ts";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { SortOrder } from "antd/es/table/interface";

function UsersPage() {
  const [users, setUsers] = useState<DataType[]>([
    {
      date: "",
      email: "",
      id: 0,
      isAdmin: true,
      isBlocked: false,
      phoneNumber: "",
      username: "",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUnblockModalOpen, setUnblockModalOpen] = useState(false);
  const [isBlockModalOpen, setBlockModalOpen] = useState(false);
  const [isGiveAdminModalOpen, setGiveAdminModalOpen] = useState(false);
  const [isTakeAdminModalOpen, setTakeAdminModalOpen] = useState(false);
  const [userId, setUserId] = useState(0);
  const [sortField, setSortField] = useState<string | undefined>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder | undefined>("ascend");
  const [searchInput, setSearchInput] = useState<string>("");
  const [filterData, setFilterData] = useState("0");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const { Title } = Typography;

  const showDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteOk = async () => {
    setLoading(true);
    try {
      await deleteUser(userId);
      await fetchAllUsers();
      setDeleteModalOpen(false);
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

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };

  const showUnblockModal = () => {
    setUnblockModalOpen(true);
  };

  const handleUnblockOk = async () => {
    setLoading(true);
    try {
      await unblockUser(userId);
      await fetchAllUsers();
      setUnblockModalOpen(false);
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

  const handleUnblockCancel = () => {
    setBlockModalOpen(false);
  };

  const showBlockModal = () => {
    setBlockModalOpen(true);
  };

  const handleBlockOk = async () => {
    setLoading(true);
    try {
      await blockUser(userId);
      await fetchAllUsers();
      setBlockModalOpen(false);
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

  const handleBlockCancel = () => {
    setBlockModalOpen(false);
  };

  const showGiveAdminModal = () => {
    setGiveAdminModalOpen(true);
  };

  const handleGiveAdminOk = async () => {
    setLoading(true);
    try {
      await updateRights(userId, { field: "isAdmin", value: "true" });
      await fetchAllUsers();
      setGiveAdminModalOpen(false);
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

  const handleGiveAdminCancel = () => {
    setGiveAdminModalOpen(false);
  };

  const showTakeAdminModal = () => {
    setTakeAdminModalOpen(true);
  };

  const handleTakeAdminOk = async () => {
    setLoading(true);
    try {
      await updateRights(userId, { field: "isAdmin", value: "false" });
      await fetchAllUsers();
      setTakeAdminModalOpen(false);
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

  const handleTakeAdminCancel = () => {
    setTakeAdminModalOpen(false);
  };

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers(
        sortField,
        sortOrder === "ascend" ? "asc" : sortOrder === "descend" ? "desc" : "",
        searchInput,
        currentPage,
        pageSize,
        filterData === "1" ? true : filterData === "2" ? false : undefined
      );
      setUsers(data.data);
      setTotalUsers(data.meta.totalAmount);
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

  const searchInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    (async () => {
      await fetchAllUsers();
    })();
  }, [sortField, sortOrder, searchInput, filterData, currentPage, pageSize]);

  interface DataType {
    date: string;
    email: string;
    id: number;
    isAdmin: boolean;
    isBlocked: boolean;
    phoneNumber: string;
    username: string;
  }

  const handleDeleteUser = (id: number) => {
    setUserId(id);
    showDeleteModal();
  };

  const unblockUserProfile = (id: number) => {
    setUserId(id);
    showUnblockModal();
  };

  const blockUserProfile = (id: number) => {
    setUserId(id);
    showBlockModal();
  };

  const giveAdmin = (id: number) => {
    setUserId(id);
    showGiveAdminModal();
  };

  const takeAdmin = (id: number) => {
    setUserId(id);
    showTakeAdminModal();
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Имя",
      dataIndex: "username",
      key: "username",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
      render: (_, { email }) => {
        return (
          <>
            <Space>
              <MailOutlined />
              {email}
            </Space>
          </>
        );
      },
    },
    {
      title: "Телефон",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (_, { phoneNumber }) => {
        if (!phoneNumber) {
          return <>Номер отсутствует</>;
        } else {
          return (
            <>
              <Space>
                <PhoneOutlined rotate={90} />
                {phoneNumber}
              </Space>
            </>
          );
        }
      },
    },
    {
      title: "Роли",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (_, { isAdmin }) => (
        <>
          <Tag color={isAdmin ? "geekblue" : "purple"}>
            {isAdmin ? "Admin" : "User"}
          </Tag>
        </>
      ),
    },
    {
      title: "Блокировка",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (_, { isBlocked }) => <>{isBlocked ? "+" : "-"}</>,
    },
    {
      title: "Дата регистрации",
      dataIndex: "date",
      key: "date",
      render: (_, { date }) => {
        if (!date) return "N/A";
        const [year, month, day] = new Date(date)
          .toISOString()
          .split("T")[0]
          .split("-");
        return <>{`${day}.${month}.${year}`}</>;
      },
    },

    {
      title: "",
      dataIndex: "",
      key: "",
      render: (_, { isAdmin, isBlocked, id }) => {
        const menuItems: MenuProps["items"] = [
          {
            key: "1",
            label: (
              <Button type="text" onClick={() => handleDeleteUser(id)}>
                Удалить пользователя
              </Button>
            ),
          },
          {
            key: "2",
            label: isAdmin ? (
              <Button type="text" onClick={() => takeAdmin(id)}>
                Забрать роль админа
              </Button>
            ) : (
              <Button type="text" onClick={() => giveAdmin(id)}>
                Дать роль админа
              </Button>
            ),
          },
        ];
        return (
          <>
            <Space>
              {isBlocked ? (
                <Button onClick={() => unblockUserProfile(id)}>
                  Разблокировать
                </Button>
              ) : (
                <Button onClick={() => blockUserProfile(id)}>
                  Блокировать
                </Button>
              )}
              <Button onClick={() => navigate(`/edit/${id}`)}>
                <ArrowRightOutlined />
              </Button>

              <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Button type="text">
                    <DashOutlined rotate={90} />
                  </Button>
                </a>
              </Dropdown>
            </Space>
          </>
        );
      },
    },
  ];

  const handleTableChange: TableProps<DataType>["onChange"] = (
    pagination,
    _,
    sorter
  ) => {
    setCurrentPage(pagination.current === undefined ? 0 : pagination.current);
    setPageSize(pagination.pageSize === undefined ? 0 : pagination.pageSize);
    const field = Array.isArray(sorter) ? undefined : (sorter.field as string);
    const order = Array.isArray(sorter) ? undefined : sorter.order;
    setSortField(field);
    setSortOrder(order);
  };

  const items: MenuProps["items"] = [
    {
      label: "Все пользователи",
      key: "0",
    },
    {
      label: "Только заблокированные пользователи",
      key: "1",
    },
    {
      label: "Только активные пользователи",
      key: "2",
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "0":
        setFilterData("0");
        break;
      case "1":
        setFilterData("1");
        break;
      case "2":
        setFilterData("2");
        break;
      default:
        break;
    }
  };

  return (
    <Layout
      style={{
        flex: "1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "1rem",
      }}
    >
      <Spin spinning={loading}>
        {error ? (
          <Alert message={error} type="error"></Alert>
        ) : (
          <>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Row align="middle" justify="space-between">
                <Col span={12}>
                  <Title level={3}>Пользователи</Title>
                </Col>
                <Col span={9}>
                  <Input
                    prefix={<SearchOutlined />}
                    placeholder="Поиск по имени или email"
                    onChange={searchInfo}
                    value={searchInput}
                  />
                </Col>
                <Col span={2}>
                  <Dropdown
                    menu={{
                      items,
                      selectable: true,
                      defaultSelectedKeys: ["0"],
                      onClick: handleMenuClick,
                    }}
                    trigger={["click"]}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <FilterOutlined />
                        Фильтр
                      </Space>
                    </a>
                  </Dropdown>
                </Col>
              </Row>
            </Space>
            <Table<DataType>
              columns={columns}
              dataSource={users}
              rowKey="id"
              onChange={handleTableChange}
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: totalUsers,
                showSizeChanger: true,
                pageSizeOptions: [5, 10, 20, 50],
              }}
            />
          </>
        )}
      </Spin>
      <Modal
        title="Удаление пользователя"
        open={isDeleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      >
        <p>Вы действительно хотите удалить этого пользователя?</p>
      </Modal>
      <Modal
        title="Разблокирование пользователя"
        open={isUnblockModalOpen}
        onOk={handleUnblockOk}
        onCancel={handleUnblockCancel}
      >
        <p>Вы действительно хотите разблокировать этого пользователя?</p>
      </Modal>
      <Modal
        title="Блокирование пользователя"
        open={isBlockModalOpen}
        onOk={handleBlockOk}
        onCancel={handleBlockCancel}
      >
        <p>Вы действительно хотите заблокировать этого пользователя?</p>
      </Modal>
      <Modal
        title="Повышение прав пользователя"
        open={isGiveAdminModalOpen}
        onOk={handleGiveAdminOk}
        onCancel={handleGiveAdminCancel}
      >
        <p>Вы действительно хотите дать роль админа этому пользователю?</p>
      </Modal>
      <Modal
        title="Понижение прав пользователя"
        open={isTakeAdminModalOpen}
        onOk={handleTakeAdminOk}
        onCancel={handleTakeAdminCancel}
      >
        <p>Вы действительно хотите забрать роль админа у этого пользователя?</p>
      </Modal>
    </Layout>
  );
}

export default UsersPage;
