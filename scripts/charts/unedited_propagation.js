const uneditedPropagation = (elements, connections) => {

    const wrapper = newWrapper('unedited_propagation')
    const { nodes, links, legend } = parseKumuData(elements, connections)
     
    const renderGraph = () => {
  
      const canvas = newCanvas(
        'unedited_propagation',
        nodes,
        links,
        legend,
        {
         nodeRadius: 300, 
         nodeDistance: 120,
         chargeStr: -500,
         xDenom: 3,
         xStr: 0.0,
         yDenom: 0.9,
         yStr: 0.0
       }
     )
    
     wrapper.node().appendChild(canvas)
     return (wrapper)
   } 
  
    const startOverlay = () => {
      const showGraphButton = newGraphStartButton(wrapper, 'Unedited Propagation')
        .on('click', () => {
          showGraphButton.remove()
          renderGraph()
        })
  
      return (wrapper.node())
    }

    return (nodes.length > 100 ? startOverlay() : renderGraph().node())
  }