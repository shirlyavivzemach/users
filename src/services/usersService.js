import * as axios from 'axios';
const API_TOKEN = '614898678b2861a567424334458115c8d3ee1da0'

export async function getUsers() {
  const users = [];
  return await axios
    .get('https://api.github.com/users', {
      headers: { Authorization: 'token ' + API_TOKEN }
    })
    .then(res => {
      if (!res) return null;
      const { data } = res;
      if (data && Array.isArray(data)) {
        return new Promise((resolve, rej) => {
          data.forEach((userBasic, i) => {
            const { login } = userBasic;
            getUser(login).then(user => {
              users.push(user);
              if (i === data.length - 1) {
                resolve(users);
              }
            });
          });
        });
      }
    });
}

export async function getUser(loginName) {
  return await axios
    .get(`https://api.github.com/users/${loginName}`, {
      headers: { Authorization: 'token ' + API_TOKEN }
    })

    .then(res => {
      return res.data;
    });
}

export async function getUsersAfterFilter(name, page, itemPerPage) {
  if (name === '') return;
  let url = `https://api.github.com/search/users?q=${name}`;
  if (page && itemPerPage) {
    url += `&page=${page}&per_page=${itemPerPage}`;
  }
  return await axios
    .get(url, {
      headers: { Authorization: 'token ' + API_TOKEN }
    })
    .then(async res => {
      const { total_count, items } = res.data;
      const _items = await getFullUsersList(items);
      const data = { total_count, items: _items };
      
      return data;
    });
}

async function getFullUsersList(usersList) {
  const updatedList = [];
  return new Promise((res, rej) => {
    usersList.forEach(async (user, index) => {
      const { login } = user;
      const updatedUser = await getUser(login);
      updatedList.push(updatedUser);
      if (index === usersList.length - 1) {
        res(updatedList);
      }
    });
  });
}
