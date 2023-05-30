import React from "react";
import Pagination from "./pagination";
import { shallow } from "enzyme";

const setUp = (props) => shallow(<Pagination {...props} lastPage={20} />);

describe("Pagination component", () => {
    it("Should render pagination without props", () => {
        const component = setUp();
        expect(component).toMatchSnapshot();
    });

    it("Should render pagination with props", () => {
        const component = setUp();
        expect(component).toMatchSnapshot();
    });

    it("Should render pagination for last pages", () => {
        const component = setUp({page: 15});
        expect(component).toMatchSnapshot();
    });

    it("Should render pagination without dots", () => {
        const component = setUp({page: 16});
        expect(component).toMatchSnapshot();
    });

    it("Should render pagination with dots and 3 buttons in the end", () => {
        const component = setUp({page: 19});
        expect(component).toMatchSnapshot();
    });

    describe("default props", () => {
        it("Should use default onChange", () => {
            const result = Pagination.defaultProps.onClick();
            expect(result).toBe(undefined);
        })
    });
})