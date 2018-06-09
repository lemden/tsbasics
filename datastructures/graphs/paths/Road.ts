import City from "./City";
import Comparable from "../../common/interfaces/Comparable";

export default
class Road implements Comparable<string>{
    private departure: City;
    private destination: City;
    private cost: number;

    constructor(departure: City, destination: City, cost: number) {
        this.departure = departure;
        this.destination = destination;
        this.cost = cost;
    }

    public getCost(){
        return this.cost;
    }

    public more(cityName: string) {
        return this.getDestination()
                    .getName()
                    .localeCompare(cityName) > 0;
    }

    public less(cityName: string) {
        return this.getDestination()
                    .getName()
                    .localeCompare(cityName) < 0;
    }

    public getValue() {
        return this.getDestination().getName();
    }

    public getDeparture(){
        return this.departure;
    }

    public getDestination(){
        return this.destination;
    }
}