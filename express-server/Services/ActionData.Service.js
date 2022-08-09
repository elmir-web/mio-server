const moment = require(`moment`);
const mysql = require(`mysql2/promise`);
const { SERVER_MYSQL_SETTINGS } = require(`./../ServerConfig.json`);

class actionDataService {
  async getData(table_name, date_from, date_to) {
    try {
      const sqlQuery = mysql.format(
        `SELECT * FROM ?? WHERE bdatetime BETWEEN ? AND ?`,
        [
          table_name,
          moment(date_from).format('YYYY-MM-DD HH:mm:ss'),
          moment(date_to).format('YYYY-MM-DD HH:mm:ss'),
        ]
      );

      const [rowsAllEntities] = await global.connectMySQL.execute(sqlQuery);

      if (rowsAllEntities.length === 0)
        return {
          error: true,
          object: {
            message: 'Нет записей в БД соответствующих данным в JSON.',
            table_name: `Запрощенная таблица: ${table_name}`,
            date_from: `Дата от: ${moment(date_from).format(
              'YYYY-MM-DD HH:mm:ss'
            )}`,
            date_to: `Дата до: ${moment(date_to).format(
              'YYYY-MM-DD HH:mm:ss'
            )}`,
          },
        };
      else
        return {
          error: false,
          object: {
            rowsLength: rowsAllEntities.length,
            rows: rowsAllEntities,
          },
        };
    } catch (errors) {
      return {
        error: true,
        object: errors,
      };
    }
  }

  async getAllTables() {
    return [
      `analizi`,
      `konverter`,
      `pa_pobeda`,
      `sh_pech_uspik`,
      `sush_pech_ub`,
    ];
  }
}

module.exports = new actionDataService();
