import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  test("Status from props shoul be in the state", () => {
    const component = create(<ProfileStatus status="it-kamasutra.com" />);
    const instance = component.getInstance();
    //@ts-ignore
    expect(instance?.state.status).toBe("it-kamasutra.com");
  });

  test("after creation <span></span> should be displayed", () => {
    const component = create(<ProfileStatus status="it-kamasutra.com" />);
    const root = component.root;
    let span = root.findByType("span");
    //@ts-ignore
    expect(span.length).not.toBeNull();
  });

  test("after creation <input/> shouldn't be displayed", () => {
    const component = create(<ProfileStatus status="it-kamasutra.com" />);
    const root = component.root;
    expect(() => {
      let input = root.findByType("input")
    }).toThrow();
  });

  test("after creation <span></span> should be contains correct status", () => {
    const component = create(<ProfileStatus status="it-kamasutra.com" />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span.children[0]).toBe("it-kamasutra.com");
  });

  test("input should be displayed in editMode instead of span", () => {
    const component = create(<ProfileStatus status="it-kamasutra.com" />);
    const root = component.root;
    let span = root.findByType("span");
    span.props.onDoubleClick(); //Псевдо клик (программный)
    let input = root.findByType("input");
    expect(input.props.value).toBe("it-kamasutra.com");
  });

  test("callback should be called", () => {
    const mockCallback = jest.fn(); //фейковая функция
    const component = create(<ProfileStatus status="it-kamasutra.com"
      updateStatus={mockCallback} />);
    const instance = component.getInstance();
    //@ts-ignore
    instance?.deactivateEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});