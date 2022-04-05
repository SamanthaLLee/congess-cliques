import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ForceGraph3D from 'react-force-graph-3d';


ReactDOM.render(
  <React.StrictMode>
    < ForceGraph3D graphData={{
      nodes: [{ "id": "id1", "name": "name1", "val": 1 }, { "id": "id2", "name": "name2", "val": 10 }],
      links: [{ "source": "id1", "target": "id2" }]
    }} />,
    document.getElementById('graph')
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
