const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];

function ishabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;            //check for stellar flux as well
}


fs.createReadStream('kepler_data.csv')
    .pipe(parse({                               //parse return a javascript object for better readability
        comment: '#',
        columns: true
    }))                                                 
    .on('data', (data) => {
        if (ishabitablePlanet(data)) {
            habitablePlanets.push(data);
        }
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        console.log(habitablePlanets);
        console.log(`Total habitable planets: ${habitablePlanets.length}`);
        console.log('DONE!!');
    })