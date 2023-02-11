import { render, screen } from "@testing-library/react";
import CommonButton from "../CommonButton";

test("renders common button", () => {
  render(
    <CommonButton
      handleStuff={() => console.log("a")}
      name={"b"}
      color={"white"}
    />
  );
  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByRole("button")).toHaveTextContent("b");
});
