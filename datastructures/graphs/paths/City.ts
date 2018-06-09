import Road from "./Road";
import Roads from "./Roads";

export default
class City {
    private name: string;
    private roads: Roads;

    public static get MAX_COST() {
        return -1;
    }

    constructor(name: string) {
        this.name = name;
        this.roads = new Roads();
        this.addRoad(this, City.MAX_COST);
    }
    public getName(){
        return this.name;
    }
    public getValue(){
        return this.getName();
    }
    public addRoad(destination: City, cost: number) {
        this.roads.add(new Road(this, destination, cost));
        return this;
    }
    public getRoads(): Road[]{
        return this.roads.getRoads();
    }
}