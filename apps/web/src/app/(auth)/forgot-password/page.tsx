"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SendOtpStep from "./SendOtpStep";
import ResetPasswordStep from "./ResetPasswordStep";

export enum ForgotPasswordProcessSteps {
  SEND_OTP = "SEND_OTP",
  RESET_PASSWORD = "RESET_PASSWORD",
}

const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<ForgotPasswordProcessSteps>(
    ForgotPasswordProcessSteps.SEND_OTP
  );

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 560 }}>
        <div className="card shadow-lg rounded-4 overflow-hidden">
          <div className="card-body p-5">
            <div className="text-center mb-4">
              <Image src="/images/logo-small.png" alt="logo" width={48} height={48} />
              <h1 className="h5 fw-bold text-primary mt-3">{t("reset_password")}</h1>
              <p className="small text-muted">{t("enter_email_to_receive_otp")}</p>
            </div>

            {currentStep === ForgotPasswordProcessSteps.SEND_OTP ? (
              <SendOtpStep
                email={email}
                setEmail={setEmail}
                onNext={() => setCurrentStep(ForgotPasswordProcessSteps.RESET_PASSWORD)}
              />
            ) : (
              <ResetPasswordStep
                email={email}
                onBack={() => setCurrentStep(ForgotPasswordProcessSteps.SEND_OTP)}
              />
            )}
          </div>
        </div>

        <div className="text-center mt-3 small text-muted">
          © {new Date().getFullYear()} — {t("brand_name")}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;