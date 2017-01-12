import { Links } from './../../non-angular/interfaces/twiglet/link';
import { Map, OrderedMap } from 'immutable';

import { D3Node, isD3Node, Link } from '../../non-angular/interfaces';

import { TwigletGraphComponent } from './twiglet-graph.component';
import { getColorFor, getNodeImage } from './nodeAttributesToDOMAttributes';

/**
 * This handles all changes to the nodes array. Adding, updating and removing.
 *
 * @param {OrderedMap} response The immutable map of nodes
 *
 * @export
 */
export function handleNodeMutations (this: TwigletGraphComponent, response: OrderedMap<string, Map<string, any>>) {

  if (this.currentNodeState.data !== response) {
    // Remove nodes that should no longer be here first.
    this.allNodesObject = {};
    // Add and sync existing nodes.
    this.allNodes = mapImmutableMapToArrayOfNodes<D3Node>(response);
    this.allNodes.forEach(node => {
      this.allNodesObject[node.id] = node;
    });

    // update names and image.
    this.nodes.each((node: D3Node) => {
      const existingNode = this.allNodesObject[node.id];
      if (existingNode) {
        let group;
        if (node.type !== existingNode.type) {
          group = this.d3.select(`#id-${node.id}`);
          group.select('.node-image').text(getNodeImage.bind(this)(existingNode)).style('stroke', getColorFor.bind(this)(node));
        }
        if (node.name !== existingNode.name) {
          group = group || this.d3.select(`#id-${node.id}`);
          group.select('.node-name').text(existingNode.name);
        }
      }
    });

    mapLinksToNodes.bind(this)();

    this.restart();
  }
}

export function mapLinksToNodes(this: TwigletGraphComponent) {
  this.allLinks.forEach(link => {
    if (isD3Node(link.source)) {
      link.source = this.allNodesObject[link.source.id];
    } else {
      link.source = this.allNodesObject[link.source];
    }

    if (isD3Node(link.target)) {
      link.target = this.allNodesObject[link.target.id];
    } else {
      link.target = this.allNodesObject[link.target];
    }
  });
}

/**
 * This handles all changes to the links array. Adding, updating and removing.
 *
 * @param {OrderedMap} response The immutable map of nodes
 *
 * @export
 */
export function handleLinkMutations (this: TwigletGraphComponent, response) {
    // Clear our allLinksObject because we have new Links.
    this.allLinksObject = {};
    this.linkSourceMap = {};
    this.linkTargetMap = {};
    // Add and sync existing links.
    this.allLinks = mapImmutableMapToArrayOfNodes<Link>(response);
    this.allLinks.forEach(link => {
      this.allLinksObject[link.id] = link;

      // map links to actual nodes instead of just ids.
      link.source = this.allNodesObject[<string>link.source];
      link.target = this.allNodesObject[<string>link.target];


      if (!this.linkSourceMap[link.source.id]) {
        this.linkSourceMap[link.source.id] = [link.id];
      } else {
        this.linkSourceMap[link.source.id].push(link.id);
      }

      if (!this.linkTargetMap[link.target.id]) {
        this.linkTargetMap[link.target.id] = [link.id];
      } else {
        this.linkTargetMap[link.target.id].push(link.id);
      }
    });

    this.restart();
}

/**
 * Convienience helper. Since the nodes come in as an Immutable map of maps and D3 needs arrays,
 * this takes care of that for us. Very similar to the immutableMapOfMaps pipe.
 *
 * @template Type
 * @param {OrderedMap<string, Map<string, any>>} map
 * @returns and array of nodes or links.
 */
function mapImmutableMapToArrayOfNodes<Type>(map: OrderedMap<string, Map<string, any>>) {
  return map.reduce((array: Type[], node: Map<string, any>) => {
    array.push(node.toJS());
    return array;
  }, []);
}
