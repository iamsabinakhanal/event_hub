export async function handleExample(){
    //simulate api delay
    await Promise.resolve(setTimeout(()=> {}, 2000));
    return{
        sucess:true,
        message: "Message",
        data:null
    }
}