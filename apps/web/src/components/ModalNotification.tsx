import { ModelNotificationProps } from "packages/types/ModelNotification";
import CustomButton from "./buttons/CustomButton";

export default function ModalNotification({
  visible,
  params,
  theme = 'light',
}: ModelNotificationProps & { theme?: 'light' | 'dark' }) {
  if (!visible) return null;

  return (
    <>
      <div className="modal-backdrop fade show" data-bs-theme={theme}></div>

      <div
        className="modal fade show"
        style={{ display: 'block' }}
        tabIndex={-1}
        data-bs-theme={theme}
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h2 className="modal-title fs-5 fw-bold">{params.title || "Xác nhận"}</h2>
            </div>
            <div className="modal-body pt-2">
              <p className="mb-4">{params.content}</p>
              <div className="d-flex justify-content-end gap-3">
                {params.buttons.map((button, index) => (
                  <CustomButton
                    key={index}
                    type={button.type}
                    onPress={() => button.onPress?.()}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}