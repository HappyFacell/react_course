import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Note from "./Note";

test("renders content", () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  const component = render(<Note note={note} />);

  // component.debug()

  const li = component.container.querySelector("li");

  console.log(prettyDOM(li));
    // method 1
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )

});

test('clicking the button calls event handler once', () => {
    const note = {
      content: 'Component testing is done with react-testing-library',
      important: true
    }
  
    const mockHandler = jest.fn()
  
    const component = render(
      <Note note={note} toggleImportance={mockHandler} />
    )
  
    const button = screen.getByText('make not important')
    fireEvent.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(1)
  })
  