import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ForceGraph3D from 'react-force-graph-3d';
import edgeCsvFile from './fb-pages-politician/fb-pages-politician-edges.csv'
import nodeCsvFile from './fb-pages-politician/fb-pages-politician-nodes.csv'
import Papa from 'papaparse'

var nodesArray = []
var linksArray = []
var nodeSet = new Set()

Papa.parse(nodeCsvFile, {
  download: true,
  complete: function (input) {
    for (let i = 1; i < input.data.length; i++) {
      // if (input.data[i][1] != null && (input.data[i][1].toLowerCase().includes("senator") || input.data[i][1].toLowerCase().includes("congress"))) {
      //   nodesArray.push({ "id": input.data[i][2], "name": input.data[i][1] });
      //   nodeSet.add(input.data[i][2])
      // }

      if (input.data[i][1] != null)
        if (input.data[i][1].toLowerCase().includes("senator")) {
          nodesArray.push({ "id": input.data[i][2], "name": input.data[i][1], "group": 1 });
          nodeSet.add(input.data[i][2])
        }
        else if (input.data[i][1].toLowerCase().includes("congress")) {
          nodesArray.push({ "id": input.data[i][2], "name": input.data[i][1], "group": 2 });
          nodeSet.add(input.data[i][2])
        }
    }
  }
});

Papa.parse(edgeCsvFile, {
  download: true,
  complete: function (input) {
    var string = ""
    for (let i = 1; i < input.data.length; i++) {
      if (nodeSet.has(input.data[i][0]) && nodeSet.has(input.data[i][1])) {
        string += "{ source: '" + input.data[i][0] + "', target: '" + input.data[i][1] + "'},"
      }
    }
  }
});

linksArray = [
  { source: '61', target: '2104' }, { source: '61', target: '2736' }, { source: '61', target: '4815' }, { source: '61', target: '531' }, { source: '61', target: '5321' }, { source: '61', target: '5357' }, { source: '121', target: '5111' }, { source: '121', target: '3087' }, { source: '121', target: '5145' }, { source: '121', target: '2337' }, { source: '121', target: '3789' }, { source: '121', target: '2713' }, { source: '121', target: '1142' }, { source: '206', target: '5444' }, { source: '260', target: '483' }, { source: '260', target: '1392' }, { source: '260', target: '973' }, { source: '302', target: '5554' }, { source: '302', target: '4815' }, { source: '302', target: '531' }, { source: '302', target: '5321' }, { source: '302', target: '5357' }, { source: '302', target: '5730' }, { source: '302', target: '2736' }, { source: '359', target: '5805' }, { source: '359', target: '5902' }, { source: '531', target: '5357' }, { source: '531', target: '1690' }, { source: '531', target: '4815' }, { source: '531', target: '5321' }, { source: '531', target: '2736' }, { source: '3087', target: '1996' }, { source: '3087', target: '766' }, { source: '3087', target: '1675' }, { source: '3087', target: '2713' }, { source: '3087', target: '1142' }, { source: '3087', target: '5111' }, { source: '619', target: '3504' }, { source: '619', target: '5860' }, { source: '619', target: '5431' }, { source: '619', target: '1184' }, { source: '619', target: '2290' }, { source: '619', target: '1944' }, { source: '693', target: '973' }, { source: '766', target: '1996' }, { source: '766', target: '2337' }, { source: '766', target: '5817' }, { source: '766', target: '2713' }, { source: '922', target: '5444' }, { source: '922', target: '5543' }, { source: '922', target: '4325' }, { source: '973', target: '1392' }, { source: '973', target: '3233' }, { source: '973', target: '3382' }, { source: '999', target: '5730' }, { source: '999', target: '2736' }, { source: '999', target: '1690' }, { source: '1142', target: '1675' }, { source: '1184', target: '3504' }, { source: '1184', target: '5860' }, { source: '1184', target: '5431' }, { source: '1184', target: '2290' }, { source: '1345', target: '3689' }, { source: '1345', target: '2856' }, { source: '1675', target: '3789' }, { source: '1675', target: '5145' }, { source: '1675', target: '2713' }, { source: '1690', target: '2817' }, { source: '1690', target: '4815' }, { source: '1690', target: '2736' }, { source: '1944', target: '3504' }, { source: '1996', target: '3789' }, { source: '1996', target: '2917' }, { source: '1996', target: '5145' }, { source: '1996', target: '2713' }, { source: '2104', target: '2736' }, { source: '2290', target: '5860' }, { source: '2290', target: '5431' }, { source: '2290', target: '3504' }, { source: '2337', target: '5817' }, { source: '2337', target: '2713' }, { source: '3789', target: '2713' }, { source: '3789', target: '5817' }, { source: '2736', target: '5730' }, { source: '2736', target: '5357' }, { source: '2736', target: '2817' }, { source: '2736', target: '4815' }, { source: '2736', target: '5321' }, { source: '2917', target: '5111' }, { source: '5444', target: '5543' }, { source: '5444', target: '3380' }, { source: '5444', target: '3308' }, { source: '5444', target: '4143' }, { source: '3233', target: '5805' }, { source: '3233', target: '5902' }, { source: '3308', target: '4143' }, { source: '3504', target: '5860' }, { source: '3504', target: '5431' }, { source: '4143', target: '5543' }, { source: '4325', target: '5543' }, { source: '4815', target: '5357' }, { source: '5431', target: '5860' }, { source: '5554', target: '5730' }]

ReactDOM.render(
  <React.StrictMode>
    < ForceGraph3D
      graphData={{
        nodes: nodesArray,
        links: linksArray
      }}
      nodeAutoColorBy="group"
    />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
