//D3 expects to get any data in form of array
const data=[//joining data to an element
  {width:200,height:100,fill:'purple'},
  {width:100,height:60,fill:'pink'},
  {width:50,height:30,fill:'red'}
];

const svg=d3.select('svg');

const rect=svg.selectAll('rect')
     .data(data)
    .attr('width',(d,i,n)=>{return d.width})
    .attr('height',(d)=>{return d.height})
    .attr('fill',(d)=>{return d.fill});
    // .attr('width',function(d,i,n), i is the index of the current element we r on,as der can be multiple rectangles 
   //and n is the current selection
   //console.log(n[i]); grabbing the index of current element

    console.log(rect);

    rect.enter()
        .append('rect')
        .attr('width',(d,i,n)=>{return d.width})
        .attr('height',(d)=>{return d.height})
        .attr('fill',(d)=>{return d.fill});;yy6
   //enter selection is a selection of virtual elements which needs to enter the DOM, say if we have only
   // 1 rect in index.html and data fro 3 of them is available in index.js, we use enter selector
