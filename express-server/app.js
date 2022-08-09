// __________________________________________________ ИМПОРТЫ
const express = require(`express`);
const mysql_check = require(`mysql2`);
const mysql = require(`mysql2/promise`);
const cors = require(`cors`);

const {
  SERVER_START_ON_PORT,
  SERVER_MYSQL_SETTINGS,
} = require(`./ServerConfig.json`);

const actionDataRouter = require(`./Routes/ActionData.Router`);

// __________________________________________________ ОБЪЕКТЫ
const app = express();

// __________________________________________________ ЗАПУСК СЕРВЕРА
const startThisApp = async () => {
  try {
    const connection = mysql_check.createConnection(SERVER_MYSQL_SETTINGS);

    connection.connect((err) => {
      if (err) {
        return console.error('Ошибка: ' + err.message);
      } else {
        console.log('Тестовое подключение к серверу MySQL успешно установлено');

        connection.end(async (err) => {
          if (err) {
            return console.log('Ошибка: ' + err.message);
          }
          console.log('Тестовое подключение закрыто');

          global.connectMySQL = await mysql.createPool(SERVER_MYSQL_SETTINGS);

          app.listen(SERVER_START_ON_PORT, () => {
            console.log(
              `Приложение Express JS запущено на порту "${SERVER_START_ON_PORT}"!`
            );
          });
        });
      }
    });

    // global.connectMySQL = await mysql.createPool(SERVER_MYSQL_SETTINGS);

    // app.listen(SERVER_START_ON_PORT, () => {
    //   console.log(
    //     `Приложение Express JS запущено на порту "${SERVER_START_ON_PORT}"!`
    //   );
    // });
  } catch (err) {
    console.log(
      `________________________________________________________________________________________________________________________`
    );
    console.log(`Конфиг подключения к СуБД MySQL:`);
    console.log(SERVER_MYSQL_SETTINGS);
    console.log(`Информация о ошибке:`);
    console.log(err);
    console.log(
      `________________________________________________________________________________________________________________________`
    );
  }
};

startThisApp();

// __________________________________________________ НАСТРОЙКА
app.use(cors());
app.use(express.json());

// __________________________________________________ РОУТИНГ API
app.use(`/api`, actionDataRouter);
