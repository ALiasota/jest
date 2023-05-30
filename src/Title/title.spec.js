import React from "react";
import Title from "./title";
import { shallow } from "enzyme";

describe("Title component", () => {
    it("Should render Title component with props", () => {
        const component = shallow(<Title title="Test title" />);
        expect(component).toMatchSnapshot();
    });

    it("Should render Title component without props", () => {
        const component = shallow(<Title />);
        expect(component).toMatchSnapshot();
    });
})