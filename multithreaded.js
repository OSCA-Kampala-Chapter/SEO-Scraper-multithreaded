import scrape from "seo-scraper";
import { spawn } from 'child_process'

async function main() {
  const urls = [
    'https://blog.logrocket.com/',
    'https://jasonwatmore.com/',
    'https://www.smashingmagazine.com/'
  ];


  const metas = [];

  if (urls.length > 0) {
    for (let link of urls) { 
      try{
        const elements = await scrape.scrape({ url: link }); 
        metas.push(elements);
      }catch{}
    }
  }

  try{

    run(metas)
  }catch(err) {
    process.exit(1)
  }

}

main();

function run(data) {

  const py  = spawn('python', ['compute.py'])
  let dataString = ''

  py.stdout.on('data', function(data){
    dataString += data.toString();
  });
  py.stdout.on('end', function(){
    console.log('Sum of numbers=',dataString);
  });

  py.stdin.write(JSON.stringify(data));
  py.stdin.end();

}
