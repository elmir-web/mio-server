const axios = require('axios');

const startPostFetch = async () => {
  try {
    const getRecords = await axios.post(
      `http://10.39.0.219:7844/api/action-data/get-table`,
      {
        table_name: 'sh_pech_uspik',
        date_from: '2022-08-08 00:00:00',
        date_to: '2022-08-08 04:30:00',
      }
    );

    if (getRecords.data.error === true) {
      throw getRecords.data;
    }

    console.log(getRecords.data.object.rows);
  } catch (errorObject) {
    console.log(`Ошибка:`);
    console.log(errorObject);
  }
};

startPostFetch();
