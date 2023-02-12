import axios from 'axios'
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
  // not needed in NextJS v12+
  // const body = JSON.parse(req.body)

  try {
    const data = await axios.get(
      // `https://surveyplanner.pythonanywhere.com/auth/users/`,
      `https://www.boredapi.com/api/activity`
      // req.body
      // `https://api.publicapis.org/entries`
    )
    return res.status(200).json(data)
  } catch (error) {
    console.error(error.message)
    return res.status(error.status).end(error.message)
  }
}
