import { instance } from "./todo";

let accessToken: string | null = null;

type BasicUserData = {
  email: string;
  phoneNumber: string;
  username: string;
};

type RigthsData = {
  field: string;
  value: string;
};

export function setAccessToken(token: string) {
  accessToken = token;
}

export function getAccessToken(): string | null {
  return accessToken;
}

instance.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export async function getAllUsers(
  sortField: string | undefined,
  sortOrder: string,
  search: string,
  currentPage: number,
  pageSize: number,
  isBlocked?: boolean
) {
  try {
    const response = await instance.get("/admin/users", {
      params: {
        limit: pageSize,
        offset: currentPage - 1,
        sortBy: sortField,
        sortOrder: sortOrder,
        search: search,
        ...(isBlocked !== undefined && { isBlocked }),
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return "An unknown error occurred";
    }
  }
}

export async function getUser(id: string | undefined) {
  try {
    const response = await instance.get(`/admin/users/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return "An unknown error occurred";
    }
  }
}

export async function putUser(
  id: string | undefined,
  value: Partial<BasicUserData>
) {
  try {
    const response = await instance.put(`/admin/users/${id}`, value);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return "An unknown error occurred";
    }
  }
}

export async function deleteUser(id: number) {
  try {
    const response = await instance.delete(`/admin/users/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return "An unknown error occurred";
    }
  }
}

export async function blockUser(id: number) {
  try {
    const response = await instance.post(`/admin/users/${id}/block`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return "An unknown error occurred";
    }
  }
}

export async function unblockUser(id: number) {
  try {
    const response = await instance.post(`/admin/users/${id}/unblock`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return "An unknown error occurred";
    }
  }
}

export async function updateRights(id: number, rightsInfo: RigthsData) {
  try {
    const response = await instance.post(
      `/admin/users/${id}/rights`,
      rightsInfo
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return "An unknown error occurred";
    }
  }
}
