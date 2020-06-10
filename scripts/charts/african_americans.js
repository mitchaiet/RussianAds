const africanAmericans = (elements, connections) => {

    const id = 'african-americans'
    const label = '#africanmericans'
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
          nodeRadius: 15, 
          nodeDistance: 50,
          chargeStr: -500,
          xDenom: 1,
          xStr: 0.0,
          yDenom: 0.9,
          yStr: 0.0
        }
      )
  
      wrapper.node().appendChild(canvas)
      return (wrapper)
    }
    
    const startOverlay = () => {
      const showGraphButton = newGraphStartButton(wrapper, label)
        .on('click', () => {
          showGraphButton.remove()
          renderGraph()
        })
  
      return (wrapper.node())
    }
    
    return (nodes.length > 100 ? startOverlay() : renderGraph().node())
  }