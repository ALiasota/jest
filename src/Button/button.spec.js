import React from "react";
import Button from "./button";
import { shallow } from "enzyme";

describe("Button component", () => {
    it("should call OnClick method", () => {
        const mockCallBack = jest.fn();
        expect(mockCallBack.mock.calls.length).toEqual(0);
        const component = shallow(<Button onClick={mockCallBack} />);
        component.find(".btn").simulate("click");
        expect(mockCallBack.mock.calls.length).toEqual(1);
    })
})