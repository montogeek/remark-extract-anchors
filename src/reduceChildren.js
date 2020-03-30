module.exports = function reduceChildren(children) {
  return children.reduce((acc, cur) => {
    if (cur.children) {
      acc = acc.concat(reduceChildren(cur.children))
    } else {
      acc = acc.concat([cur.value])
    }
    return acc
  }, [])
}
