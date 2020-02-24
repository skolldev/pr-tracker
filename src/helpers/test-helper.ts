import { fireEvent } from "@testing-library/react";

export class TestHelper {
  /**
   * Clears the given input field by sending an empty change event.
   * @param el The element to clear
   */
  static clearField(el: HTMLElement): void {
    fireEvent.change(el, { target: { value: "" } });
  }
}
