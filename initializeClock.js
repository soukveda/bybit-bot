const api = require('./api/executeApi')

function initializeClock(endtime) {

    console.log("Waiting for deadline...")
    
    async function updateClock() {
        const t = getTimeRemaining(endtime);

        if (t.total <= 0) {
            clearInterval(timeinterval);
            let success = false
            let amount = 'ENTER AMOUNT';
            let price = 'ENTER PRICE'; // ($ amount to invest) / ($ price per token) => eg 1 ETH to $2700
            let adjustedAmount = Math.trunc(amount / price);

            while(!success) {

                const resp = await api.executeApi(adjustedAmount.toString(), price.toString());
                
                console.log("here is the response:")
                console.log(resp.data)
    
                if (resp.data.ret_code !== 0) {
                    if (resp.data.ret_code === -3124) {
                        console.log('Oh no, order amount was too large! we need to increase the buy-in price.')
                        price = (price + 0.1);
                    }
                } else {
                    console.log('Order success. Congrats.')
                    success = true;
                }
            }
        }
    }
    updateClock();
    let timeinterval = setInterval(updateClock, 1000);
}

function getTimeRemaining(endtime){
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );

    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
}

module.exports = { initializeClock }