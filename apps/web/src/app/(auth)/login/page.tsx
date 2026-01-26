"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Mail, Lock, Check, Loader2 } from "lucide-react";
import { useAuth } from "@hooks";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { login, loading, user, error } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  useEffect(() => {
    if (error) {
      setErrors({
        general: typeof error === "string" ? error : t("auth.login_failed"),
      });
    }
  }, [error]);

  const validateHandleLogin = () => {
    const next: typeof errors = {};

    if (!email) {
      next.email = t("auth.errors.email_required");
    }
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      next.email = t("auth.errors.email_invalid");
    }

    if (!password) {
      next.password = t("auth.errors.password_required");
    }
    else if (password.length < 6) {
      next.password = t("auth.errors.password_min");
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!validateHandleLogin()) return;
    await login(email, password);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center login-bg">
      <div className="container">
        <div className="row shadow rounded overflow-hidden login-card mx-auto">
          {/* LEFT */}
          <div className="col-md-6 d-none d-md-flex flex-column align-items-center justify-content-center login-left p-5">
            <Image
              src="/images/login-illustration.png"
              alt="Login"
              width={360}
              height={280}
            />
            <h2 className="mt-4 fw-semibold">{t("welcome_back")}</h2>
            <p className="text-center opacity-75">
              {t("login_page.subtitle")}
            </p>
          </div>

          {/* RIGHT */}
          <div className="col-md-6 p-4 p-md-5">
            {/* Brand */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <Image src="/images/logo-small.png" alt="Logo" width={48} height={48} />
              <div>
                <h6 className="mb-0 fw-bold">{t("brand_name")}</h6>
                <small className="text-secondary">{t("brand_tagline")}</small>
              </div>
            </div>

            <h3 className="fw-semibold mb-1">{t("sign_in")}</h3>
            <p className="text-secondary mb-4">{t("auth.welcome_text")}</p>

            {/* Error */}
            {errors.general && (
              <div className="alert alert-danger py-2">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleLogin} noValidate>
              {/* Email */}
              <div className="mb-3">
                <label className="form-label">{t("auth.email")}</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errors.email && (
                  <div className="invalid-feedback d-block">
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">{t("auth.password")}</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <Lock size={16} />
                  </span>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {errors.password && (
                  <div className="invalid-feedback d-block">
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-end align-items-center mb-3">
                <Link href="/forgot-password" className="text-decoration-none">
                  {t("forgot_password")}
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="spinner-border spinner-border-sm" />
                    {t("common.loading")}
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    {t("sign_in")}
                  </>
                )}
              </button>
            </form>

            <p className="text-center mt-3 text-secondary">
              {t("dont_have_account")}{" "}
              <Link href="/sign-up" className="fw-semibold text-decoration-none">
                {t("sign_up")}
              </Link>
            </p>

            <hr />

            <div className="row g-2">
              <div className="col">
                <button className="btn btn-outline-secondary w-100">
                  Google
                </button>
              </div>
              <div className="col">
                <button className="btn btn-outline-secondary w-100">
                  Facebook
                </button>
              </div>
              <div className="col">
                <button className="btn btn-outline-secondary w-100">
                  Apple
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
