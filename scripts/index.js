const colors = {
    red : 'rgb(170, 34, 41)',
    grey : 'rgb(225, 225, 225)',
    darkGrey : 'rgb(140, 140, 140)',
    black : 'rgb(33, 33, 33)',
    lightRed : 'rgb(228, 138, 145)',
    green : 'rgb(202, 233, 215)'
},
width = window.innerWidth * 0.66,
r = 20,
nodeStrokeWidth = 1.5

function parseKumuData(elements, connections) {
  
    let legend = {}
    let totalImageSize = 0
  
    const els = d3.csvParse(elements).map(el => {
        el.id = el.Label
        delete el.Label
        if (el.Type === 'Russian Facebook Ad') {
          legend['Russian Facebook Ad'] = colors.lightRed
        } else if (el.Type != 'Russian Facebook Ad' && el.Type != 'Tineye Result') {
          legend[el.Type] = colors.green
        }
        el.Size
      
        return (el)
    })

    const cons = d3.csvParse(connections).map(con => {
        con.source = con.From
        con.target = con.To
        delete con.From
        delete con.To
        return (con)
    })

    return ({
        nodes : els,
        links : cons,
        legend
    })
}

function newWrapper(id) {
    const wrapperEl = document.createElement('div')
    const wrapper = d3.select(wrapperEl)
      .attr('class', 'wrapper')
              .attr('id', `wrapper-${id}`)
    return (wrapper)
  }

function newGraphStartButton(wrapper, title) {
    return (
        wrapper.append('span')
        .attr('class', 'start-button')
        .html(title)
    )
}

function drawSVGarcOnCanvas (Context,lastX,lastY,rx,ry,xAxisRotation,largeArcFlag,sweepFlag,x,y)
{
    //--------------------
    // rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y
    // are the 6 data items in the SVG path declaration following the A
    //
    // lastX and lastY are the previous point on the path before the arc
    //--------------------
    // useful functions
    var m   = function (   v) {return Math.sqrt (Math.pow (v[0],2) + Math.pow (v[1],2))};
    var r   = function (u, v) {return ( u[0]*v[0] + u[1]*v[1]) / (m(u) * m(v))};
    var ang = function (u, v) {return ((u[0]*v[1] < u[1]*v[0])? -1 : 1) * Math.acos (r (u,v))};
    //--------------------

    var currpX =  Math.cos (xAxisRotation) * (lastX - x) / 2.0 + Math.sin (xAxisRotation) * (lastY - y) / 2.0 ;
    var currpY = -Math.sin (xAxisRotation) * (lastX - x) / 2.0 + Math.cos (xAxisRotation) * (lastY - y) / 2.0 ;

    var l = Math.pow (currpX,2) / Math.pow (rx,2) + Math.pow (currpY,2) / Math.pow (ry,2);
    if (l > 1) {rx *= Math.sqrt (l); ry *= Math.sqrt (l)};
    var s = ((largeArcFlag == sweepFlag)? -1 : 1) * Math.sqrt 
        (( (Math.pow (rx,2) * Math.pow (ry    ,2)) - (Math.pow (rx,2) * Math.pow (currpY,2)) - (Math.pow (ry,2) * Math.pow (currpX,2))) 
        / (Math.pow (rx,2) * Math.pow (currpY,2) +   Math.pow (ry,2) * Math.pow (currpX,2)));
    if (isNaN (s)) s = 0 ;

    var cppX = s *  rx * currpY / ry ;
    var cppY = s * -ry * currpX / rx ;
    var centpX = (lastX + x) / 2.0 + Math.cos (xAxisRotation) * cppX - Math.sin (xAxisRotation) * cppY ;
    var centpY = (lastY + y) / 2.0 + Math.sin (xAxisRotation) * cppX + Math.cos (xAxisRotation) * cppY ;

    var ang1 = ang ([1,0], [(currpX-cppX)/rx,(currpY-cppY)/ry]);
    var a = [(  currpX-cppX)/rx,(currpY-cppY)/ry];
    var b = [(-currpX-cppX)/rx,(-currpY-cppY)/ry];
    var angd = ang (a,b);
    if (r (a,b) <= -1) angd = Math.PI;
    if (r (a,b) >=  1) angd = 0;

    var rad = (rx > ry)? rx : ry;
    var sx  = (rx > ry)? 1 : rx / ry;
    var sy  = (rx > ry)? ry / rx : 1;

    Context.translate (centpX,centpY);
    Context.rotate (xAxisRotation);
    Context.scale (sx, sy);
    Context.arc (0, 0, rad, ang1, ang1 + angd, 1 - sweepFlag);
    Context.scale (1/sx, 1/sy);
    Context.rotate (-xAxisRotation);
    Context.translate (-centpX, -centpY);
}

