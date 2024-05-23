import { Node } from 'cheerio'
import puppeter, { Page } from 'puppeteer'

let checkInterval: NodeJS.Timeout

const redirect = async (page: Page) => {
    clearInterval(checkInterval)

    console.log('## LOGGED IN ##')
    page.goto('https://walmart.com/orders')

}

(async () => {
    try {
        const browser = await puppeter.launch({ headless: false })

        const page = await browser.newPage()

        await page.setExtraHTTPHeaders({
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36', 
            'upgrade-insecure-requests': '1', 
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8', 
            'accept-encoding': 'gzip, deflate, br', 
            'accept-language': 'en-US,en;q=0.9,en;q=0.8' 
        })

        await page.goto('https://walmart.com')

        checkInterval = setInterval(async () => {
            const cookies = await page.cookies()
            const customerCookie = cookies.find(item => item.name === 'customer')

            if (customerCookie) {
                const parsedObject = JSON.parse(decodeURIComponent(customerCookie.value))
                const firstKey = Object.keys(parsedObject)[0]

                if (firstKey === 'firstName')
                    await redirect(page)

            }

        }, 100)

    } catch (error) {

    }
})()