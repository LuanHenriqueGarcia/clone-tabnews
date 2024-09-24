test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(responseBody).toBeDefined();
  expect(responseBody).toHaveProperty("updated_at");

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();

  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const databaseInfo = responseBody.dependencies.database;

  expect(databaseInfo.version).toEqual("16.0");
  expect(databaseInfo.max_connections).toEqual(100);
  expect(databaseInfo.opened_connections).toEqual(1);
}); 