/** @type {import('next-sitemap').IConfig} */

const config = {
    siteUrl: 'http://' + process.env.NEXT_PUBLIC_VERCEL_URL || 'https://lengaswear.com',
    generateRobotsTxt: true,
    exclude: ['/gracias'],
}
  
module.exports = config