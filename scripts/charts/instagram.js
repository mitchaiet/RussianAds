const instagram = () => {

    const id = '_instagram'
    const label = 'Instagram'
    const wrapper = newWrapper(id)
    
     const { nodes, links, legend } = parseKumuData(
      instagram_elements,
      instagram_connections
    )
    
    const renderGraph = () => {
    
      const canvas = newCanvas(
        id,
        nodes,
        links,
        legend,
        {
          nodeRadius: 15, 
          nodeDistance: 200,
          chargeStr: -500,
          xDenom: 1,
          xStr: 0.05,
          yDenom: 0.9,
          yStr: 0.07
        },
        {k: 0.08753477005545031, x: 422.816285745425, y: 260.6888701711601}
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