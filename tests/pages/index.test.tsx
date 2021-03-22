import { render, screen } from "@testing-library/preact";

import App from "../../pages/index";

describe("App", () => {
  it("renders without crashing", async () => {
    render(<App />);
    expect(await screen.findByText('Semar')).toBeInTheDocument();
  });
});