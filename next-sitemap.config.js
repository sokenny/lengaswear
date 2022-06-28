/** @type {import('next-sitemap').IConfig} */

const config = {
    siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://lengaswear.com',
    generateRobotsTxt: true,
    exclude: ['/gracias'],
}
  
module.exports = config