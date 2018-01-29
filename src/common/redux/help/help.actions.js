import axios from 'axios';

const root = 'https://jsonplaceholder.typicode.com';
export const loadHelp = () => async (dispatch) => {
    const res = await axios(`${root}/posts/1`);
    console.log('res', res.data.title);
    dispatch({
      type: 'HELP_DATA_LOADED',
      payload: res.data.title
    });
  }
