import React from "react";
import { AuthProvider } from "./context";
import ContextComponent from "./component";
import { mount } from "enzyme";

describe("Context component", () => {
    const component = mount(
        <AuthProvider>
            <ContextComponent />
        </AuthProvider>
    )

    it("Should toggle login status", () => {
        expect(component.find("div").text()).toBe("false");
        component.find(".btn").simulate("click");
        expect(component.find("div").text()).toBe("true");

        component.find(".btn").simulate("click");
        expect(component.find("div").text()).toBe("false");
    })
});