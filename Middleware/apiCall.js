let axios = require('axios')

async function getAPIData(category){    
  console.log('get api data here')

  const options = { // options for single random joke 
    method: 'GET',
    url: 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random',     // 3rd party api docs - https://rapidapi.com/matchilling/api/chuck-norris/
    headers: {
      accept: 'application/json',
      "Accept-Encoding":'*',
      'X-RapidAPI-Key': '1f3991056fmsh39da9bc17346b5fp1a336djsne685add0df88',
      'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
    }
  }

  if(category){
    // console.log('category if block here')
    options.url = `https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/search`
    options.params = {query: category}    

    let resp = await axios.request(options)
    .then(function (response) {return response.data})
      .catch(function (error) {console.error(error);});

  let count = await resp.total
  
  let randomJokeNumber = Math.floor(Math.random() * count)  

  // console.log(resp.result[randomJokeNumber])
  return await resp.result[randomJokeNumber]

  }

  else{

    let resp = await axios.request(options)
    .then(function (response) {console.log(response.data); return response.data})
      .catch(function (error) {console.error(error);});
  
    return await resp
  }

  
}

module.exports = {getAPIData}