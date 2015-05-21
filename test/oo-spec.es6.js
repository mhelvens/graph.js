import Graph from '../src/graph.es6.js';
import oo    from '../src/oo.es6.js';
import specs from './spec-template.es6.js';

let GraphOO = oo(Graph);

specs(GraphOO);
