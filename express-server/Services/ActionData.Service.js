class actionDataService {
  async getData(table_name, date_from, date_to) {
    const [queryRows] = await global.connectMySQL.execute(
      `SELECT * FROM ${table_name} `
    );

    for (let index = 0; index < queryRows.length; index++) {
      console.log(JSON.stringify(queryRows[index].bdatetime));
    }

    return queryRows;
  }
}

module.exports = new actionDataService();