function clickOutsideNode({ mouseLoc, node, r }) {
    return (outsideCircle({ x : mouseLoc[0], x1 : node.x, y : mouseLoc[1], y1 : node.y, r }))
}

function outsideCircle({ x, x1, y, y1, r }) { return (Math.abs(x - x1) > r || Math.abs(y - y1) > r) }

function setTooltip({ p, node, wrapper, width }) {

    // Wrapper
    const tooltip = wrapper
          .append('div')
          .attr('class', 'tooltip')
          .attr('id', `tooltip-${node.id}`)
    
    tooltip.append('span').attr('class', 'close-x').html('✕').on('click', () => {
      tooltip.remove()
      d3.select('.highlight-circle.select').remove()
    })
    tooltip.style('z-index', 2)
    tooltip.style('max-width', `${width * 0.5}px`)
    tooltip.style('background-color', 'rgba(255, 255, 255, 0.95)')
    
    // Header
    const header = tooltip.append('div').attr('class', 'tooltip-header')
    const headerTextWrapper = header.append('div').attr('class', 'tooltip-header-text-wrapper')
      headerTextWrapper.append('h1').attr('class', 'tooltip-header-title').html(node.id)
      headerTextWrapper.append('h5').attr('class', 'tooltip-header-type').html(node.Type)

    // Image
    header.append('div')
      .attr('class', 'tooltip-img-wrapper')
      .append('img')
      .attr('class', 'tooltip-img')
      .attr('src', `images/${node.id}.png`)

    // Attributes
    Object.keys(node).sort().forEach(key => {
      if (node[key] != '' &&
          key != '_img' &&
          key != 'id' &&
          key != 'vx' && key != 'vy' &&
          key != 'x' && key != 'y') {
        const item = tooltip.append('div')
          .attr('class', 'tooltip-item')
        
        item.append('div').attr('class', 'tooltip-field-wrapper-key')
            .append('p').attr('class', 'tooltip-key').html(key)
        item.append('div').attr('class', 'tooltip-field-wrapper-value')
            .append('p').attr('class', 'tooltip-value').html(node[key])
      }
    }) 
  }

  function legendHTML(legend) {

    const data = Object.keys(legend)
    const legendWrapper = d3.create('div').attr('class', 'legend')
    
    legendWrapper.append('h4').html('Legend')
    
    const binding = legendWrapper.selectAll('divs')
        .data(data)
        .enter()
        .append('div')
        .attr('class', 'legend-item')

        binding.append('span')
            .attr('class', 'dot')
            .style('background-color', type => legend[type])

        binding.append('span')
            .html(type => type)

    return (legendWrapper)
            
  }

  function tooltipHTML() {
    return (d3.create('div').attr('class', 'tooltip-wrapper'))
 }

 function setHighlightCircle({ g, node, mode }) {
    g.append('circle')
      .attr('cx', node.x)
      .attr('cy', node.y)
      .attr('r', r * 1.4)
      .attr('fill-opacity', 0)
      .attr('stroke', colors.red)
      .attr('stroke-width', 2)
      .attr('class', `highlight-circle ${mode}`)
  }

  function renderLinks({ context, links }) {
    context.lineWidth = 1
    links.forEach(d => {
      const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y)
      context.beginPath()
      drawSVGarcOnCanvas(context, d.source.x, d.source.y, r, r, 0, 0, 1, d.target.x, d.target.y)
      context.strokeStyle = colors.grey
      context.stroke()
    })
  }

  function runSimulation({ n, simulation }) {
    for (let i = 0,
         n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()));
         i < n;
         ++i) {
      simulation.tick()
  }
}

function renderNodes({ context, nodes }) {
 
    context.beginPath()
  
    nodes.forEach(d => {
  
      //Legend Nodes
      context.lineWidth = 2
      context.moveTo(d.x + r, d.y)
      if (d.Type === 'Russian Facebook Ad') {
        context.beginPath()
        context.arc(d.x, d.y, r * 1.4, 0, 2 * Math.PI)
        context.fillStyle = colors.lightRed
        context.fill()
      } else if (d.Type != 'Russian Facebook Ad' && d.Type != 'Tineye Result') {
        context.beginPath()
        context.arc(d.x, d.y, r * 2, 0, 2 * Math.PI)
        context.fillStyle = colors.green
        context.fill()
      }

      //Regular Node
      context.beginPath()
      context.arc(d.x, d.y, r, 0, 2 * Math.PI)
      context.fillStyle = '#fff'
      context.fill()
      context.lineWidth = 4
      context.strokeStyle = colors.grey
      context.stroke()

      
      const renderImage = (context, d, image) => {
        context.save()
        context.moveTo(d.x + r, d.y)
        context.arc(d.x, d.y, r - 2, 0, 2 * Math.PI)
        context.clip() 
        context.drawImage(image, d.x - r, d.y - r, r * 2, r * 2)
        context.restore()
      }
      //Images
      if (d._img) {
          if (!d._img['broken']) {
            renderImage(context, d, d._img)
          }
      } else {
        let image = new Image()
        image.onload = () => renderImage(context, d, image)
        image.onerror = () => d._img['broken'] = true
        image.src = `images/${d.id}.png`
        d._img = image
      }
      
      //Text
      context.font = '0.4rem Arial'
      context.fillStyle = 'black'
      context.textAlign = 'center'
      context.fillText(d.id, d.x, d.y + r  + (r / 2))
  })
}

