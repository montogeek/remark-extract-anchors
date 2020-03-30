const visit = require("unist-util-visit");
const reduceChildren = require('./reduceChildren');

/**
 * A remark plugin to extract anchors markdown headers
 *
 * @param  {object}   options - ...
 * @return {function}         - ...
 */
module.exports = function extractAnchors(options = {}) {
  let {anchors, levels = 6} = options;

  if (!Array.isArray(anchors)) {
    throw new Error("Missing or malformed `anchors` in options.");
  }

  if (typeof levels !== "undefined") {
    if (!Number.isInteger(levels)) {
      throw new Error("`levels` should only be integer")
    }
  }

  return function transformer(ast) {
    visit(ast, "heading", visitor);
  };

  function getTitle(children) {
    return reduceChildren(children).join('')
  }

  function visitor(node) {
    if (!node.children.some(child => child.type === "link")) {
      if (node.depth > levels) return
      options.anchors.push({
        title: getTitle(node.children),
        id: node.data && node.data.id,
        level: node.depth
      });
    }
  }
};
