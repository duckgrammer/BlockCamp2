import * as d3 from "d3";
import Script from "next/script";
const Test = () => {

    console.log(d3);

//     const treeData = [
//         {
//             "name": "0x19B3Eb3Af5D93b77a5619b047De0EED7115A19e7",
//             "parent": "null",
//             "children": [
//                 {
//                     "name": '0x61a06d27233162468c4bc49a447692574480f6ac144740e5deed62df85760a49 value: 1000usd [new!!]',
//                 },

//                 {
//                     "name": '0x0833be097ce05b9322d4a58999460f54d87a33a65f6a9e6c72967375c74f7f86 value: 2000ETH',

//                 },
//                 {
//                     safe: '0x19B3Eb3Af5D93b77a5619b047De0EED7115A19e7',
//                     to: '0x19B3Eb3Af5D93b77a5619b047De0EED7115A19e7',
//                     value: '0',
//                     data: null,
//                     operation: 0,
//                     gasToken: '0x0000000000000000000000000000000000000000',
//                     safeTxGas: 12881,
//                     baseGas: 0,
//                     gasPrice: '0',
//                     refundReceiver: '0x0000000000000000000000000000000000000000',
//                     nonce: 248,
//                     executionDate: null,
//                     submissionDate: '2021-01-25T19:23:28.772755Z',
//                     modified: '2021-01-25T19:23:28.772755Z',
//                     blockNumber: null,
//                     "name": null,
//                     safeTxHash: '0xafc2b5d587ee0c2a1d5f1c2d7659fa3ab5cc1fbfe12ee6ec4eba15bf918fdad2',
//                     executor: null,
//                     isExecuted: false,
//                     isSuccessful: null,
//                     ethGasPrice: null,
//                     maxFeePerGas: null,
//                     maxPriorityFeePerGas: null,
//                     gasUsed: null,
//                     fee: null,
//                     origin: null,
//                     dataDecoded: null,
//                     confirmationsRequired: null,
//                     confirmations: [[Object]],
//                     trusted: true,
//                     signatures: null,
//                     transfers: [],
//                     txType: 'MULTISIG_TRANSACTION'
//                 },]
//         }
//     ]


//     var margin = {top: 20, right: 120, bottom: 20, left: 120},
// 	width = 960 - margin.right - margin.left,
// 	height = 500 - margin.top - margin.bottom;
	
// var i = 0,
// 	duration = 750,
// 	root;

// var tree = d3.layout.tree()
// 	.size([height, width]);

// var diagonal = d3.svg.diagonal()
// 	.projection(function(d) { return [d.y, d.x]; });

// var svg = d3.select("#chart").append("svg")
// 	.attr("width", width + margin.right + margin.left)
// 	.attr("height", height + margin.top + margin.bottom)
//   .append("g")
// 	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// root = treeData[0];
// root.x0 = height / 2;
// root.y0 = 0;
  
// update(root);

// d3.select(self.frameElement).style("height", "500px");

// function update(source) {

//   // Compute the new tree layout.
//   var nodes = tree.nodes(root).reverse(),
// 	  links = tree.links(nodes);

//   // Normalize for fixed-depth.
//   nodes.forEach(function(d) { d.y = d.depth * 180; });

//   // Update the nodes…
//   var node = svg.selectAll("g.node")
// 	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

//   // Enter any new nodes at the parent's previous position.
//   var nodeEnter = node.enter().append("g")
// 	  .attr("class", "node")
// 	  .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
// 	  .on("click", click);

//   nodeEnter.append("circle")
// 	  .attr("r", 1e-6)
// 	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

//   nodeEnter.append("text")
// 	  .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
// 	  .attr("dy", ".35em")
// 	  .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
// 	  .text(function(d) { return d.name; })
// 	  .style("fill-opacity", 1e-6);

//   // Transition nodes to their new position.
//   var nodeUpdate = node.transition()
// 	  .duration(duration)
// 	  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

//   nodeUpdate.select("circle")
// 	  .attr("r", 10)
// 	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

//   nodeUpdate.select("text")
// 	  .style("fill-opacity", 1);

//   // Transition exiting nodes to the parent's new position.
//   var nodeExit = node.exit().transition()
// 	  .duration(duration)
// 	  .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
// 	  .remove();

//   nodeExit.select("circle")
// 	  .attr("r", 1e-6);

//   nodeExit.select("text")
// 	  .style("fill-opacity", 1e-6, function(d) { return d._children ? "lightsteelblue" : "#fff"; });

//   // Update the links…
//   var link = svg.selectAll("path.link")
// 	  .data(links, function(d) { return d.target.id; });

//   // Enter any new links at the parent's previous position.
//   link.enter().insert("path", "g")
// 	  .attr("class", "link")
// 	  .attr("d", function(d) {
// 		var o = {x: source.x0, y: source.y0};
// 		return diagonal({source: o, target: o});
// 	  });

//   // Transition links to their new position.
//   link.transition()
// 	  .duration(duration)
// 	  .attr("d", diagonal);

//   // Transition exiting nodes to the parent's new position.
//   link.exit().transition()
// 	  .duration(duration)
// 	  .attr("d", function(d) {
// 		var o = {x: source.x, y: source.y};
// 		return diagonal({source: o, target: o});
// 	  })
// 	  .remove();

//   // Stash the old positions for transition.
//   nodes.forEach(function(d) {
// 	d.x0 = d.x;
// 	d.y0 = d.y;
//   });
// }

// // Toggle children on click.
// function click(d) {
//   if (d.children) {
// 	d._children = d.children;
// 	d.children = null;
//   } else {
// 	d.children = d._children;
// 	d._children = null;
//   }
//   update(d);
// }


    return <>
        <h1>Hello Chart</h1>
        <div id="chart"></div>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"></Script>
    </>

}

export default Test;