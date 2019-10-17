export function validationResponse(response){
  response.json().then(data => {
    if(data.message==='Token is invalid!'){
      window.sessionStorage.removeItem('token')
      window.location.href = '/'
    }
  });
  console.log('Looks like there was a problem. Status Code: ' + response);
  return;
}

export const GetProducts = (setProductsList) => {
       fetch("/products/products",{
          method: 'GET',
          credentials: "same-origin",
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
                    setProductsList({"data": data.data, "loading": false})
                  });
              }
              )
              .catch(function(err) {
              console.log('Fetch Error :-S', err);
      });
}

export async function generateList(carList, toDo){
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



        
