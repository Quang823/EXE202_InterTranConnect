import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { getUserInfoByUserIdService } from "../services/authService";
import { fetchTranslatorCertificateStatus } from "../services/translatorService";

const useRefreshUserInfo = () => {
  const { user, token, refreshToken, priority, login } =
    useContext(AuthContext);

  const refreshUserInfo = async () => {
    if (user?.id) {
      const latestUser = await getUserInfoByUserIdService(user.id);
      let approvalStatus = latestUser.approvalStatus;
      // Nếu là role Talent thì lấy approvalStatus từ certificate status API
      if (latestUser.role === "Talent") {
        try {
          const certStatus = await fetchTranslatorCertificateStatus(user.id);
          if (certStatus) {
            approvalStatus = certStatus;
          }
        } catch (e) {
          // fallback giữ nguyên approvalStatus nếu lỗi
        }
      }
      login(
        {
          id: latestUser.id,
          fullName: latestUser.fullName,
          email: latestUser.email,
          role: latestUser.role || user.role,
          approvalStatus,
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
