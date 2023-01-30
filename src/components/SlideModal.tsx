import { cn } from "@/utils/classNames";
import { t } from "@/utils/translation";
import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, PropsWithChildren } from "react";

export type SlideModalProps = {
  visible: boolean;
  onClose(value: boolean): void;
  onOk: VoidFunction;
  reverseActions?: boolean;
  title: string;
  okLabel?: string;
  okEnabled?: boolean;
};

export const SlideModal: FC<PropsWithChildren<SlideModalProps>> = ({
  visible,
  onClose,
  onOk,
  reverseActions = false,
  okLabel = t("ok"),
  children,
  title,
  okEnabled = true,
}) => {
  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 h-screen w-screen overflow-hidden"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="ease-in duration-200"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
        >
          <Dialog.Panel className="theme fixed bottom-0 w-full transform-gpu overflow-hidden rounded-t-2xl p-6 transition-all">
            <Dialog.Title as="h3" className="text-2xl font-medium leading-6">
              {title}
            </Dialog.Title>
            <div className="mt-4">{children}</div>

            <div
              className={cn("mt-4 flex gap-4", {
                "flex-row-reverse": reverseActions,
              })}
            >
              <button
                type="button"
                className="flex-1 rounded-md bg-green-300 px-4 py-2 text-green-900 outline-none disabled:opacity-25"
                onClick={onOk}
                disabled={!okEnabled}
              >
                {okLabel}
              </button>
              <button
                type="button"
                className="flex-1 rounded-md bg-red-300 px-4 py-2 text-red-900 outline-none"
                onClick={() => onClose(false)}
              >
                {t("cancel")}
              </button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
