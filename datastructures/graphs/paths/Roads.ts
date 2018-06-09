import Road from "./Road";
import BinaryMinHeap from "../../graphs/trees/heaps/BinaryMinHeap";
import Comparable from "../../common/interfaces/Comparable";

export default
class Roads {
    private roads: BinaryMinHeap<string, Road>;
    constructor(){
        this.roads = new BinaryMinHeap<string, Road>();
    }
    public add(road: Road){
        this.roads.add(road);
    }
    public getRoads(): Road[] {
        return this.roads.toArray();
    }
}
