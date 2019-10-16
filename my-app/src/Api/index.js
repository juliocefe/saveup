function fecthApi(setProductsList){
    fetch("/products/products",{
        method: 'get',
        headers: new Headers({
          "x-access-token": window.sessionStorage.getItem('token')
      })
    }).then(
            function(response) {  
              if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                  response);
                return;
              }
              // Examine the text in the response
              response.json().then(function(data) {
                setProductsList(data)
              });
            }
          )
          .catch(function(err) {
            console.log('Fetch Error :-S', err);
          });
    }

async function generateList(carList, toDo){
    var productToRequest = {"products": carList}
    const response = await fetch("/lists/generateList",{
            method: 'POST',
            credentials: "same-origin",
            body: JSON.stringify(productToRequest),
            headers: new Headers({
                "content-type": "application/json",
                "x-access-token": window.sessionStorage.getItem('token')
            })
        }).then(
                function(response) {  
                    if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response);
                    return;
                    }
                    // Examine the text in the response
                    response.json().then(function(data) {
                        toDo(data)
                    });
                }
                )
                .catch(function(err) {
                console.log('Fetch Error :-S', err);
        });
    return response
}


module.exports = { generateList, fecthApi }

        
