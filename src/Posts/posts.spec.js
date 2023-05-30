import React from "react";
import Posts from "./posts";
import {
  NEWS,
  BASE_PATH,
  SEARCH_PATH,
  SEARCH_PARAM,
  PAGE_HITS,
  PAGE_PARAM,
} from "./constants";

const mockJsonPromise = Promise.resolve({ hits: NEWS, page: 1, nbPages: 10 });
const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

const setUp = () => shallow(<Posts />);

describe("Posts component", () => {
  const DEFAULT_PAGE = 10;
  let component;
  let instance;

  beforeEach(() => {
    component = setUp();
    instance = component.instance();
  });

  it("should render Post component", () => {
    expect(component).toMatchSnapshot();
  });

  it("should call fetch in componentDidMount", () => {
    expect(global.fetch).toHaveBeenCalledWith(`${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${""}&${PAGE_HITS}${20}&${PAGE_PARAM}${0}`);
  });

  describe("Update page method", () => {
    it("Should update state page", () => {
      instance.updatePage(DEFAULT_PAGE);
      expect(component.state().page).toBe(DEFAULT_PAGE);
    });

    it("Should call fetch with page value", () => {
      instance.updatePage(DEFAULT_PAGE);
      expect(global.fetch).toHaveBeenCalledWith(`${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${""}&${PAGE_HITS}${20}&${PAGE_PARAM}${DEFAULT_PAGE}`);
    });
  });

  describe("Handle change page method", () => {
    it("Should call updatePage with given argument", () => {
      instance.updatePage = jest.fn();
      instance.setState({ page: DEFAULT_PAGE });
      instance.handlePageChange({
        target: { getAttribute: jest.fn().mockReturnValue("1") }
      });
      expect(instance.updatePage).toHaveBeenCalledWith(1);
    });

    it("Should call updatePage with increased argument", () => {
      instance.updatePage = jest.fn();
      instance.setState({ page: DEFAULT_PAGE });
      instance.handlePageChange({
        target: { getAttribute: jest.fn().mockReturnValue("prev") }
      });
      expect(instance.updatePage).toHaveBeenCalledWith(DEFAULT_PAGE - 1);
    });

    ("Should call updatePage with decreased argument", () => {
      instance.updatePage = jest.fn();
      instance.setState({ page: DEFAULT_PAGE });
      instance.handlePageChange({
        target: { getAttribute: jest.fn().mockReturnValue("next") }
      });
      expect(instance.updatePage).toHaveBeenCalledWith(DEFAULT_PAGE + 1);
    });
  });

  describe("Posts handlers", () => {
    it("Should handle search input value", () => {
        expect(component.state().searchQuery).toBe("");
        instance.handleInputChange({ target: { value: "test" } });
        expect(component.state().searchQuery).toBe("test");
    });
    
    it("Should handle change hits per page", () => {
        expect(component.state().hitsPerPage).toBe(20);
        instance.handleHitsChange({ target: { value: String(DEFAULT_PAGE) } });
        expect(component.state().hitsPerPage).toBe(DEFAULT_PAGE);
    }); 

    it("Should handle change page if Enter clicked", () => {
        instance.setState({page: DEFAULT_PAGE});
        instance.getSearch({ key: "Enter" });
        expect(component.state().page).toBe(0);
    }); 

    it("Should handle change page if not Enter clicked", () => {
        instance.setState({page: DEFAULT_PAGE});
        instance.getSearch({ key: "a" });
        expect(component.state().page).toBe(DEFAULT_PAGE);
    }); 
  });
});