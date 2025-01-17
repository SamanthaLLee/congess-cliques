import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';
import edgeCsvFile from './fb-pages-politician/fb-pages-politician-edges.csv'
import nodeCsvFile from './fb-pages-politician/fb-pages-politician-nodes-clean-filtered.csv'
import Papa from 'papaparse'

const { useRef, useMemo, useState, useCallback } = React;

var nodesArray = []
var linksArray = []
var nodeDict = {}
var edgeDict = {}

Papa.parse(nodeCsvFile, {
  download: true,
  complete: function (input) {
    for (let i = 1; i < input.data.length; i++) {
      if (input.data[i][3] === 'D') {
        nodesArray.push({
          "id": input.data[i][2], "name": input.data[i][1], "group": 1, "color": "blue", "nodeLabel": "test"
        });
        nodeDict[input.data[i][2]] = input.data[i][1]
      }
      else if (input.data[i][3] === 'R') {
        nodesArray.push({
          "id": input.data[i][2], "name": input.data[i][1], "group": 2, "color": "red", "nodeLabel": "test"
        });
        nodeDict[input.data[i][2]] = input.data[i][1]
      }
    }
  }
});

Papa.parse(edgeCsvFile, {
  download: true,
  complete: function (input) {
    var string = ""
    for (let i = 1; i < input.data.length; i++) {
      if (input.data[i][0] in nodeDict && input.data[i][1] in nodeDict) {
        string += "{ source: '" + input.data[i][0] + "', srclabel: '" + nodeDict[input.data[i][0]] + "', target: '" + input.data[i][1] + "', targlabel: '" + nodeDict[input.data[i][1]] + "'},"
      }

      // add both nodes to adjacency list
      if (!(input.data[i][0] in edgeDict)) {
        edgeDict[input.data[i][0]] = new Set()
      }
      if (!(input.data[i][1] in edgeDict)) {
        edgeDict[input.data[i][1]] = new Set()
      }
      edgeDict[input.data[i][0]].add(input.data[i][0])
      edgeDict[input.data[i][0]].add(input.data[i][1])
    }
    console.log(string)
  }
});

