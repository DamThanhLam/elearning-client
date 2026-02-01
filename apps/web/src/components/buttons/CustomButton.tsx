import { useTranslation } from "react-i18next";

type Props = {
  type: "YES" | "NO" | "CANCEL" | "CLOSE";
  onPress: () => void;
};

const CustomButton: React.FC<Props> = ({ type, onPress }) => {
  const { t } = useTranslation();

  const buttonClassMap: Record<Props["type"], string> = {
    YES: "btn btn-primary",
    NO: "btn btn-danger",
    CANCEL: "btn btn-outline-primary",
    CLOSE: "btn btn-secondary",
  };

  return (
    <button
      type="button"
      onClick={onPress}
      className={`
        ${buttonClassMap[type]}
        px-3 py-2
        rounded-3
        fw-semibold
      `}
    >
      {t(type.toLowerCase())}
    </button>
  );
};

export default CustomButton;
