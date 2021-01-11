
form=document.getElementById('form');

// Error:#ef4f4f
let url="http://localhost:3002/weather?search=";

form.addEventListener('submit',(e)=>
{
    e.preventDefault();

    let user_input=document.getElementById('user_input');

    let search=url+encodeURI(user_input.value);
    user_input.value ="";
    fetch(search).then((response)=>
    {
        response.json().then((response)=>{
            let div=document.querySelector(".output");
            if(!response.error)
            {
                let ans=`<p>${response.main}</p>
                <p>${response.description}</p>
                <p>${response.name}</p>
                <p>${response.place_name}</p>`;
                div.innerHTML=ans;
            }
            else
            {
                div.classList.add("output-error");
                let ans=`<p>${response.error}</p>`;
                div.innerHTML=ans;

            }
        })
    })
    
});
