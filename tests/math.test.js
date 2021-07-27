const {
  calculateTip,
  celsiusToFahrenheit,
  fahrenheitToCelsius,
} = require("../src/math");

test("Should Calculate Total", () => {
  const total = calculateTip(10, 0.3);
  expect(total).toBe(13);
});
test("Should Calculate Total with default", () => {
  const total = calculateTip(10);
  expect(total).toBe(12.5);
});

test("Farheinit to celcius", () => {
  const temp = celsiusToFahrenheit(100);
  expect(temp).toBe(212);
});

test("celcius to Farheinit", () => {
  const temp = fahrenheitToCelsius(212);
  expect(temp).toBe(100);
});

test("Async test demo", (done) => {
  setTimeout(() => {
    expect(1).toBe(1);
    done();
  }, 2000);
});
