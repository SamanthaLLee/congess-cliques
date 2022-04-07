import nodeCsvFile from './fb-pages-politician/fb-pages-politician-nodes.csv'
import edgeCsvFile from './fb-pages-politician/fb-pages-politician-edges.csv'
import Papa from 'papaparse'

var nodesArray = []
var linksArray = []
var nodeSet = new Set()

Papa.parse(nodeCsvFile, {
  download: true,
  complete: function (input) {
    for (let i = 1; i < input.data.length; i++) {
      if (input.data[i][1] != null && (input.data[i][1].toLowerCase().includes("senator") || input.data[i][1].toLowerCase().includes("congress"))) {
        nodesArray.push({ "id": input.data[i][2], "name": input.data[i][1] });
        nodeSet.add(input.data[i][2])
      }
    }
  }
});

Papa.parse(edgeCsvFile, {
  download: true,
  complete: function (input) {
    for (let i = 1; i < input.data.length; i++) {
      if (nodeSet.has(input.data[i][0]) && nodeSet.has(input.data[i][1])) {
        linksArray.push({ "source": input.data[i][0], "target": input.data[i][1] })
      }
    }
    console.log(linksArray)
  }
});

export const nodes = nodesArray;
export const links = [{ source: '61', target: '2104' }, { source: '61', target: '2736' }, { source: '61', target: '4815' }];