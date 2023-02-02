import { cn } from "@/utils/classNames";
import { Listbox, Transition } from "@headlessui/react";
import type { Options } from "@popperjs/core";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

const popperConfig: Partial<Options> = {
  placement: "top-end",
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 8],
      },
    },
  ],
};

export type SelectProps<T> = {
  items?: T[];
  label?: string;
  onChange?: (value: T | null) => void;
  name?: string;
  renderFn?: (props: {
    item: T;
    active: boolean;
    selected: boolean;
    disabled: boolean;
  }) => JSX.Element;
  children: (selected: T | null) => JSX.Element;
};

export const Select: <T>(props: SelectProps<T>) => ReactElement = <T,>({
  items,
  label,
  renderFn,
  children,
  onChange,
  name,
}: SelectProps<T>): ReactElement => {
  const [selected, setSelected] = useState<T | null>(null);

  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLUListElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, popperConfig);

  useEffect(() => {
    onChange?.(selected);
  }, [selected]);

  return (
    <label className="flex h-10 items-center justify-between">
      <span>{label}</span>
      <Listbox value={selected} onChange={setSelected} name={name}>
        <div className="relative mt-1">
          <Listbox.Button
            ref={setReferenceElement}
            className="relative w-full bg-inherit px-2 py-1 text-right text-inherit outline-none"
          >
            {children(selected)}
          </Listbox.Button>
          {createPortal(
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                ref={setPopperElement}
                style={styles.popper}
                className="z-50 max-h-96 overflow-auto rounded-xl bg-inherit py-1 drop-shadow-lg"
                {...attributes.popper}
              >
                {items?.map((item, itemIdx) => (
                  <Listbox.Option
                    key={itemIdx}
                    className={({ active, selected }) =>
                      cn(`relative cursor-default select-none py-2 px-4`, {
                        "bg-gray-700 bg-opacity-70": active,
                        "bg-gray-700 bg-opacity-50": selected && !active,
                      })
                    }
                    value={item}
                  >
                    {renderFn != null ? (props) => renderFn({ item, ...props }) : null}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>,
            document.body,
          )}
        </div>
      </Listbox>
    </label>
  );
};
