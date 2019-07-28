//D3 expects to get any data in form of array
const canvas=d3.select('.canvas');//works like document.querySelector as in DOm
     
//to select multiple we use selectAll

const svg=canvas.append('svg')
       .attr('height',600)
       .attr('width',600);//method chaining


// svg.attr('height',600);//applies height of 600 px
// svg.attr('width',600);
//groups
const group=svg.append('g')
 .attr('transform','translate(0,100)');//to move down the group by 100 px in y axis


//append shapes to svg container
group.append('rect')
    .attr('height',200)
    .attr('width',100)
    .attr('fill','blue')
    .attr('x',20)
    .attr('y',20);
group.append('circle')
    .attr('r',30)
    .attr('cx',300)
    .attr('cy',70)
    .attr('fill','pink');
group.append('line')
.attr('x1',370)
.attr('x2',400)
.attr('y1',70)
.attr('y2',200)
.attr('stroke','pink');

group.append('text')
   .attr('x',180)
   .attr('y',200)
   .attr('fill','grey')
   .text('Hello ninja')
   .style('font-family','arial');  

    