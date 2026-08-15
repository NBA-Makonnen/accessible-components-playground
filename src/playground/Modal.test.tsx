import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { useRef as useReactRef, useState } from "react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";

function Harness({ initialOpen }: { initialOpen: boolean }) {
  const triggerRef = useReactRef<HTMLButtonElement>(null);
  return (
    <>
      <button ref={triggerRef}>Open modal</button>
      <Modal isOpen={initialOpen} onClose={() => {}} title="Test" triggerRef={triggerRef}>
        <p>Content</p>
      </Modal>
    </>
  );
}

describe("Modal focus management", () => {
  it("does not steal focus onto the trigger on initial mount", () => {
    render(<Harness initialOpen={false} />);
    // Nothing has been focused by the modal; the trigger should not have
    // been force-focused just because the component mounted.
    expect(screen.getByRole("button", { name: "Open modal" })).not.toHaveFocus();
  });

  it("returns focus to the trigger when actually closed after being open", async () => {
    function ControlledHarness() {
      const triggerRef = useReactRef<HTMLButtonElement>(null);
      const [open, setOpen] = useState(false);
      return (
        <>
          <button ref={triggerRef} onClick={() => setOpen(true)}>
            Open modal
          </button>
          <Modal isOpen={open} onClose={() => setOpen(false)} title="Test" triggerRef={triggerRef}>
            <button onClick={() => setOpen(false)}>Close</button>
          </Modal>
        </>
      );
    }

    const user = userEvent.setup();
    render(<ControlledHarness />);

    await user.click(screen.getByRole("button", { name: "Open modal" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open modal" })).toHaveFocus();
  });
});
