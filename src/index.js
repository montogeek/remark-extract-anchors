const visit = require('unist-util-visit');

/**
 * A remark plugin to extract anchors markdown headers
 *
 * @param  {object}   options - ...
 * @return {function}         - ...
 */
module.exports = function extractAnchors(options = {}) {
  let { anchors, levels } = options;

  if (!Array.isArray(anchors)) {
    throw new Error('Missing or malformed `anchors` in options.');
  }

  return function transformer(ast) {
    visit(ast, 'heading', visitor);
  };

  function visitor(node) {
    // TODO: Default header `levels` and check it to filter the `push`ed anchors
    let anchor = {
      title: node.children.length ? node.children[0].value : '',
      id: node.data.id
    };
    levels && (anchor.level = node.depth);
    options.anchors.push(anchor);
  }
};
