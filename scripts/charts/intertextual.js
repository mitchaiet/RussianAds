const intertextual = (elements, connections) => {

    const id = 'intertextual'
    const label = 'Intertextual'
    const wrapper = newWrapper(id)
     const { nodes, links, legend } = parseKumuData(
      elements,
      connections)
     
    const renderGraph = () => {
  
      const canvas = newCanvas(
        id,
        nodes,
        links,
        legend,
        {
          nodeRadius: 15, 
          nodeDistance: 140,
          chargeStr: -400,
          xDenom: 1,
          xStr: 0.005,
          yDenom: 0.9,
          yStr: 0.0
        }
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
    
    return (renderGraph().node())
  }