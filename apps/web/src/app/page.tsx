'use client';
import { useEffect } from "react";
import { useAuth } from "@hooks";
import { useRouter } from "next/navigation";
import { UserRole } from "packages/types/UserType";
import RoleCard from "@/components/cards/RoleCard";
import { useTranslation } from "react-i18next";

export default function Index() {
  const { user, setActiveRole } = useAuth();
  const router = useRouter();
   const { t } = useTranslation();

  useEffect(() => {
    if (user && user.role.length == 1 ) {
      router.push("/" + user.role[0].toLowerCase());
    } else if (!user) {
      router.push("/login");
    }
  }, [user]);

  const handleSelectRole = (role: UserRole) => {
    setActiveRole(role);
    router.push("/" + role.toLowerCase());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-3xl w-full">
        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-8">
          Bạn muốn vào hệ thống với vai trò nào?
        </h1>

        <div className="row g-4">
          <RoleCard
            icon="bi-mortarboard"
            title={t("auth.student")}
            description={t("auth.role_student_desc")}
            onClick={() => handleSelectRole(UserRole.STUDENT)}
          />

          <RoleCard
            icon="bi-easel"
            title={t("auth.teacher")}
            description={t("auth.role_teacher_desc")}
            onClick={() => handleSelectRole(UserRole.TEACHER)}
          />
        </div>
      </div>
    </div>
  );
}
