const _4chan = (elements, connections) => {

    const id = '_4chan'
    const label = '4chan'
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
          nodeRadius: 50, 
          nodeDistance: 200,
          chargeStr: -50,
          xDenom: 5,
          xStr: 0.0,
          yDenom: 0.9,
          yStr: 0.0
        },
        {k: 0.33962157113723634, x: 284.3718821242834, y: 183.41276358490995}
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