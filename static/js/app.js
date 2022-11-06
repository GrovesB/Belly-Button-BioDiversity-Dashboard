// THIS Code was generated using DOM's example he showed to the class

console.log('this is app.js');

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


function DrawBargraph(sampleId)
{
   console.log(`DrawBargraph(${sampleId})`);

    d3.json(url).then(data => {
        console.log(data);
        let samples = data.samples;
        let resultArray =samples.filter(s => s.id ==sampleId);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;
       
        let yticks= otu_ids.slice(0, 10).map(otu_ids => `OTU ${otu_ids}`).reverse()
        
        let barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: 'bar',
            text: otu_labels.slice(0,10).reverse(),
            orientation: 'h'
        };
        let barArray = [barData];

        let barLayout = {
            title: "top 10 bacteria cultures found",
            margin: {t: 30, l:150}
        }

        Plotly.newPlot("bar",barArray,barLayout);
    });
}

function DrawBubblechart(sampleId)
{
    console.log(`DrawBubblechart(${sampleId})`);

    d3.json(url).then((data) => {
        let samples = data.samples;
        let resultArray =samples.filter(s => s.id ==sampleId);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let bubbledata = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        let bubbleArray = [bubbledata];
        
        let bubbleLayout = {
            title: "bacteria cultures per sample",
            margin: {t: 30},
            hovermode: "closest",
            xaxis: {title:"OTU ID"}
        };

        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
});
}

function ShowMetadata(sampleId)
{
    
}


function optionChanged(sampleId)
{
    console.log(`optionChanged, new value: ${sampleId}`);

    DrawBargraph(sampleId);
    DrawBubblechart(sampleId);
    ShowMetadata(sampleId);
}


function InitDashboard()
{
    console.log('InitDashboard()');

    let selector = d3.select("#selDataset");

   
    d3.json(url).then(data => {
        console.log("Here is the data:", data);

        let sampleNames = data.names;
        console.log("here are the sample names:", sampleNames);

        for (let i = 0; i < sampleNames.length; i++) {
            let sampleId = sampleNames[i];
            //console.log(`sampleId = ${sampleId}`);
            selector.append("option").text(sampleId).property("value", sampleId);
        }


        let initialId = selector.property("value");
        console.log(`initialId = ${initialId}`);

        //Draw bargraph
        DrawBargraph(initialId);

        //draw bubblechart
        DrawBubblechart(initialId);
        
        //show metadata
        ShowMetadata(initialId);

});













}

InitDashboard();