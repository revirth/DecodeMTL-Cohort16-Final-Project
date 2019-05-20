import React from "react";
import NavBarSearchBox from ".";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import renderer from "react-test-renderer";

configure({ adapter: new Adapter() });

const setUp = props => {
  return shallow(<NavBarSearchBox {...props} />);
};

describe("navbar-searchbox component", () => {
  let component = setUp();

  it("should render without errors", () => {
    const wrapper = component.find("span");
    expect(wrapper.length).toEqual(1);
  });

  it("should have 1 empty input", () => {
    const wrapper = component.find("input");
    expect(wrapper.length).toEqual(1);

    const value = wrapper.props().value;
    expect(value).toEqual("");
  });
});
