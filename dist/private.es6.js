//  ////////////////////////////////////////////////////////////////////////////////////////////////
//  // Symbols for private members /////////////////////////////////////////////////////////////////
//  ////////////////////////////////////////////////////////////////////////////////////////////////

if (!window.__graphjs__private__) { window.__graphjs__private__ = {} }

export const _vertices               = window.__graphjs__private__._vertices               || Symbol("vertices");
export const _edges                  = window.__graphjs__private__._edges                  || Symbol("edges");
export const _reverseEdges           = window.__graphjs__private__._reverseEdges           || Symbol("reverse edges");
export const _sources                = window.__graphjs__private__._sources                || Symbol("sources");
export const _sinks                  = window.__graphjs__private__._sinks                  || Symbol("sinks");
export const _edgeCount              = window.__graphjs__private__._edgeCount              || Symbol("edge count");
export const _extractTwoArgs         = window.__graphjs__private__._extractTwoArgs         || Symbol("extract ([a, b]) or (a, b) arguments");
export const _extractThreeArgs       = window.__graphjs__private__._extractThreeArgs       || Symbol("extract ([[a, b], c]), ([a, b], c) or (a, b, c) arguments");
export const _listeners              = window.__graphjs__private__._listeners              || Symbol("listeners");
export const _trigger                = window.__graphjs__private__._trigger                || Symbol("trigger");
export const _verticesFrom           = window.__graphjs__private__._verticesFrom           || Symbol("vertices from");
export const _verticesTo             = window.__graphjs__private__._verticesTo             || Symbol("vertices to");
export const _edgesFrom              = window.__graphjs__private__._edgesFrom              || Symbol("edges from");
export const _edgesTo                = window.__graphjs__private__._edgesTo                || Symbol("edges to");
export const _verticesWithPathTo     = window.__graphjs__private__._verticesWithPathTo     || Symbol("vertices with path to");
export const _verticesWithPathFrom   = window.__graphjs__private__._verticesWithPathFrom   || Symbol("vertices with path from");
export const _paths                  = window.__graphjs__private__._paths                  || Symbol("paths");
export const _expectVertices         = window.__graphjs__private__._expectVertices         || Symbol("expect vertices");
export const _expectVerticesAbsent   = window.__graphjs__private__._expectVerticesAbsent   || Symbol("expect vertex absent");
export const _expectEdges            = window.__graphjs__private__._expectEdges            || Symbol("expect edge");
export const _expectEdgesAbsent      = window.__graphjs__private__._expectEdgesAbsent      || Symbol("expect edge absent");
export const _expectNoConnectedEdges = window.__graphjs__private__._expectNoConnectedEdges || Symbol("expect no connected edges");

Object.assign(window.__graphjs__private__, {
	_vertices,
	_edges,
	_reverseEdges,
	_sources,
	_sinks,
	_edgeCount,
	_extractTwoArgs,
	_extractThreeArgs,
	_listeners,
	_trigger,
	_verticesFrom,
	_verticesTo,
	_edgesFrom,
	_edgesTo,
	_verticesWithPathTo,
	_verticesWithPathFrom,
	_paths,
	_expectVertices,
	_expectVerticesAbsent,
	_expectEdges,
	_expectEdgesAbsent,
	_expectNoConnectedEdges
});