function newRetinaCanvas({ width, height, scale }) {
  
    const canvas = d3.create('canvas')
        .attr('width', width * scale)
        .attr('height', height * scale)
          
    canvas.node().style.width = `${width}px`
    canvas.node().style.height = `${height}px`
    canvas.node().getContext('2d').scale(scale, scale)
    
    return (canvas)
  }

  function newCanvas(chartId, nodes, links, legendItems, forceVariables) {

    const height = 600
    const canvas = newRetinaCanvas({ width, height, scale : 2 })
    const svg = d3.create('svg')
        .attr('width', width)
        .attr('height', height)

    const context = canvas.node().getContext('2d')
    const g = svg.attr('class', 'highlight-svg').append('g')
  
    canvas.attr('class', 'graph-canvas')
          
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).distance(forceVariables.nodeDistance).id(d => d.id))
      .force('charge', d3.forceManyBody().strength(forceVariables.chargeStr))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('x', d3.forceX(width / forceVariables.xDenom).strength(forceVariables.xStr))
      .force('y', d3.forceY(height * forceVariables.yDenom).strength(forceVariables.yStr))
      .stop()
   
    runSimulation({ simulation, n : 100 })
  
    context.clearRect(0, 0, width, height)
    
    renderLinks({ context, links })
    renderNodes({ context, nodes })
    
    canvas.on('click', function(d) {
  
      const parent = d3.select(`#${chartId}`)
      const p = d3.mouse(this),
            transform = d3.zoomTransform(parent.select('canvas').node()),
            mouseLoc = transform.invert(p),
            node = simulation.find(mouseLoc[0], mouseLoc[1]),
            currTooltip = parent.select('.tooltip'),
            sameNode = parent.select(`#tooltip-${node.id}`),
            selectionCircle =  parent.select('.highlight-circle.select')
  
      //toggle off
      if (!sameNode.empty()) {
        selectionCircle.remove()
        sameNode.remove()
        return ;
      }
      
      //click on different node
      if (!clickOutsideNode({ mouseLoc, node })) {
        if (!currTooltip.empty()) {
          currTooltip.remove()
          selectionCircle.remove()
        }
        
        setHighlightCircle({ node, g, mode : 'select' })
  
        setTooltip({
          width,
          mouseLoc,
          node,
          wrapper : parent.select('.tooltip-wrapper')
        })
        //click on bg
      } else {
         if (!currTooltip.empty())
           currTooltip.remove()
        }
    })
    .on('mousemove', function(d) {
  
       const parent = d3.select(`#${chartId}`)
       const p = d3.mouse(this)
       const transform = d3.zoomTransform(parent.select('canvas').node())
  
       const mouseLoc = transform.invert(p)
       const node = simulation.find(mouseLoc[0], mouseLoc[1])
  
      const highlightCircle = d3.select('.highlight-circle.hover')
  
      if (outsideCircle({ x : mouseLoc[0], x1 : node.x, y : mouseLoc[1], y1 : node.y, r })) {
        if (!highlightCircle.empty()) {
          highlightCircle.remove()
        }
       return ; 
      }
  
     if (!highlightCircle.empty()) {
       highlightCircle.remove()
     }
     
     setHighlightCircle({ node, g, mode : 'hover' })
  
    })
    
    canvas.call(d3.zoom()
        .scaleExtent([-4, 8])
        .on('zoom', function zoomed() {
        
            const { transform } = d3.event
  
            g.attr('transform', transform)
            context.save()
            context.clearRect(0, 0, width, height)
            context.translate(transform.x, transform.y)
            context.scale(transform.k, transform.k)
            renderLinks({ context, links })
            renderNodes({ context, nodes })
            context.restore()
        }))
  
    const legend = legendHTML(legendItems)

    const tooltip = tooltipHTML()
  
    const chartWrapper = d3.create('div')
        .attr('class', 'chart-wrapper')
        .attr('id', chartId)

    chartWrapper.node().appendChild(tooltip.node())
    chartWrapper.node().appendChild(legend.node())
    chartWrapper.node().appendChild(canvas.node())
    chartWrapper.node().appendChild(svg.node())

    return (chartWrapper.node())
  }