"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation("common");

  return (
    <footer className="text-center text-lg-start border-top mt-auto">
      {/* Main section */}
      <section className="container text-center text-md-start mt-5">
        <div className="row">
          {/* Brand */}
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 d-flex flex-column">
            <h6 className="text-uppercase fw-bold mb-4 d-flex align-items-center gap-2">
              <Image
                src="/images/logo-small.png"
                alt="logo"
                width={24}
                height={24}
              />
              {t("brand_name")}
            </h6>
            <p className="text-muted">
              {t("slogan_revolutionizing_education")}
            </p>
          </div>

          {/* Products */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">
              {t("products")}
            </h6>
            <p>
              <a href="#" className="text-reset text-decoration-none">
                {t("features")}
              </a>
            </p>
            <p>
              <a href="#" className="text-reset text-decoration-none">
                {t("integration")}
              </a>
            </p>
            <p>
              <a href="#" className="text-reset text-decoration-none">
                {t("api")}
              </a>
            </p>
          </div>

          {/* Support */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">
              {t("support")}
            </h6>
            <p>
              <a href="#" className="text-reset text-decoration-none">
                {t("documentation")}
              </a>
            </p>
            <p>
              <a href="#" className="text-reset text-decoration-none">
                {t("help_center")}
              </a>
            </p>
            <p>
              <a href="#" className="text-reset text-decoration-none">
                {t("help")}
              </a>
            </p>
          </div>

          {/* Contact */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">
              {t("contact")}
            </h6>
            <p className="mb-1">{t("email_company_value")}</p>
            <p className="mb-0">{t("phone_number_company_value")}</p>
          </div>
        </div>
      </section>

      {/* Copyright */}
      <div className="text-center p-4 border-top small text-muted">
        {t("copyright")}
      </div>
    </footer>
  );
}
