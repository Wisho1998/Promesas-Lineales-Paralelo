const API_URL = 'https://swapi.dev/api/';
const BASE_URL_PEOPLE = 'people/:id';
const opts = { crossDomain: true };

function getPerson(id) {
  return new Promise(function (resolve, reject) {
    const personUrl = `${API_URL}${BASE_URL_PEOPLE.replace(':id', id)}`;
    $.get(personUrl, opts, function (data) {
      resolve(data);
    }).fail(function () {
      reject(id);
    });
  });
}

console.time('paralelas');
const personajesId = [1, 2, 3, 4, 5, 6, 7];
const personajesPromesas = personajesId.map(id => getPerson(id));
Promise
  .all(personajesPromesas)
  .then(characters => {
    characters.forEach(character => console.log(character.name));
    console.timeEnd('paralelas');
  })
  .catch(e => console.log(e));

console.time('lineales');
getPerson(1)
  .then(character => console.log(character.name))
  .then(() => getPerson(2))
  .then(character => console.log(character.name))
  .then(() => getPerson(3))
  .then(character => console.log(character.name))
  .then(() => getPerson(3))
  .then(character => console.log(character.name))
  .then(() => getPerson(4))
  .then(character => console.log(character.name))
  .then(() => getPerson(5))
  .then(character => console.log(character.name))
  .then(() => getPerson(6))
  .then(character => console.log(character.name))
  .then(() => getPerson(7))
  .then(character => {
    console.log(character.name);
    console.timeEnd('lineales');
  })
  .catch(e => console.log(e));
