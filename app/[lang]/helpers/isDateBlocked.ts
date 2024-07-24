async function isDateBlocked(client: any, date: string): boolean {
  const res = await client.query(
    "SELECT * FROM Blocked_Dates WHERE blocked_date = $1",
    [date]
  );
  return res.rows.length > 0;
}

export default isDateBlocked;
