

function myfunction() { 
	var total = parseFloat(document.getElementById("textbox1").value);
 	var years = parseFloat(document.getElementById("textbox2").value); 
 	var rates_yearly = parseFloat(document.getElementById("textbox3").value); 


 	var e = document.getElementById("options");
	var options= parseFloat(e.options[e.selectedIndex].value);
	var selectionText = e.options[e.selectedIndex].text;

	var rates = (rates_yearly/100)/options;
	var nper = years*options;

	var answer = PMT(rates,nper,total);

	if(answer=="NaN")
	{
		window.alert("Some fields are empty!");
		return false;
	}

	var textbox4 = document.getElementById('textbox4');

	textbox4.value="$ "+answer;

	addTable(options,selectionText,rates,nper,total);
 	}


 function addTable(options, selectionText,rates, nper, total) {

            var myTableDiv = document.getElementById("metric_results")

            myTableDiv.innerHTML = "";

            var newDiv = document.createElement("div")
            var content = document.createTextNode("Results of diffenrent terms of years:");
            newDiv.appendChild(content);
            myTableDiv.appendChild(newDiv);


            var table = document.createElement('TABLE')
            var tableBody = document.createElement('TBODY')

            table.border = '0'
            table.appendChild(tableBody);

            var heading = new Array();
            heading[0] = "No. of Years"
            heading[1] = selectionText + " Payment";

            var stock = new Array()
            stock[0] = new Array("10", "$ " +PMT(rates,10*options,total))
            stock[1] = new Array("15", "$ " +PMT(rates,15*options,total))
            stock[2] = new Array("20", "$ " +PMT(rates,20*options,total))
            stock[3] = new Array("25", "$ " +PMT(rates,25*options,total))
            stock[4] = new Array("30", "$ " +PMT(rates,30*options,total))

            //TABLE COLUMNS
            var tr = document.createElement('TR');
            tableBody.appendChild(tr);
            for (i = 0; i < heading.length; i++) {
                var th = document.createElement('TH')
                th.width = '100';
                th.appendChild(document.createTextNode(heading[i]));
                tr.appendChild(th);

            }

            //TABLE ROWS
            for (i = 0; i < stock.length; i++) {
    			var tr = document.createElement('TR');
    			for (j = 0; j < stock[i].length; j++) {
        			var td = document.createElement('TD')
        			td.appendChild(document.createTextNode(stock[i][j]));
        			tr.appendChild(td)
    			}
    			tableBody.appendChild(tr);
			}

            myTableDiv.appendChild(table)

        }



 function PMT (rates, np, pv) {
 /*
 ir - interest rate per month
 np - number of periods (months)
 pv - present value
 fv - future value (residual value)
 */
 pmt = (pv * Math.pow((1+rates),np))*rates / (Math.pow((1+rates),np)-1);

 // pmt = ( ir * ( pv * Math.pow ( (ir+1), np ) + fv ) ) / ( ( ir + 1 ) * ( Math.pow ( (ir+1), np) -1 ) );
 return pmt.toFixed(2);
}
