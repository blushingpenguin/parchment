import { Leaf } from './blot';
import ShadowBlot from './shadow';
import Scope from '../../scope';

class LeafBlot extends ShadowBlot implements Leaf {
  static scope = Scope.INLINE_BLOT;

  static value(_domNode: Node): any {
    return true;
  }

  index(node: Node, offset: number): number {
    if (
      this.domNode === node ||
      this.domNode.compareDocumentPosition(node) &
        Node.DOCUMENT_POSITION_CONTAINED_BY
    ) {
      return Math.min(offset, 1);
    }
    return -1;
  }

  position(index: number, _inclusive?: boolean): [Node, number] {
    const childNodes: Node[] = Array.from(this.parent.domNode.childNodes);
    let offset = childNodes.indexOf(this.domNode);
    if (index > 0) offset += 1;
    return [this.parent.domNode, offset];
  }

  value(): any {
    return {
      [this.statics.blotName]: this.statics.value(this.domNode) || true,
    };
  }
}

export default LeafBlot;
