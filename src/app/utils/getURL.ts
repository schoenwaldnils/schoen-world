export const getServerSideURL = () => {
  let url = process.env.NEXT_PUBLIC_SERVER_URL

  if (!url && process.env.VERCEL_BRANCH_URL) {
    url = `https://${process.env.VERCEL_BRANCH_URL}`
  }

  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    url = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (!url) {
    url = 'https://localhost:3007'
  }

  console.info(`URL: ${url}`)
  return url
}
