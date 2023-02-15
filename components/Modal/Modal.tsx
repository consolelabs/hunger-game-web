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
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto md:min-w-[384px] my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold text-purple-700">
                    {title}
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-black text-lg leading-relaxed">
                    {body}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center gap-4 p-4 border-t border-solid border-slate-200 rounded-b">
                  {onCancel && (
                    <button
                      className="flex-1 text-red-500 background-transparent outline-none focus:outline-none ease-linear transition-all duration-150"
                      type="button"
                      onClick={onCancel}
                    >
                      {cancelText}
                    </button>
                  )}
                  {onSubmit && (
                    <button
                      className="flex-1 bg-purple-500 text-white active:bg-purple-600 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
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
          <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
