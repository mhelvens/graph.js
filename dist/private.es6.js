//  ////////////////////////////////////////////////////////////////////////////////////////////////
//  // Symbols for private members /////////////////////////////////////////////////////////////////
//  ////////////////////////////////////////////////////////////////////////////////////////////////

export const _vertices               = Symbol("vertices");
export const _edges                  = Symbol("edges");
export const _reverseEdges           = Symbol("reverse edges");
export const _sources                = Symbol("sources");
export const _sinks                  = Symbol("sinks");
export const _edgeCount              = Symbol("edge count");

export const _extractTwoArgs         = Symbol("extract ([a, b]) or (a, b) arguments");
export const _extractThreeArgs       = Symbol("extract ([[a, b], c]), ([a, b], c) or (a, b, c) arguments");

export const _listeners              = Symbol("listeners");
export const _trigger                = Symbol("trigger");

export const _verticesFrom           = Symbol("vertices from");
export const _verticesTo             = Symbol("vertices to");
export const _edgesFrom              = Symbol("edges from");
export const _edgesTo                = Symbol("edges to");
export const _verticesWithPathTo     = Symbol("vertices with path to");
export const _verticesWithPathFrom   = Symbol("vertices with path from");
export const _paths                  = Symbol("paths");

export const _expectVertices         = Symbol("expect vertices");
export const _expectVerticesAbsent   = Symbol("expect vertex absent");
export const _expectEdges            = Symbol("expect edge");
export const _expectEdgesAbsent      = Symbol("expect edge absent");
export const _expectNoConnectedEdges = Symbol("expect no connected edges");
