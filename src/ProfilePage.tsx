// import { Typography, Layout } from "antd";
// import { getUserProfile } from "./api";
// const { Title } = Typography;

// function ProfilePage() {
//   return (
//     <Layout
//       style={{
//         flex: "1",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         marginTop: "20px",
//       }}
//     >
//       <Title>Привет</Title>
//     </Layout>
//   );
// }
// export default ProfilePage;

import { useEffect, useState } from "react";
import { Typography, Layout, Spin, Alert } from "antd";
import { getUserProfile } from "./api/todo";

const { Title, Text } = Typography;

type ProfileData = {
  date: string;
  email: string;
  id: number;
  isAdmin: boolean;
  isBlocked: boolean;
  phoneNumber: string;
  username: string;
};
function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    date: Date(),
    email: "string",
    id: 0,
    isAdmin: false,
    isBlocked: false,
    phoneNumber: "string",
    username: "string",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile();
        if (typeof data === "string") {
          setError(data);
        } else {
          setProfile(data);
        }
      } catch (err) {
        setError("An error occurred while fetching the profile.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

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
      {loading && <Spin size="large" />}
      {error && <Alert message={error} type="error" />}{" "}
      {profile && (
        <div>
          <Text strong>Name: {profile.username}</Text>
          <br />
          <Text strong>Email: {profile.email}</Text>
        </div>
      )}
    </Layout>
  );
}

export default ProfilePage;
