const svg=d3.select('.canvas')
      .append('svg')//creating an svg in index,js instead of in index.html
        .attr('width',600)
        .attr('height',600);
//create margins and dimensions
const margin={top:20,right:20,bottom:100,left:100}
const graphWidth=600-margin.left-margin.right;
const graphHeight=600-margin.top-margin.bottom;

const graph=svg.append('g')
      .attr('width',graphWidth)
      .attr('height',graphHeight)
      .attr('transform',`translate(${margin.left},${margin.top})`)//to shift the group from left and top

const xAxisGroup=graph.append('g')//to generate x -axis and y-axis
      .attr('transform',`translate(0,${graphHeight})`);
const yAxisGroup=graph.append('g');      //done at bottom

db.collection('dishes').get().then(res=>{
    var data=[];
    res.docs.forEach(doc=>{
 //       console.log(doc.data())//each time we get some data we push it to the data array
    data.push(doc.data());
    });

console.log(data);
//scaling a linear graph using domain and range, used so tht graphs dont shoot out of screens   
//domain is the input value while range is the output
//both domain and range r relative eg: 500 value in domain corresponds to 250 in range and 250 in domain =125 in range as o/p
     const y=d3.scaleLinear()//scaling on y axis
          .domain([0,1000])//in our json max value is 900 so taking this to 1000
    //instead of hard coding we can do this by using max/min      
      //    .domain([0,d3.max(data,d=>d.orders)])
          .range([graphHeight,0]);

//     const min=d3.min(data,d=>d.orders);//to get the min value
//     const max=d3.max(data,d=>d.orders);  //to get the max value  
//     const extent=d3.extent(data,d=>d.orders); //to get both min and max

//Band scale is used for width scaling on x axis, so tht bars dont shoot out of screen on x axis 
//we pass names and associates each with a x coordinate
     const x=d3.scaleBand()
           .domain(data.map(item=>item.name))   //item means the full obj  
           //this returns a new array
           .range([0,500])    //means my whole graph ends at 500 px from left
           .paddingInner(0.2)  //adding the gaping between bars and outer as well
           .paddingOuter(0.2);
       /* console.log(x("veg curry"));
       console.log(x("veg pasta"));
       console.log(x.bandwidth());//RETURNS THE WIDTH */
  
//join the data to rect
    const rects=graph.selectAll('rect')
         .data(data)

  rects.attr('width',x.bandwidth)
       .attr('height',d=>graphHeight -y(d.orders))    
       .attr('fill','orange')
       .attr('x',(d)=>x(d.name))   //moves away from left by 70 px 
       .attr('y',(d)=>y(d.orders));  //bar starts from here
       
  //append the enter selection to DOM
   rects.enter()
        .append('rect') 
        .attr('width',x.bandwidth)
        .attr('height',d=>graphHeight-y(d.orders))    
        .attr('fill','orange')
        .attr('x',d=>x(d.name)) 
        .attr('y',(d)=>y(d.orders));//bar starts from here
  
  //create and call the axes
  const xAxis=d3.axisBottom(x);
  const yAxis=d3.axisLeft(y)
        .ticks(3) //to format no of ticks
        .tickFormat(d=>d+'orders'); //to add string to the ticks eg:500 orders
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);  
  
  xAxisGroup.selectAll('text')
            .attr('transform','rotate(-40)')
            .attr('text-anchor','end')//so tht text doesn't go up
            .attr('fill','orange');
})