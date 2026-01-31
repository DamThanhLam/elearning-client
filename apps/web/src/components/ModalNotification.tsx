import { ModelNotificationProps } from "packages/types/ModelNotification";
import CustomButton from "./buttons/CustomButton";

export default function ModalNotification({
  visible,
  params
}: ModelNotificationProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-11/12 max-w-md bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-bold mb-4">{params.title}</h2>

        <p className="text-base mb-6">{params.content}</p>

        <div className="flex justify-end gap-4">
          {params.buttons.map((button) => (
            <CustomButton
              type={button.type}
              onPress={() => {
                button.onPress();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}