const silverCrowns = (elements, connections) => {

    const id = 'silver_crowns'
    const label = 'Silver Crowns'
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
        },
        {k: 2.0139111001134418, x: -464.87823940201304, y: -335.09761858749255}
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