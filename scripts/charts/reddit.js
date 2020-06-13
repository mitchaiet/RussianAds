const reddit = (elements, connections) => {
  const id = '_reddit'
  const label = 'Reddit'
  const wrapper = newWrapper(id)
  
   const { nodes, links, legend } = parseKumuData(
    elements,
    connections
    )
  
  const renderGraph = () => {
  
    const canvas = newCanvas(
      id,
      nodes,
      links,
      legend,
      {
        nodeRadius: 5, 
        nodeDistance: 100,
        chargeStr: -400,
        xDenom: 1,
        xStr: 0.05,
        yDenom: 0.9,
        yStr: 0.07
      },
      {k: 0.09645501094118332, x: 417.14668486534265, y: 262.7409889628228}
    )

    wrapper.node().appendChild(canvas)
    return (wrapper)
  }
  
  const startOverlay = () => {
    const showGraphButton = newGraphStartButton(wrapper, `Show ${label} Graph`)
      .on('click', () => {
        showGraphButton.remove()
        renderGraph()
      })

    return (wrapper.node())
  }
  
  return (nodes.length > 100 ? startOverlay() : renderGraph().node())
}