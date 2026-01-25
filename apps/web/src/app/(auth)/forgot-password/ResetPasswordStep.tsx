import { useAuth } from "@hooks";
import { ArrowLeft, Eye, EyeOff, Key, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type ResetProps = {
  email: string;
  onBack: () => void;
};
const RESEND_COOLDOWN = 60;

const ResetPasswordStep: React.FC<ResetProps> = ({ email, onBack }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { resetPassword, sendOtp } = useAuth();

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (canResend) return;
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [canResend]);

  const handleResetPassword = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError("");

    if (!otp.trim()) return setError(t("please_enter_otp"));
    if (password.length < 8)
      return setError(t("password_must_be_at_least_8_characters_long"));
    if (password !== confirmPassword)
      return setError(t("confirmation_password_does_not_match"));

    setLoading(true);
    try {
      await resetPassword(email, otp.trim(), password);
      router.push("/login");
    } catch (err) {
      setError(t("invalid") || "Có lỗi, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await sendOtp(email);
      setCountdown(RESEND_COOLDOWN);
      setCanResend(false);
    } catch {
      setError(t("invalid") || "Không thể gửi mã. Vui lòng thử lại.");
    }
  };

  const passwordStrength = () => {
    if (password.length >= 12) return 3;
    if (password.length >= 9) return 2;
    if (password.length >= 8) return 1;
    return 0;
  };

  return (
    <form onSubmit={handleResetPassword} className="d-grid gap-3">
      <div>
        <label className="form-label small fw-semibold">{t("otp")}</label>
        <div className="input-group">
          <span className="input-group-text bg-transparent border-0 px-3">
            <Key size={18} />
          </span>
          <input
            className="form-control rounded-pill shadow-sm py-2"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder={t("enter_otp")}
          />
        </div>
        <small className="text-muted">{t("otp_has_been_sent_to")} {email}</small>
      </div>

      <div>
        <label className="form-label small fw-semibold">{t("new_password")}</label>
        <div className="position-relative">
          <div className="input-group">
            <span className="input-group-text bg-transparent border-0 px-3">
              <Lock size={18} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control rounded-pill shadow-sm py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("enter_new_password")}
              aria-describedby="pw-strength"
            />
            <button
              type="button"
              className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-1"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? t("hide_password") : t("show_password")}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>
        <div id="pw-strength" className="mt-2 d-flex gap-2 align-items-center">
          <div className="small text-muted">{t("strength")}</div>
          <div className="d-flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 40,
                  height: 6,
                  borderRadius: 4,
                  background: i < passwordStrength() ? "var(--bs-primary)" : "var(--bs-gray-300)",
                }}
              />
            ))}
          </div>
          <div className="ms-auto small text-muted">{password.length} {t("chars")}</div>
        </div>
      </div>

      <div>
        <label className="form-label small fw-semibold">{t("confirm_new_password")}</label>
        <input
          type="password"
          className="form-control rounded-pill shadow-sm py-2"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder={t("confirm_new_password")}
        />
      </div>

      <div aria-live="polite" className="min-vh-0">
        {error && <div className="text-danger small">{error}</div>}
      </div>

      <div className="d-flex gap-2">
        <button
          type="button"
          className="btn btn-outline-secondary rounded-pill flex-fill d-flex align-items-center justify-content-center gap-2"
          onClick={onBack}
          disabled={loading}
        >
          <ArrowLeft size={16} /> {t("back")}
        </button>

        <button
          type="submit"
          className="btn btn-primary rounded-pill flex-fill d-flex align-items-center justify-content-center gap-2"
          disabled={loading}
        >
          {loading ? <span className="spinner-border spinner-border-sm" aria-hidden /> : <Lock size={16} />}
          {t("confirm_and_reset")}
        </button>
      </div>

      <div className="text-center">
        <button
          type="button"
          disabled={!canResend}
          onClick={handleResend}
          className="btn btn-link small"
        >
          {canResend ? t("resend") : `${t("resend")} (${countdown}s)`}
        </button>
      </div>
    </form>
  );
};
export default ResetPasswordStep;