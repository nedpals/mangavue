import axios from 'axios'

const fetchData = (source) => {
  source = !source ? 'mangareader.net' : source
  return axios.create({
    baseURL: 'https://doodle-manga-scraper.p.mashape.com/' + source + '/',
    headers: { 'X-Mashape-Key': 'kYbMc5JncMmshaGfBorPVMBMripap1yEeSMjsn3gUqwIL6abq0' }
  })
}

export default fetchData
