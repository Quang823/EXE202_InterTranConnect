import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { getUserInfoByUserIdService } from "../services/authService";

const useRefreshUserInfo = () => {
  const { user, token, refreshToken, priority, login } =
    useContext(AuthContext);

  const refreshUserInfo = async () => {
    if (user?.id) {
      const latestUser = await getUserInfoByUserIdService(user.id);
      login(
        {
          id: latestUser.id,
          fullName: latestUser.fullName,
          email: latestUser.email,
          role: latestUser.role || user.role,
          approvalStatus: latestUser.approvalStatus,
          // Thêm các trường khác nếu cần
        },
        token,
        refreshToken,
        priority
      );
    }
  };

  return refreshUserInfo;
};

export default useRefreshUserInfo;