linksArray = [{ source: '104', srclabel: 'Brendan Boyle', target: '3073', targlabel: 'Eric Swalwell' }, { source: '104', srclabel: 'Brendan Boyle', target: '5800', targlabel: 'Barack Obama' }, { source: '104', srclabel: 'Brendan Boyle', target: '2349', targlabel: 'Nancy Pelosi' }, { source: '149', srclabel: 'Tom Reed', target: '5631', targlabel: 'Chris Collins' }, { source: '238', srclabel: 'James Lankford', target: '2167', targlabel: 'Steve Stivers' }, { source: '238', srclabel: 'James Lankford', target: '4370', targlabel: 'Mike Lee' }, { source: '238', srclabel: 'James Lankford', target: '559', targlabel: 'Mary Fallin' }, { source: '323', srclabel: 'Mark Pocan', target: '466', targlabel: 'Tammy Baldwin' }, { source: '323', srclabel: 'Mark Pocan', target: '450', targlabel: 'Al Franken' }, { source: '323', srclabel: 'Mark Pocan', target: '5800', targlabel: 'Barack Obama' }, { source: '323', srclabel: 'Mark Pocan', target: '1280', targlabel: 'Russ Feingold' }, { source: '438', srclabel: 'Van Taylor', target: '3048', targlabel: 'Ted Cruz' }, { source: '450', srclabel: 'Al Franken', target: '5861', targlabel: 'Amy Klobuchar' }, { source: '450', srclabel: 'Al Franken', target: '5720', targlabel: 'Tim Walz' }, { source: '450', srclabel: 'Al Franken', target: '3137', targlabel: 'Chris Van Hollen' }, { source: '450', srclabel: 'Al Franken', target: '5534', targlabel: 'Peter DeFazio' }, { source: '450', srclabel: 'Al Franken', target: '5617', targlabel: 'Catherine Cortez Masto' }, { source: '450', srclabel: 'Al Franken', target: '3071', targlabel: 'Kirsten Gillibrand' }, { source: '466', srclabel: 'Tammy Baldwin', target: '5027', targlabel: 'Senator Ron Wyden' }, { source: '466', srclabel: 'Tammy Baldwin', target: '4271', targlabel: 'Mazie Hirono' }, { source: '466', srclabel: 'Tammy Baldwin', target: '1877', targlabel: 'Kyrsten Sinema' }, { source: '466', srclabel: 'Tammy Baldwin', target: '654', targlabel: 'Jeff Merkley' }, { source: '466', srclabel: 'Tammy Baldwin', target: '5800', targlabel: 'Barack Obama' }, { source: '466', srclabel: 'Tammy Baldwin', target: '1280', targlabel: 'Russ Feingold' }, { source: '654', srclabel: 'Jeff Merkley', target: '5027', targlabel: 'Senator Ron Wyden' }, { source: '654', srclabel: 'Jeff Merkley', target: '4271', targlabel: 'Mazie Hirono' }, { source: '654', srclabel: 'Jeff Merkley', target: '4833', targlabel: 'Earl Blumenauer' }, { source: '654', srclabel: 'Jeff Merkley', target: '921', targlabel: 'Tim Kaine' }, { source: '654', srclabel: 'Jeff Merkley', target: '2782', targlabel: 'Sherrod Brown' }, { source: '654', srclabel: 'Jeff Merkley', target: '4744', targlabel: 'Martin Heinrich' }, { source: '654', srclabel: 'Jeff Merkley', target: '4357', targlabel: 'Jon Tester' }, { source: '654', srclabel: 'Jeff Merkley', target: '1369', targlabel: 'Tom Udall' }, { source: '654', srclabel: 'Jeff Merkley', target: '4171', targlabel: 'Suzanne Bonamici' }, { source: '654', srclabel: 'Jeff Merkley', target: '1557', targlabel: 'Heidi Heitkamp' }, { source: '654', srclabel: 'Jeff Merkley', target: '5534', targlabel: 'Peter DeFazio' }, { source: '654', srclabel: 'Jeff Merkley', target: '3071', targlabel: 'Kirsten Gillibrand' }, { source: '680', srclabel: 'Greg Walden', target: '2167', targlabel: 'Steve Stivers' }, { source: '680', srclabel: 'Greg Walden', target: '5631', targlabel: 'Chris Collins' }, { source: '2092', srclabel: 'Joe Courtney for Congress', target: '781', targlabel: 'Ed Perlmutter' }, { source: '773', srclabel: 'Lee Zeldin', target: '2900', targlabel: 'Hillary Clinton' }, { source: '773', srclabel: 'Lee Zeldin', target: '921', targlabel: 'Tim Kaine' }, { source: '773', srclabel: 'Lee Zeldin', target: '5631', targlabel: 'Chris Collins' }, { source: '781', srclabel: 'Ed Perlmutter', target: '2268', targlabel: 'Diana DeGette' }, { source: '781', srclabel: 'Ed Perlmutter', target: '2900', targlabel: 'Hillary Clinton' }, { source: '781', srclabel: 'Ed Perlmutter', target: '3818', targlabel: 'Congressman Jared Polis' }, { source: '781', srclabel: 'Ed Perlmutter', target: '5115', targlabel: 'Michael Bennet' }, { source: '781', srclabel: 'Ed Perlmutter', target: '5800', targlabel: 'Barack Obama' }, { source: '830', srclabel: 'Scott Peters', target: '3503', targlabel: 'Kamala Harris' }, { source: '830', srclabel: 'Scott Peters', target: '5800', targlabel: 'Barack Obama' }, { source: '833', srclabel: 'Ryan Zinke', target: '1175', targlabel: 'Scott Taylor' }, { source: '862', srclabel: 'Mark Kirk', target: '1199', targlabel: 'Paul Ryan' }, { source: '862', srclabel: 'Mark Kirk', target: '5412', targlabel: 'Marco Rubio' }, { source: '862', srclabel: 'Mark Kirk', target: '4922', targlabel: 'Bobby Schilling' }, { source: '921', srclabel: 'Tim Kaine', target: '5027', targlabel: 'Senator Ron Wyden' }, { source: '921', srclabel: 'Tim Kaine', target: '2900', targlabel: 'Hillary Clinton' }, { source: '921', srclabel: 'Tim Kaine', target: '4544', targlabel: 'Bob Casey' }, { source: '921', srclabel: 'Tim Kaine', target: '5800', targlabel: 'Barack Obama' }, { source: '963', srclabel: 'Patrick McHenry', target: '2851', targlabel: 'Mitt Romney' }, { source: '963', srclabel: 'Patrick McHenry', target: '4350', targlabel: 'Robert Pittenger' }, { source: '963', srclabel: 'Patrick McHenry', target: '1199', targlabel: 'Paul Ryan' }, { source: '963', srclabel: 'Patrick McHenry', target: '2167', targlabel: 'Steve Stivers' }, { source: '967', srclabel: 'Michele Bachmann', target: '1522', targlabel: 'Congressman Joe Barton' }, { source: '967', srclabel: 'Michele Bachmann', target: '5883', targlabel: 'Tim Scott' }, { source: '967', srclabel: 'Michele Bachmann', target: '2809', targlabel: 'Steve King' }, { source: '967', srclabel: 'Michele Bachmann', target: '3048', targlabel: 'Ted Cruz' }, { source: '1098', srclabel: 'Andy Harris', target: '2851', targlabel: 'Mitt Romney' }, { source: '1098', srclabel: 'Andy Harris', target: '5413', targlabel: 'John Boehner' }, { source: '1098', srclabel: 'Andy Harris', target: '1199', targlabel: 'Paul Ryan' }, { source: '1098', srclabel: 'Andy Harris', target: '3816', targlabel: 'Mitch McConnell' }, { source: '1186', srclabel: 'Jackie Walorski', target: '5631', targlabel: 'Chris Collins' }, { source: '1186', srclabel: 'Jackie Walorski', target: '4819', targlabel: 'Mike Pence' }, { source: '1186', srclabel: 'Jackie Walorski', target: '2421', targlabel: 'Todd Young' }, { source: '1199', srclabel: 'Paul Ryan', target: '1522', targlabel: 'Congressman Joe Barton' }, { source: '1199', srclabel: 'Paul Ryan', target: '5405', targlabel: 'Fred Upton' }, { source: '1199', srclabel: 'Paul Ryan', target: '5267', targlabel: 'Bill Huizenga' }, { source: '1199', srclabel: 'Paul Ryan', target: '4983', targlabel: 'Jack Bergman' }, { source: '1199', srclabel: 'Paul Ryan', target: '3529', targlabel: 'Ben Sasse' }, { source: '1199', srclabel: 'Paul Ryan', target: '5412', targlabel: 'Marco Rubio' }, { source: '1199', srclabel: 'Paul Ryan', target: '4350', targlabel: 'Robert Pittenger' }, { source: '1199', srclabel: 'Paul Ryan', target: '5413', targlabel: 'John Boehner' }, { source: '1199', srclabel: 'Paul Ryan', target: '2167', targlabel: 'Steve Stivers' }, { source: '1199', srclabel: 'Paul Ryan', target: '4473', targlabel: 'Rand Paul' }, { source: '1199', srclabel: 'Paul Ryan', target: '3342', targlabel: 'Senator David Vitter' }, { source: '1199', srclabel: 'Paul Ryan', target: '3959', targlabel: 'Ron Johnson' }, { source: '1199', srclabel: 'Paul Ryan', target: '2851', targlabel: 'Mitt Romney' }, { source: '1199', srclabel: 'Paul Ryan', target: '5854', targlabel: 'Michael Burgess' }, { source: '1877', srclabel: 'Kyrsten Sinema', target: '4976', targlabel: 'Ann Kirkpatrick' }, { source: '1877', srclabel: 'Kyrsten Sinema', target: '5028', targlabel: 'Rep. Ruben Gallego' }, { source: '1369', srclabel: 'Tom Udall', target: '4744', targlabel: 'Martin Heinrich' }, { source: '1471', srclabel: 'Shelley Moore Capito', target: '2851', targlabel: 'Mitt Romney' }, { source: '1471', srclabel: 'Shelley Moore Capito', target: '2167', targlabel: 'Steve Stivers' }, { source: '1471', srclabel: 'Shelley Moore Capito', target: '5394', targlabel: 'Bobby Jindal' }, { source: '1471', srclabel: 'Shelley Moore Capito', target: '3888', targlabel: 'Kevin McCarthy' }, { source: '1471', srclabel: 'Shelley Moore Capito', target: '3349', targlabel: 'Bill Cassidy' }, { source: '1522', srclabel: 'Congressman Joe Barton', target: '2268', targlabel: 'Diana DeGette' }, { source: '1522', srclabel: 'Congressman Joe Barton', target: '5267', targlabel: 'Bill Huizenga' }, { source: '1522', srclabel: 'Congressman Joe Barton', target: '3048', targlabel: 'Ted Cruz' }, { source: '1522', srclabel: 'Congressman Joe Barton', target: '3112', targlabel: 'John Dingell' }, { source: '1522', srclabel: 'Congressman Joe Barton', target: '5394', targlabel: 'Bobby Jindal' }, { source: '1522', srclabel: 'Congressman Joe Barton', target: '5854', targlabel: 'Michael Burgess' }, { source: '1522', srclabel: 'Congressman Joe Barton', target: '5405', targlabel: 'Fred Upton' }, { source: '1522', srclabel: 'Congressman Joe Barton', target: '3349', targlabel: 'Bill Cassidy' }, { source: '1557', srclabel: 'Heidi Heitkamp', target: '5027', targlabel: 'Senator Ron Wyden' }, { source: '1557', srclabel: 'Heidi Heitkamp', target: '4271', targlabel: 'Mazie Hirono' }, { source: '1564', srclabel: 'Eleanor Holmes Norton', target: '5798', targlabel: 'Congresswoman Dina Titus' }, { source: '1564', srclabel: 'Eleanor Holmes Norton', target: '4613', targlabel: 'Robin Kelly' }, { source: '1564', srclabel: 'Eleanor Holmes Norton', target: '4213', targlabel: 'Congresswoman Sheila Jackson Lee' }, { source: '1564', srclabel: 'Eleanor Holmes Norton', target: '4276', targlabel: 'Rep. Lois Frankel' }, { source: '1564', srclabel: 'Eleanor Holmes Norton', target: '5316', targlabel: 'Rep. Cedric Richmond' },
{ source: '1564', srclabel: 'Eleanor Holmes Norton', target: '1565', targlabel: 'Congressman G. K. Butterfield' }, { source: '1564', srclabel: 'Eleanor Holmes Norton', target: '3112', targlabel: 'John Dingell' }, { source: '1760', srclabel: 'Rob Portman', target: '2167', targlabel: 'Steve Stivers' }, { source: '1906', srclabel: 'Cory Gardner', target: '5281', targlabel: 'Charles Boustany Jr' }, { source: '1906', srclabel: 'Cory Gardner', target: '2167', targlabel: 'Steve Stivers' }, { source: '3302', srclabel: 'Elise Stefanik', target: '5631', targlabel: 'Chris Collins' }, { source: '1945', srclabel: 'Sean Duffy', target: '2167', targlabel: 'Steve Stivers' }, { source: '1945', srclabel: 'Sean Duffy', target: '3959', targlabel: 'Ron Johnson' }, { source: '1945', srclabel: 'Sean Duffy', target: '5413', targlabel: 'John Boehner' }, { source: '2053', srclabel: 'Dan Sullivan', target: '4370', targlabel: 'Mike Lee' }, { source: '2167', srclabel: 'Steve Stivers', target: '4553', targlabel: 'Marlin Stutzman' }, { source: '2167', srclabel: 'Steve Stivers', target: '3145', targlabel: 'Jim Renacci' }, { source: '2167', srclabel: 'Steve Stivers', target: '5413', targlabel: 'John Boehner' }, { source: '2167', srclabel: 'Steve Stivers', target: '4350', targlabel: 'Robert Pittenger' }, { source: '2167', srclabel: 'Steve Stivers', target: '5703', targlabel: 'Lynn Westmoreland' }, { source: '2167', srclabel: 'Steve Stivers', target: '5339', targlabel: 'Jason Chaffetz' }, { source: '2167', srclabel: 'Steve Stivers', target: '5334', targlabel: 'Tom Cotton' }, { source: '2167', srclabel: 'Steve Stivers', target: '5010', targlabel: 'Cathy McMorris Rodgers' }, { source: '2167', srclabel: 'Steve Stivers', target: '5405', targlabel: 'Fred Upton' }, { source: '2167', srclabel: 'Steve Stivers', target: '5267', targlabel: 'Bill Huizenga' }, { source: '2241', srclabel: 'Mimi Walters', target: '5010', targlabel: 'Cathy McMorris Rodgers' }, { source: '2268', srclabel: 'Diana DeGette', target: '5405', targlabel: 'Fred Upton' }, { source: '2349', srclabel: 'Nancy Pelosi', target: '2349', targlabel: 'Nancy Pelosi' }, { source: '2349', srclabel: 'Nancy Pelosi', target: '3073', targlabel: 'Eric Swalwell' }, { source: '2349', srclabel: 'Nancy Pelosi', target: '5800', targlabel: 'Barack Obama' }, { source: '2421', srclabel: 'Todd Young', target: '4553', targlabel: 'Marlin Stutzman' }, { source: '2421', srclabel: 'Todd Young', target: '5413', targlabel: 'John Boehner' }, { source: '2421', srclabel: 'Todd Young', target: '4819', targlabel: 'Mike Pence' }, { source: '2421', srclabel: 'Todd Young', target: '4644', targlabel: 'Luke Messer' }, { source: '2421', srclabel: 'Todd Young', target: '5334', targlabel: 'Tom Cotton' }, { source: '2451', srclabel: 'Suzan DelBene', target: '4666', targlabel: 'Maria Cantwell' }, { source: '2451', srclabel: 'Suzan DelBene', target: '336', targlabel: 'Patty Murray' }, { source: '2532', srclabel: 'Adam Schiff', target: '4884', targlabel: 'Barbara Lee' }, { source: '2649', srclabel: 'Johnny Isakson', target: '2750', targlabel: 'Rick Allen' }, { source: '2649', srclabel: 'Johnny Isakson', target: '5703', targlabel: 'Lynn Westmoreland' }, { source: '2667', srclabel: 'Roger Wicker', target: '5800', targlabel: 'Barack Obama' }, { source: '2679', srclabel: 'Neil Abercrombie', target: '4271', targlabel: 'Mazie Hirono' }, { source: '2679', srclabel: 'Neil Abercrombie', target: '4626', targlabel: 'Brian Schatz' }, { source: '2679', srclabel: 'Neil Abercrombie', target: '5800', targlabel: 'Barack Obama' }, { source: '2679', srclabel: 'Neil Abercrombie', target: '2981', targlabel: 'Tulsi Gabbard' }, { source: '2686', srclabel: 'Mark Takai for Hawaii', target: '4271', targlabel: 'Mazie Hirono' }, { source: '2750', srclabel: 'Rick Allen', target: '5412', targlabel: 'Marco Rubio' }, { source: '2750', srclabel: 'Rick Allen', target: '5703', targlabel: 'Lynn Westmoreland' }, { source: '2790', srclabel: 'Steve Daines', target: '4370', targlabel: 'Mike Lee' }, { source: '2809', srclabel: 'Steve King', target: '3048', targlabel: 'Ted Cruz' }, { source: '2851', srclabel: 'Mitt Romney', target: '5267', targlabel: 'Bill Huizenga' }, { source: '2851', srclabel: 'Mitt Romney', target: '5413', targlabel: 'John Boehner' }, { source: '2851', srclabel: 'Mitt Romney', target: '3342', targlabel: 'Senator David Vitter' }, { source: '2851', srclabel: 'Mitt Romney', target: '3048', targlabel: 'Ted Cruz' }, { source: '2851', srclabel: 'Mitt Romney', target: '4350', targlabel: 'Robert Pittenger' }, { source: '2900', srclabel: 'Hillary Clinton', target: '3503', targlabel: 'Kamala Harris' }, { source: '2900', srclabel: 'Hillary Clinton', target: '4322', targlabel: 'Debbie Stabenow' }, { source: '2900', srclabel: 'Hillary Clinton', target: '4544', targlabel: 'Bob Casey' }, { source: '2900', srclabel: 'Hillary Clinton', target: '5876', targlabel: 'John Sarbanes' }, { source: '2995', srclabel: 'Joe Donnelly', target: '5027', targlabel: 'Senator Ron Wyden' }, { source: '2995', srclabel: 'Joe Donnelly', target: '4271', targlabel: 'Mazie Hirono' }, { source: '3040', srclabel: 'John McCain', target: '5334', targlabel: 'Tom Cotton' }, { source: '336', srclabel: 'Patty Murray', target: '4002', targlabel: 'Jay Inslee' }, { source: '336', srclabel: 'Patty Murray', target: '4271', targlabel: 'Mazie Hirono' }, { source: '336', srclabel: 'Patty Murray', target: '4666', targlabel: 'Maria Cantwell' }, { source: '3048', srclabel: 'Ted Cruz', target: '5267', targlabel: 'Bill Huizenga' }, { source: '3048', srclabel: 'Ted Cruz', target: '5467', targlabel: 'John Cornyn' }, { source: '3048', srclabel: 'Ted Cruz', target: '4370', targlabel: 'Mike Lee' }, { source: '3048', srclabel: 'Ted Cruz', target: '3529', targlabel: 'Ben Sasse' }, { source: '3048', srclabel: 'Ted Cruz', target: '5412', targlabel: 'Marco Rubio' }, { source: '3048', srclabel: 'Ted Cruz', target: '4473', targlabel: 'Rand Paul' }, { source: '3048', srclabel: 'Ted Cruz', target: '5872', targlabel: 'Justin Amash' }, { source: '3063', srclabel: 'Debbie Wasserman Schultz', target: '5537', targlabel: 'Karen Bass' }, { source: '3063', srclabel: 'Debbie Wasserman Schultz', target: '3682', targlabel: 'Brad Schneider' }, { source: '3063', srclabel: 'Debbie Wasserman Schultz', target: '4744', targlabel: 'Martin Heinrich' }, { source: '3071', srclabel: 'Kirsten Gillibrand', target: '4271', targlabel: 'Mazie Hirono' }, { source: '3071', srclabel: 'Kirsten Gillibrand', target: '4613', targlabel: 'Robin Kelly' }, { source: '3112', srclabel: 'John Dingell', target: '4213', targlabel: 'Congresswoman Sheila Jackson Lee' }, { source: '3112', srclabel: 'John Dingell', target: '3818', targlabel: 'Congressman Jared Polis' }, { source: '3112', srclabel: 'John Dingell', target: '5800', targlabel: 'Barack Obama' }, { source: '3137', srclabel: 'Chris Van Hollen', target: '5876', targlabel: 'John Sarbanes' }, { source: '3342', srclabel: 'Senator David Vitter', target: '5281', targlabel: 'Charles Boustany Jr' }, { source: '3342', srclabel: 'Senator David Vitter', target: '4344', targlabel: 'Jeff Landry' }, { source: '3342', srclabel: 'Senator David Vitter', target: '4370', targlabel: 'Mike Lee' }, { source: '3342', srclabel: 'Senator David Vitter', target: '3349', targlabel: 'Bill Cassidy' }, { source: '3349', srclabel: 'Bill Cassidy', target: '5413', targlabel: 'John Boehner' }, { source: '3349', srclabel: 'Bill Cassidy', target: '4344', targlabel: 'Jeff Landry' }, { source: '3349', srclabel: 'Bill Cassidy', target: '4370', targlabel: 'Mike Lee' }, { source: '3376', srclabel: 'Bill Enyart', target: '3682', targlabel: 'Brad Schneider' }, { source: '3464', srclabel: 'Jacky Rosen for Nevada', target: '4139', targlabel: 'Cheri Bustos' }, { source: '3503', srclabel: 'Kamala Harris', target: '5537', targlabel: 'Karen Bass' }, { source: '3503', srclabel: 'Kamala Harris', target: '5800', targlabel: 'Barack Obama' }, { source: '3503', srclabel: 'Kamala Harris', target: '4304', targlabel: 'Mark Takano' }, { source: '3529', srclabel: 'Ben Sasse', target: '4370', targlabel: 'Mike Lee' }, { source: '3529', srclabel: 'Ben Sasse', target: '5367', targlabel: 'Adrian Smith' }, { source: '3590', srclabel: 'Rep. Jason Lewis', target: '5800', targlabel: 'Barack Obama' }, { source: '3682', srclabel: 'Brad Schneider', target: '4139', targlabel: 'Cheri Bustos' }, { source: '3682', srclabel: 'Brad Schneider', target: '5800', targlabel: 'Barack Obama' }, { source: '3682', srclabel: 'Brad Schneider', target: '3788', targlabel: 'Tammy Duckworth' }, { source: '3716', srclabel: 'Congressman John Kline', target: '3888', targlabel: 'Kevin McCarthy' }, { source: '3788', srclabel: 'Tammy Duckworth', target: '4271', targlabel: 'Mazie Hirono' }, { source: '3818', srclabel: 'Congressman Jared Polis', target: '4833', targlabel: 'Earl Blumenauer' }, { source: '3818', srclabel: 'Congressman Jared Polis', target: '5596', targlabel: 'Mark Udall' }, { source: '3818', srclabel: 'Congressman Jared Polis', target: '5872', targlabel: 'Justin Amash' }, { source: '3824', srclabel: 'Mary Landrieu', target: '4271', targlabel: 'Mazie Hirono' }, { source: '3888', srclabel: 'Kevin McCarthy', target: '4350', targlabel: 'Robert Pittenger' }, { source: '3888', srclabel: 'Kevin McCarthy', target: '5872', targlabel: 'Justin Amash' }, { source: '3888', srclabel: 'Kevin McCarthy', target: '5854', targlabel: 'Michael Burgess' }, { source: '3959', srclabel: 'Ron Johnson', target: '5334', targlabel: 'Tom Cotton' }, { source: '4002', srclabel: 'Jay Inslee', target: '5800', targlabel: 'Barack Obama' }, { source: '4002', srclabel: 'Jay Inslee', target: '4666', targlabel: 'Maria Cantwell' }, { source: '4171', srclabel: 'Suzanne Bonamici', target: '5027', targlabel: 'Senator Ron Wyden' }, { source: '4171', srclabel: 'Suzanne Bonamici', target: '4833', targlabel: 'Earl Blumenauer' }, { source: '4171', srclabel: 'Suzanne Bonamici', target: '5800', targlabel: 'Barack Obama' }, { source: '4171', srclabel: 'Suzanne Bonamici', target: '5534', targlabel: 'Peter DeFazio' },
{ source: '4271', srclabel: 'Mazie Hirono', target: '5861', targlabel: 'Amy Klobuchar' }, { source: '4271', srclabel: 'Mazie Hirono', target: '4744', targlabel: 'Martin Heinrich' }, { source: '4271', srclabel: 'Mazie Hirono', target: '4322', targlabel: 'Debbie Stabenow' }, { source: '4271', srclabel: 'Mazie Hirono', target: '5800', targlabel: 'Barack Obama' }, { source: '4271', srclabel: 'Mazie Hirono', target: '2981', targlabel: 'Tulsi Gabbard' }, { source: '4271', srclabel: 'Mazie Hirono', target: '4666', targlabel: 'Maria Cantwell' }, { source: '4304', srclabel: 'Mark Takano', target: '5800', targlabel: 'Barack Obama' }, { source: '4322', srclabel: 'Debbie Stabenow', target: '5800', targlabel: 'Barack Obama' }, { source: '4322', srclabel: 'Debbie Stabenow', target: '5140', targlabel: 'Dan Kildee' }, { source: '4344', srclabel: 'Jeff Landry', target: '4473', targlabel: 'Rand Paul' }, { source: '4370', srclabel: 'Mike Lee', target: '4803', targlabel: 'David Perdue' }, { source: '4370', srclabel: 'Mike Lee', target: '4687', targlabel: 'Joni Ernst' }, { source: '4370', srclabel: 'Mike Lee', target: '5339', targlabel: 'Jason Chaffetz' }, { source: '4370', srclabel: 'Mike Lee', target: '4473', targlabel: 'Rand Paul' }, { source: '4370', srclabel: 'Mike Lee', target: '5334', targlabel: 'Tom Cotton' }, { source: '4473', srclabel: 'Rand Paul', target: '4922', targlabel: 'Bobby Schilling' }, { source: '4473', srclabel: 'Rand Paul', target: '5872', targlabel: 'Justin Amash' }, { source: '4553', srclabel: 'Marlin Stutzman', target: '4819', targlabel: 'Mike Pence' }, { source: '4613', srclabel: 'Robin Kelly', target: '5507', targlabel: 'Dianne Feinstein' }, { source: '4626', srclabel: 'Brian Schatz', target: '2981', targlabel: 'Tulsi Gabbard' }, { source: '4650', srclabel: 'A. Donald McEachin', target: '5800', targlabel: 'Barack Obama' }, { source: '4687', srclabel: 'Joni Ernst', target: '5267', targlabel: 'Bill Huizenga' }, { source: '4744', srclabel: 'Martin Heinrich', target: '5800', targlabel: 'Barack Obama' }, { source: '4833', srclabel: 'Earl Blumenauer', target: '5534', targlabel: 'Peter DeFazio' }, { source: '4884', srclabel: 'Barbara Lee', target: '5800', targlabel: 'Barack Obama' }, { source: '4922', srclabel: 'Bobby Schilling', target: '5412', targlabel: 'Marco Rubio' }, { source: '4922', srclabel: 'Bobby Schilling', target: '5413', targlabel: 'John Boehner' }, { source: '4922', srclabel: 'Bobby Schilling', target: '5394', targlabel: 'Bobby Jindal' }, { source: '5115', srclabel: 'Michael Bennet', target: '5596', targlabel: 'Mark Udall' }, { source: '5140', srclabel: 'Dan Kildee', target: '5800', targlabel: 'Barack Obama' }, { source: '5267', srclabel: 'Bill Huizenga', target: '5412', targlabel: 'Marco Rubio' }, { source: '5267', srclabel: 'Bill Huizenga', target: '5872', targlabel: 'Justin Amash' }, { source: '5267', srclabel: 'Bill Huizenga', target: '5405', targlabel: 'Fred Upton' }, { source: '5316', srclabel: 'Rep. Cedric Richmond', target: '5537', targlabel: 'Karen Bass' }, { source: '5334', srclabel: 'Tom Cotton', target: '5412', targlabel: 'Marco Rubio' }, { source: '5405', srclabel: 'Fred Upton', target: '5413', targlabel: 'John Boehner' }, { source: '5405', srclabel: 'Fred Upton', target: '5631', targlabel: 'Chris Collins' }, { source: '5412', srclabel: 'Marco Rubio', target: '5883', targlabel: 'Tim Scott' }, { source: '5413', srclabel: 'John Boehner', target: '5631', targlabel: 'Chris Collins' }, { source: '5537', srclabel: 'Karen Bass', target: '5800', targlabel: 'Barack Obama' }, { source: '5800', srclabel: 'Barack Obama', target: '2981', targlabel: 'Tulsi Gabbard' }]


