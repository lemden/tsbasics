import Comparable from "../../../common/interfaces/Comparable";
import Heap from "./Heap";

export default
class BinaryMaxHeap<V, T extends Comparable<V>> extends Heap<V,T> {
    protected compare(node1: T, node2: T) {
        return node1.less(node2.getValue());
    }
}
