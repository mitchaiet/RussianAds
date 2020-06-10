const originalContent = (elements, connections) => {

    const id = 'original_content'
    const label = 'Original Content'
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
         nodeRadius: 0, 
         nodeDistance: 120,
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