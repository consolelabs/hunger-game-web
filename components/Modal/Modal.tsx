import { noop } from "@dwarvesf/react-utils";
import { Dialog } from "@headlessui/react";

export const Modal = ({
  isOpen,
  title,
  body,
  onSubmit,
  onCancel,
  cancelText = "Cancel",
  submitText = "Submit",
}: {
  isOpen: boolean;
  title: string;
  body: React.ReactNode;
  onCancel?: () => void;
  cancelText?: string;
  onSubmit?: () => void;
  submitText?: string;
}) => {
  return (
    <>
      {isOpen ? (
        <Dialog open={isOpen} onClose={onCancel || noop}>
          <div className="fixed top-0 left-0 w-full h-full flex">
            <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
            <div className="bg-black/50 m-auto z-50 justify-center items-center flex overflow-x-hidden overflow-y-auto inset-0 outline-none focus:outline-none card card-tlbr ">
              {/*content*/}
              <div className="border-0 shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5">
                  <h3 className="text-white text-2xl font-semibold uppercase">
                    {title}
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-4 flex-auto">
                  <p className="my-4 text-white text-lg leading-relaxed">
                    {body}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center gap-4 p-2 md:p-4">
                  {onCancel && (
                    <button
                      className="flex-1 button secondary"
                      type="button"
                      onClick={onCancel}
                    >
                      {cancelText}
                    </button>
                  )}
                  {onSubmit && (
                    <button
                      className="flex-1 button primary"
                      type="button"
                      onClick={onSubmit}
                    >
                      {submitText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      ) : null}
    </>
  );
};
