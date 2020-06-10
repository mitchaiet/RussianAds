
const css = `
.wrapper {
    height: 630px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .chart-wrapper {
    height: 630px;
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
  }
  
  .start-overlay {
    width: 100%;
    border: solid 2.2px rgba(0, 0, 0, 0.034);
  }
  
  .start-button {
    transition: background-color 0.5s ease,
                color 0.5s ease;
  
    color : white;
    border : solid 1px #333333;
    background-color: #1e88e5;
    border-radius : 6px;
    padding : 20px 20px;
  }
  
  .start-button:hover {
    color : #333333;
    background-color: white;
    border: solid 1px #333333;
    cursor: pointer;
  }
  
  .dot {
    height: 25px;
    width: 25px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 0.4rem;
    margin-bottom: 0.4rem;
  }
  
  .legend {
    position: absolute;
    bottom: 15px;
    left: 5px;
    padding: 10px 20px;
    border: solid 2.2px rgba(0, 0, 0, 0.034);
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    z-index: 1;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    padding: 1rem; 
  }
  
  .highlight-svg {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }
  
  .highlight-svg > * {
      pointer-events: none;
  }
  
  .graph-canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
  
  canvas {
    box-shadow: 0 0 15px -2px rgba(0, 0, 0, 0.06);
  }
  
  .tooltip {
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0 1px 10px rgba(0,0,0,0.1);
    border-right: 1px solid #f1f1f1;
    padding: 10px 30px;
    overflow-y: scroll;
    overflow-x: auto;
    height: 600px;
  }
  
  .close-x {
    position: absolute;
    top: 10px;
    right: 10px;
    font-weight: bold;
    color: ${colors.darkGrey};
  }
  
  .close-x:hover {
    cursor: pointer;
    text-shadow: -1px -1px 0 ${colors.grey}, 1px -1px 0 ${colors.grey}, -1px 1px 0 ${colors.grey}, 1px 1px 0 ${colors.grey};
  }
  
  .tooltip-header {
    display: flex;
  }
  
  .tooltip-header-type {
    color: ${colors.darkGrey}
  }
  
  .tooltip-field-wrapper-value {
    overflow-wrap: break-word;
    width: ${width * 0.2}px
  }
  
  .tooltip-img-wrapper {
    padding-left: 20px;
  }
  
  .tooltip-img {
    max-width: 80px;
    max-height: 120px;
  }
  
  .tooltip-field-wrapper-key {
    width: ${width * 0.2}px
  }
  
  .tooltip-item {
    display: flex;
  }
  
  .tooltip-key {
    text-align:right;
    padding-right: 1rem;
    font-weight: strong;
  }
  
  .tooltip-value {
    font-weight: 300;
  }
 `