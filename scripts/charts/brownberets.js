const brownberets = (elements, connections) => {

    const id = 'brownberets'
    const label = '#brownberets'
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
          nodeDistance: 200,
          chargeStr: -500,
          xDenom: 1,
          xStr: 0.05,
          yDenom: 1,
          yStr: 0.07
        },
        {
          k: 0.27662433827306915,
          x: 300.03145016220185,
          y: 233.59850056066955,
          string : 'translate(300.03145016220185,233.59850056066955) scale(0.27662433827306915)'
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
