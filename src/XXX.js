import { cleanup, fireEvent, render, screen, act } from '@testing-library/react';
import App from './App';
jest.setTimeout(30000);
test('correctly render home page', () => {
  render(<App />);
  const button = screen.getByRole('button')
  expect(button).toHaveTextContent('Lihat Students')
  expect(button).toHaveClass('btn-primary')

  screen.getByText(/hello, jersey/i)
  screen.getByRole('caption')
});

test('successfully navigate to students page', () => {
  render(<App />);
  const navigateButton = screen.getByRole('button')
  fireEvent.click(navigateButton)

  screen.getByText('Daftar')
  screen.getByText('Student Terdaftar')
  screen.getByRole('form')
  screen.getByLabelText('Name')
  screen.getByPlaceholderText('Enter House')
  const errorForm = screen.queryByTestId('form-error')
  const studentContainer = screen.getByTestId('students-container')

  expect(errorForm).toEqual(null)
  expect(studentContainer).toBeEmptyDOMElement()

});

test('Show error when field empty', () => {
  render(<App />);
  const submit = screen.getByRole('button')
  expect(submit).toHaveTextContent("Submit")
  fireEvent.click(submit)
  const error = screen.getByTestId("form-error")
  expect(error).toHaveTextContent("All field are required")

})
test('Successfully add new student', () => {
  render(<App />);

  const name = screen.getByLabelText('Name')
  const house = screen.getByPlaceholderText('Enter House')
  const submit = screen.getByRole('button')

  fireEvent.change(name, { target: { value: "Rubhi" } })
  fireEvent.change(house, { target: { value: "Ravenclaw" } })

  expect(name).toHaveDisplayValue("Rubhi")
  expect(house).toHaveDisplayValue("Ravenclaw")

  fireEvent.click(submit)

  const studentContainer = screen.getByTestId('students-container')
  expect(studentContainer).not.toBeEmptyDOMElement()
})

test('Successfully add new student', async () => {
  await act(async () => render(<App />));

  screen.findByText("Rubhius Hagrid")
    .then(element => {
      expect(element).toBeInTheDocument()
    })

})


