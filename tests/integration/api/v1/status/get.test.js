test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("https://potential-goldfish-wpqwqvjp57wcgwr-3000.app.github.dev/api/v1/status");
  expect(response.status).toBe(200);
});
