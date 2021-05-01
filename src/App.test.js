import { act, fireEvent, render, screen, cleanup, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App';
import Home from "./pages/Home";

afterEach(() => {
  cleanup()
})

test('Render halaman Home dengan benar', () => {
  render(<Home />)

  // query
  const buttonElement = screen.getByRole("button")
  const captionElement = screen.getByRole("caption")

  expect(buttonElement).toHaveTextContent("Lihat Students")
  expect(buttonElement).toHaveClass("btn-primary")

  expect(captionElement).toBeInTheDocument()
  expect(captionElement).toHaveTextContent(/hello, jersey!/i)
});

test('Berhasil navigasi ke ha;aman Students', () => {
  render(<App />)

  const buttonElement = screen.getByText("Lihat Students")
  fireEvent.click(buttonElement)

  screen.getByText("Daftar")
  screen.getByText("Student Terdaftar")
  screen.getByRole("form")
  screen.getByLabelText(/name/i)
  screen.getByPlaceholderText(/Enter house/i)
  const error = screen.queryByTestId("form-error")
  const students = screen.getByTestId("students-container")

  expect(error).toEqual(null)
  expect(students).toBeEmptyDOMElement()


});

test("gagal menambahka student field harus diisi semua", () => {
  render(<App />)

  const submit = screen.getByRole("button")
  fireEvent.click(submit)
  const error = screen.getByTestId("form-error")
  expect(error).toHaveTextContent("All field are required")

})
test("gagal menambahka student field harus diisi semua", () => {
  render(<App />)

  const submit = screen.getByRole("button")
  const nameElement = screen.getByLabelText(/name/i)
  const houseElement = screen.getByPlaceholderText(/Enter house/i)
  const studentsContainer = screen.getByTestId("students-container")

  expect(nameElement).toHaveDisplayValue("")
  expect(houseElement).toHaveDisplayValue("")

  fireEvent.change(nameElement, { target: { value: "Rubhi" } })
  fireEvent.change(houseElement, { target: { value: "Ravenclaw" } })

  expect(nameElement).toHaveDisplayValue("Rubhi")
  expect(houseElement).toHaveDisplayValue("Ravenclaw")
  expect(studentsContainer).toBeEmptyDOMElement()


  fireEvent.click(submit)
  expect(studentsContainer).not.toBeEmptyDOMElement()
  screen.getByText("Rubhi")
  screen.getByText("Ravenclaw")
  expect(nameElement).toHaveDisplayValue("")
  expect(houseElement).toHaveDisplayValue("")

})

test("Async call api", async () => {
  await act(async () => render(<App />));
  await screen.findByText("Harry Dhimas", undefined, { timeout: 10000 })
  screen.debug()
})