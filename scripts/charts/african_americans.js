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
          xStr: 0.05,
          yDenom: 0.9,
          yStr: 0.07
        },
        { k: 0.8900757332524954, x: 60.76966722704026, y: 44.89473814428686 }
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