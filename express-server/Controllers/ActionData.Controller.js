const { validationResult } = require(`express-validator`);

const actionDataService = require(`../Services/ActionData.Service`);

class ActionDataController {
  async getData(req, res) {
    const errors = validationResult(req);

    let errMessages = ``;

    if (!errors.isEmpty()) {
      for (let i = 0; i < errors.errors.length; i++) {
        errMessages += `${errors.errors[i].msg} | `;
      }

      return res.status(400).json({
        error: true,
        message: `Ошибка при создании записи. Подробная информация: ${errMessages}`,
      }); // Возвращаем на клиент статус 400 и строку с ошибками валидации данных
    }

    const { table_name, date_from, date_to } = req.body;

    const result = await actionDataService.getData(
      table_name,
      date_from,
      date_to
    );

    res.status(200).json(result);
  }

  async getAllTables(req, res) {
    res.status(200).json(await actionDataService.getAllTables());
  }
}

module.exports = new ActionDataController();
