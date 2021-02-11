import { render, screen } from "@testing-library/react";
import App from "../../pages/index";

describe("App", () => {
  it("renders without crashing", async () => {
    render(<App />);
    expect(await screen.findByText('Semar')).toBeInTheDocument();
  });
});