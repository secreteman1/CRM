import { Typography, Layout } from "antd";

const { Title } = Typography;

function ProfilePage() {
  return (
    <Layout
      style={{
        flex: "1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <Title>Привет</Title>
    </Layout>
  );
}
export default ProfilePage;
