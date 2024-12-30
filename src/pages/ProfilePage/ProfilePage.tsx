import { Typography, Layout, Spin, Alert, Button, Flex } from "antd";
import { postRefreshToken } from "../../api/auth";
import { getUserProfile, setAccessToken } from "../../api/user";
import { useEffect, useState } from "react";
import { deleteTokens, saveTokens } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStore } from "../../store/store";

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
    email: "Почтовый адрес не указан",
    id: 0,
    isAdmin: false,
    isBlocked: false,
    phoneNumber: "Телефон не указан",
    username: "Имя пользователя не указано",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem("refreshToken");

  const accessToken = useSelector(
    (state: RootStore) => state.autorisationTokens.accessToken
  );

  function handleLogOut() {
    dispatch(deleteTokens());
    localStorage.clear();
    navigate("/login");
  }

  const fetchProfileInfo = async () => {
    setLoading(true);
    try {
      setAccessToken(accessToken);

      let data = await getUserProfile();
      if (typeof data === "string") {
        setError(data);
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const tokensFromRefresh = await postRefreshToken(refreshToken);
          if (typeof tokensFromRefresh === "string") {
            setError(tokensFromRefresh);

            dispatch(deleteTokens());
            localStorage.clear();
            return;
          }
          dispatch(
            saveTokens({
              accessToken: tokensFromRefresh.accessToken,
              refreshToken: tokensFromRefresh.refreshToken,
            })
          );
          localStorage.setItem("refreshToken", tokensFromRefresh.refreshToken);
          setError(null);
          data = await getUserProfile();
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unknown error occurred");
          }
        } finally {
          setLoading(false);
        }
      }
      setProfile(data);
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
    const fetchData = async function () {
      await fetchProfileInfo();
    };
    fetchData();
  }, [accessToken, refreshToken]);

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
            <Typography> Имя пользователя: {profile.username}</Typography>
            <Typography>Почтовый адрес: {profile.email}</Typography>
            <Typography>Телефон: {profile.phoneNumber}</Typography>
            <Flex
              justify="center"
              style={{
                marginTop: "0.5rem",
              }}
            >
              <Button onClick={handleLogOut}>Log out</Button>
            </Flex>
          </>
        )}
      </Spin>
    </Layout>
  );
}
export default ProfilePage;