const FocusGraph = () => {
  const fgRef = useRef();

  const handleClick = useCallback(node => {
    const distance = 40;
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
    fgRef.current.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
      node,
      2000
    );
  }, [fgRef]);

  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState(null);


  const updateHighlight = () => {
    setHighlightNodes(highlightNodes);
    setHighlightLinks(highlightLinks);
  };

  const handleNodeHover = node => {
    highlightNodes.clear();
    highlightLinks.clear();
    if (node) {
      highlightNodes.add(node);
      var list = edgeDict[node['id']]
      list.forEach(link => highlightLinks.add(link))

      console.log(highlightLinks)
    }

    setHoverNode(node || null);
  };

  const handleLinkHover = link => {
    highlightLinks.clear();

    if (link) {
      highlightLinks.add(link);
    }

    updateHighlight();
  };

  return <ForceGraph3D
    ref={fgRef}
    graphData={{
      nodes: nodesArray,
      links: linksArray
    }}
    linkWidth={link => highlightLinks.has(link) ? 5 : 1}
    nodeAutoColorBy="group"
    onNodeDragEnd={node => {
      node.fx = node.x;
      node.fy = node.y;
      node.fz = node.z;
    }}
    onNodeClick={handleClick}
    linkThreeObjectExtend={true}
    linkThreeObject={link => {
      const sprite = new SpriteText(`${link.srclabel} ⇆ ${link.targlabel}`);
      sprite.color = 'white';
      sprite.textHeight = 1.5;
      return sprite;
    }}
    linkPositionUpdate={(sprite, { start, end }) => {
      const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
        [c]: start[c] + (end[c] - start[c]) / 2
      })));
      Object.assign(sprite.position, middlePos);
    }}
  // onNodeHover={handleNodeHover}
  />;
};

ReactDOM.render(
  <FocusGraph />,
  document.getElementById('root')
);
reportWebVitals();

// ReactDOM.render(
//   <React.StrictMode>
//     < ForceGraph3D
//       graphData={{
//         nodes: nodesArray,
//         links: linksArray
//       }}
//       nodeAutoColorBy="group"
//       onNodeDragEnd={node => {
//         node.fx = node.x;
//         node.fy = node.y;
//         node.fz = node.z;
//       }}
//     />
//   </React.StrictMode>,
//   document.getElementById('root')
// );