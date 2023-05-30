import React from "react";
import Input from "./input";
import { shallow } from "enzyme";

describe("Input component", () => {
    it("Should render Input component", () => {
        const component = shallow(<Input />);
        expect(component).toMatchSnapshot();
    })
    });

    it("should call OnChange method", () => {
        const mockCallBack = jest.fn();
        const component = shallow(<Input onChange={mockCallBack} />);
        expect(mockCallBack.mock.calls.length).toEqual(0);
        component.find(".input").simulate("change");
        expect(mockCallBack.mock.calls.length).toEqual(1);
    })


describe("Default props", () => {
    it("Should use default onChange", () => {
        const result = Input.defaultProps.onChange();
        expect(result).toBe(undefined);
    });

    it("Should use default onKeyPress", () => {
        const result = Input.defaultProps.onKeyPress();
        expect(result).toBe(undefined);
    });
})