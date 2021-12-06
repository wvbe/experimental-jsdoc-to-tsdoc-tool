/**
 * @remarks
 * A nodeId is the unique identifier for a node.
 *
 * Note that this ID has no relation with any id attribute and it is not stable
 * across Fonto instances or sessions.
 *
 * The NodeId of a node can be retrieved using the {@link getNodeId} function
 * present in fontoxml-dom-identification.
 *
 * NodeIds can be resolved to a node using either the {@link Blueprint#lookup} and
 * the {@link Dom#lookup} methods.
 *
 * @fontosdk
 */

var nodeIdByNode = new WeakMap();
var nextId = 1;

function setNodeId(node) {
  var nodeId = "" + nextId++;
  nodeIdByNode.set(node, nodeId);
  return nodeId;
}

/**
 * @remarks
 * Get the existing node ID for the given node or generate a new one if none has
 * been set
 *
 * @fontosdk
 *
 * @param node - A node from which to get a nodeId
 *
 * @returns The unique id for a node
 */
export default function getNodeId(node) {
  if (!node) {
    throw new Error("Expected a node but got " + node + ".");
  }
  // Support NodeProxy
  if ("nodeId" in node) {
    return node.nodeId;
  }

  if (!nodeIdByNode.has(node)) {
    return setNodeId(node);
  }

  return nodeIdByNode.get(node);
}
