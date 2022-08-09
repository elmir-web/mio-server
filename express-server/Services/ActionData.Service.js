const moment = require(`moment`);

class actionDataService {
  async getData(table_name, date_from, date_to) {
    try {
      const [rowsAllEntities] = await global.connectMySQL.execute(
        `SELECT * FROM ${table_name} WHERE bdatetime BETWEEN '${moment(
          date_from
        ).format('YYYY-MM-DD HH:mm:ss')}' AND '${moment(date_to).format(
          'YYYY-MM-DD HH:mm:ss'
        )}'`
      );

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
          object: { rows: rowsAllEntities },
        };
    } catch (errors) {
      return {
        error: true,
        object: errors,
      };
    }
  }
}

module.exports = new actionDataService();
