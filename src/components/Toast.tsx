import { useToastStore } from "@/stores/toastStore";
import { Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import { shallow } from "zustand/shallow";

export const Toast: FC = () => {
  const { message, setToast } = useToastStore(
    (state) => ({ message: state.toast, setToast: state.setToast }),
    shallow,
  );

  return (
    <Transition
      as={Fragment}
      appear
      show={Boolean(message)}
      enter="ease-out duration-300"
      enterFrom="opacity-0 translate-y-0"
      enterTo="opacity-100 translate-y-3"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 translate-y-3"
      leaveTo="opacity-0 translate-y-0"
    >
      <div className="fixed top-8 right-8 left-8 z-[500] rounded-lg bg-neutral-100 p-4 drop-shadow-xl">
        <div className="flex items-start">
          <div className="text-sm font-medium leading-6 text-gray-900">{message}</div>
          <div className="ml-auto" onClick={() => setToast("")}>
            <svg
              className="h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
    </Transition>
  );
};
