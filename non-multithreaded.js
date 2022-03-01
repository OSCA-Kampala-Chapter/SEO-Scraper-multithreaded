import scrape from 'seo-scraper'
import fs from 'fs'

async function main(){

  const urls = [
    'https://blog.logrocket.com/',
    'https://jasonwatmore.com/',
    'https://www.smashingmagazine.com/'
  ];

    fs.writeFileSync('./metas.txt', '')

    const metas = []

    if (urls.length > 0)  {
        for (let link of urls){
            const elements  = await scrape.scrape({ url: link})
            const { description, title} = elements
            metas.push(description)
        }
    }

   for (let i = 0; i < metas.length; i++) {
       for (let j = 0; j < metas[i].length; j++) {
           try{
               if (fs.existsSync('./metas.txt')) {
                   const data = `${metas[i][j]}\n`
                   fs.appendFileSync('./metas.txt', data)
               }

           }catch(err) {
                console.log(err.message)
           }
       }
   }

}

main()