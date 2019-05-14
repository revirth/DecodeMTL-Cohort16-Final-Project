import React from "react";
import ReactDOM from "react-dom";
import Pagination from "./index";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";

describe("Pagination", () => {
  const props = {
    limit: 10,
    total: 16,
    page: 1
  };

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Router>
        <Pagination {...props} />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(
      <Router>
        <Pagination {...props} />
      </Router>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
