"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Mail,
  Send,
} from "lucide-react";
import { useAuth } from "@hooks";

type SendOtpProps = {
  email: string;
  setEmail: (v: string) => void;
  onNext: () => void;
};

const SendOtpStep: React.FC<SendOtpProps> = ({ email, setEmail, onNext }) => {
  const { t } = useTranslation();
  const { sendOtp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError("");

    if (!email.trim()) return setError(t("please_enter_email"));

    setLoading(true);
    try {
      await sendOtp(email.trim());
      onNext();
    } catch (err) {
      setError(t("invalid") || "Có lỗi, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSendOtp} className="d-grid gap-3">
      <div>
        <label htmlFor="fp-email" className="form-label small fw-semibold">
          {t("email")}
        </label>
        <div className="input-group">
          <span className="input-group-text bg-transparent border-0 px-3">
            <Mail size={18} />
          </span>
          <input
            id="fp-email"
            type="email"
            className={`form-control rounded-pill shadow-sm py-2 ${
              error ? "is-invalid" : ""
            }`}
            placeholder={t("enter_email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby={error ? "fp-email-error" : undefined}
            aria-invalid={!!error}
          />
        </div>
        <div className="mt-2">
          <small className="text-muted">{t("we_will_send_otp_to_your_email")}</small>
        </div>
        {error && (
          <div id="fp-email-error" className="invalid-feedback d-block">
            {error}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-lg rounded-pill d-flex align-items-center justify-content-center gap-2"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm" aria-hidden />
            <span>{t("sending")}</span>
          </>
        ) : (
          <>
            <Send size={16} /> {t("send_otp")}
          </>
        )}
      </button>
    </form>
  );
};
export default SendOtpStep;