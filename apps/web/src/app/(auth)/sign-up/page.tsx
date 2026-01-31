"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff } from "lucide-react";

import { useAuth, useModalNotification } from "@hooks";
import { UserRole } from "packages/types/User";

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { user, signUp } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { setModalProps, buttonClose } = useModalNotification();

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  const validateHandlerSignuUp = () => {
    const next: Record<string, string> = {};

    if (!displayName.trim()) {
      next.displayName = t("auth.errors.display_name_required");
    }

    if (!email.trim()) {
      next.email = t("auth.errors.email_required");
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
    ) {
      next.email = t("auth.errors.email_invalid");
    }

    if (!phone.trim()) {
      next.phone = t("auth.errors.phone_required");
    } else if (!/^[0-9+\-\s()]{10,15}$/.test(phone)) {
      next.phone = t("auth.errors.phone_invalid");
    }

    if (!role) {
      next.role = t("auth.errors.role_required");
    }

    if (!password) {
      next.password = t("auth.errors.password_required");
    } else if (password.length < 8) {
      next.password = t("auth.errors.password_min");
    }

    if (confirmPassword !== password) {
      next.confirmPassword = t("auth.errors.password_confirm_invalid");
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateHandlerSignuUp()) return;

    const payload = {
      displayName: displayName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      role,
      password
    };

    try {
      await signUp(payload);
      setModalProps({
        params: {
          title: t("auth.register_success_title"),
          content : t("auth.register_success_message"),
          type: "success",
          buttons: [buttonClose],
        },
        visible: true
      });
      router.push("/login");
    } catch (error: any) {
      error.response.data.errors.forEach((err: { field: string; message: string }) => {
        setErrors((prev) => ({
          ...prev,
          [err.field]: err.message,
        }));
      });
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center px-4 py-5">
      <div className="container-xl bg-body rounded-4 shadow-lg overflow-hidden">
        <div className="row g-0">

          {/* LEFT */}
          <div className="col-lg-5 bg-primary bg-gradient p-5 text-white d-flex flex-column justify-content-center">
            <div className="d-flex align-items-center gap-3 mb-4">
              <Image
                src="/images/logo-small.png"
                alt="logo"
                width={48}
                height={48}
              />
              <h1 className="h3 fw-bold">{t("brand_name")}</h1>
            </div>
            <p className="fs-5 opacity-75">
              {t("auth.register_subtitle")}
            </p>
          </div>

          {/* RIGHT */}
          <div className="col-lg-7 p-5">
            <form onSubmit={handleSignUp} className="d-grid gap-3">

              {/* DISPLAY NAME */}
              <div>
                <label className="form-label">
                  {t("auth.display_name")}
                </label>
                <input
                  placeholder={t("auth.display_name_placeholder")}
                  className={`form-control rounded-pill px-4 ${
                    errors.displayName ? "is-invalid" : ""
                  }`}
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="form-label">
                  {t("auth.email")}
                </label>
                <input
                  type="email"
                  placeholder={t("auth.email_placeholder")}
                  className={`form-control rounded-pill px-4 ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="form-label">
                  {t("auth.phone")}
                </label>
                <input
                  placeholder={t("auth.phone_placeholder")}
                  className={`form-control rounded-pill px-4 ${
                    errors.phone ? "is-invalid" : ""
                  }`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* ROLE */}
              <div className="row g-3">
                {[UserRole.STUDENT, UserRole.TEACHER].map((r) => (
                  <div key={r} className="col-6">
                    <label
                      className={`border rounded-3 p-3 w-100 text-center cursor-pointer ${
                        role === r
                          ? "border-primary bg-primary-subtle"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        className="d-none"
                        checked={role === r}
                        onChange={() => setRole(r)}
                      />
                      <strong>
                        {r === UserRole.STUDENT
                          ? t("auth.student")
                          : t("auth.teacher")}
                      </strong>
                    </label>
                  </div>
                ))}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="form-label">
                  {t("auth.password")}
                </label>
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("auth.password_placeholder")}
                    className={`form-control rounded-pill px-4 ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute top-50 end-0 translate-middle-y"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="form-label">
                  {t("auth.confirm_password")}
                </label>
                <div className="position-relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={t("auth.confirm_password_placeholder")}
                    className={`form-control rounded-pill px-4 ${
                      errors.confirmPassword ? "is-invalid" : ""
                    }`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute top-50 end-0 translate-middle-y"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* SUBMIT */}
              <button
                className="btn btn-primary btn-lg rounded-pill mt-3"
              >
                  {t("auth.create_account")}
              </button>

              <p className="text-center text-muted">
                {t("already_have_account")}{" "}
                <a href="/login" className="text-primary">
                  {t("sign_in")}
                </a>
              </p>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
