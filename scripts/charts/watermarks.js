const watermarks = (elements, connections) => {

    const id = '_watermarks'
    const label = 'Watermarks'
    const wrapper = newWrapper(id)
    const { nodes, links, legend } = parseKumuData(elements, connections)
     
    const renderGraph = () => {
  
      const canvas = newCanvas(
        id,
        nodes,
        links,
        legend,
        {
         nodeRadius: 0, 
         nodeDistance: 120,
         chargeStr: -80,
         xDenom: 1,
         xStr: 0.0,
         yDenom: 0.9,
         yStr: 0.0
       },
       {k: 0.6868181167148122, x: 184.7172352927669, y: 110.87960074732757}
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