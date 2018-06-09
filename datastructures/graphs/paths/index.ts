import City from "./City";
import * as Alg from "./algorithms";

// const city1 = new City("city1");
// const city2 = new City("city2");
// const city3 = new City("city3");
// const city4 = new City("city4");
// const city5 = new City("city5");

// city1.addRoad(city2, 5)
//     .addRoad(city3, 11)
//     .addRoad(city4, 9)
//     .addRoad(city5, 3);

// city2.addRoad(city1, 10)
//     .addRoad(city3, 8)
//     .addRoad(city4, 7)
//     .addRoad(city5, 2);

// city3.addRoad(city1, 7)
//     .addRoad(city2, 14)
//     .addRoad(city4, 8)
//     .addRoad(city5, 6);

// city4.addRoad(city1, 12)
//     .addRoad(city2, 6)
//     .addRoad(city3, 15)
//     .addRoad(city5, 20);

// city5.addRoad(city1, 12)
//     .addRoad(city2, 6)
//     .addRoad(city3, 15)
//     .addRoad(city4, 20);

// const cities = [city1, city2, city3, city4, city5];

// const city1 = new City("city1");
// const city2 = new City("city2");
// const city3 = new City("city3");
// const city4 = new City("city4");
// const city5 = new City("city5");
// const cities = [city1, city2, city3, city4, city5];

const city1 = new City("city1");
const city2 = new City("city2");
const city3 = new City("city3");
const city4 = new City("city4");

city1.addRoad(city2, 5)
    .addRoad(city3, 11)
    .addRoad(city4, 9);

city2.addRoad(city1, 10)
    .addRoad(city3, 8)
    .addRoad(city4, 7);

city3.addRoad(city1, 7)
    .addRoad(city2, 14)
    .addRoad(city4, 8);

city4.addRoad(city1, 12)
    .addRoad(city2, 6)
    .addRoad(city3, 15);
    
const cities = [city1, city2, city3, city4];

const path = Alg.getBranchAndBoundPath(cities);

const roads = path.getRoads();
roads.forEach( road => {
    console.log(
        `${road.getDeparture().getName()} => ${road.getDestination().getName()} (cost ${road.getCost()})`
    );
});
console.log(`Cost: ${path.getCost()}`);