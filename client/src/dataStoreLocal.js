import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getDataQuery(table,query) {
  await fakeNetwork(`get${table}:${query}`);
  let data = await localforage.getItem(table);
  if (!data) data = [];
  if (query) {
    data = matchSorter(data, query, { keys: ["first", "last"] });
  }
  return data.sort(sortBy("last", "createdAt"));
}

export async function createData(table) {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let newData = { id, createdAt: Date.now() };
  let data  = await getDataQuery(table);
  data.unshift(newData);
  await set(table,data);
  return data;
}

export async function getDataId(table,id) {
  await fakeNetwork(`${table}:${id}`);
  let datas = await localforage.getItem(table);
  let data = datas.find(data => data.id === id);
  return data ?? null;
}

export async function updateData(table,id, updates) {
  await fakeNetwork();
  let datas = await localforage.getItem(table);
  let data = datas.find(data => data.id === id);
  if (!data) throw new Error("No contact found for", id);
  Object.assign(data, updates);
  await set(table,datas);
  return data;
}

export async function deleteData(table,id) {
  let datas = await localforage.getItem(table);
  let index = datas.findIndex(data => data.id === id);
  if (index > -1) {
    datas.splice(index, 1);
    await set(table,datas);
    return true;
  }
  return false;
}

function set(table,datas) {
  return localforage.setItem(table, datas);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}