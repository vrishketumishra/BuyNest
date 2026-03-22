export const cart=[];

export function addtoCart(productID){
         let matchingItem;
           cart.forEach((cartItem)=>{
            if(productID===cartItem.productID){
                matchingItem=cartItem;
            }
           });
           if(matchingItem){
            matchingItem.quantity+=1;
           }
           else{
             cart.push({
            productID: productID,
            quantity:1
           });
           }
    }  