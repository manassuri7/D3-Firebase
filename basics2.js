//select svg container
const svg=d3.select('svg');

//this is a asynchronous task so returns a promise
d3.json('planets.json').then(data=>{//not able to grab json
    const circs=svg.selectAll('circle')
       .data(data);
    //add attrs to circs
    circs.attr('cy',200)
         .attr('cx',d=>d.distance)  
         .attr('r',d=>d.radius)
         .attr('fill',d=>d.fill); 

    //enter selection
    circs.enter()
         .append('circle')
         .attr('cy',200)
         .attr('cx',d=>d.distance)  
         .attr('r',d=>d.radius)
         .attr('fill',d=>d.fill);      
})