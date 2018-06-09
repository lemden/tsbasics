import City from "./City";
import Road from "./Road";

const buildCostMatrix = (cities: City[]) => {
    const roadMatrix = [];
    const cityNames = cities[0].getRoads()
                        .map(road => {
                            return road.getDestination()
                                .getName();
                        });
    
    cityNames.unshift(null);
    for (let i=0;i<cities.length;i++){
        const city = cities[i];
        const roads = city.getRoads();    
        const costs: any[] = roads.map(
            (road: Road) => {
                return road.getCost();
            }
        );
        costs.unshift(city.getName());
        roadMatrix.push(costs);
    }
    roadMatrix.unshift(cityNames);
    return roadMatrix;
}

const normilizeByRow = (roadMatrix: number[][]) => {
    return roadMatrix.map(
        (row, i) => {
            if ( i === 0 ) {
                return row;
            }
            let min = null;
            row.forEach( (cost, j) => {
                if (j > 0 && cost !== City.MAX_COST && ( min === null || min > cost ) ) {
                    min = cost;
                }
            });
            if (min === null) { 
                return row;
            }
            return row.map ( (cost, j) => {
                if (j > 0 && cost !== City.MAX_COST) {
                    return cost - min;
                } else {
                    return cost;
                }
            })
        }
    );
};

const normilizeByCol = (roadMatrix: number[][]) => {
    for (let j=1;j<roadMatrix.length;j++) {
        let min = null;
        for (let i=1;i<roadMatrix.length;i++) {    
            const cost = roadMatrix[i][j];
            if (cost !== City.MAX_COST ) {
                if (min === null || min > cost) {
                    min = cost;
                }
            }
        }
        if (min !== null) {
            for (let i=1;i<roadMatrix.length;i++) {  
                if (roadMatrix[i][j] !== City.MAX_COST) {
                    roadMatrix[i][j] -= min;
                }
            }
        }
    }
    return roadMatrix;
};

const getMinInRow = (i, j1, roadMatrix: any[][]) => {
    let min = null;
    for (let j=1;j<roadMatrix.length;j++) {
        const cost = roadMatrix[i][j];
        if (cost !== City.MAX_COST && j !== j1) {
            if (min === null || cost < min) {
                min = cost;
            }
        }
    }
    return min;
}

const getMinInCol = (i1, j, roadMatrix: any[][]) => {
    let min = null;
    for (let i=1;i<roadMatrix.length;i++) {
        const cost = roadMatrix[i][j];
        if (cost !== City.MAX_COST && i1 !== i) {
            if (min === null || min > cost) {
                min = cost;
            }
        }
    }
    return min;
}

const findCostForCell = (i,j,roadMatrix) => {
    return getMinInRow(i, j, roadMatrix) + getMinInCol(i, j, roadMatrix);
}
const getMaxZero = (roadMatrix: any[][]) => {
    let max: {i,j,cost} = null;
    for (let i=1;i<roadMatrix.length;i++) {
        for (let j=1;j<roadMatrix.length;j++) {
            if (roadMatrix[i][j] === 0) {
                const cost = findCostForCell(i, j, roadMatrix);
                if (max === null || max.cost <= cost) {
                    max = {
                        i, j, cost
                    };
                }
            }
        }
    }
    return max;
};

export class Path {
    private roads: Road[];
    private cost: number;
    constructor(roads: Road[]) {
        this.roads = roads;
        this.cost = 0;
        this.roads.forEach(
            road => {
                this.cost += road.getCost();
            }
        );
    }
    public getCost(){
        return this.cost;
    }
    public getRoads(){
        return this.roads;
    }
}

export const getBranchAndBoundPath = (cities: City[]): Path => {
    let notFoundRoads = {};
    let sortedCities = cities.sort( (city1, city2) => {
        return city1.getName().localeCompare(city2.getName());
    });
    sortedCities.forEach(city => {
        notFoundRoads[city.getName()] = city;
    });
    let roadMatrix = buildCostMatrix(sortedCities);

    let maxZero = null;
    const result = {};
    let found = 0;

    let lastDestination = null;
    let firstCity = null;
    while ( true ) {
        roadMatrix = normilizeByRow(roadMatrix);
        roadMatrix = normilizeByCol(roadMatrix);
        maxZero = getMaxZero(roadMatrix);
        if (!maxZero) {
            break;
        }

        for (let j=1;j<roadMatrix.length;j++) {
            roadMatrix[maxZero.i][j] = City.MAX_COST;
        }
        for (let i=1;i<roadMatrix.length;i++) {
            roadMatrix[i][maxZero.j] = City.MAX_COST;
        }
        roadMatrix[maxZero.j][maxZero.i] = City.MAX_COST;
        found ++;

        const departureCity = sortedCities[maxZero.i - 1];
        const destinationCity = sortedCities[maxZero.j - 1];
        const road = departureCity.getRoads().filter(
            (road: Road) => {
                return road.getDestination().getName() === destinationCity.getName();
            }
        )[0];
        notFoundRoads[departureCity.getName()] = null;
        notFoundRoads[destinationCity.getName()] = null;
        result[road.getDeparture().getName()] = road;
        if (lastDestination === null) {
            lastDestination = road.getDestination();
            firstCity = road.getDeparture();
        }
    }
    let roads = [];
    roads.push(result[firstCity.getName()]);
    while (lastDestination !== firstCity) {
        roads.push(
            result[lastDestination.getName()]
        );
        lastDestination = result[lastDestination.getName()]
                                .getDestination();
    }
    return new Path(roads);
};