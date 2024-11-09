import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

function Modal({ open, onClose, children }) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75" />
      <div className="fixed inset-0 z-10 ">
        <div className="flex h-full justify-center items-center">
          <DialogPanel>
            <div className="bg-white p-4 rounded-lg">{children}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default Modal;
