document.addEventListener('DOMContentLoaded', () => {
    const base = "http://localhost:3000/dogs"
    const tableBody = document.getElementById("table-body")
    const form = document.getElementById("dog-form")
    
    showDogs()

    function getDogs(){
        return fetch(base)
        .then(r => r.json())
    }
    
    function getSingleDog(id){
        return fetch("${base}"/"${id}")
        .then(r => r.json())
    }

    function addDog(dog){
       const tr=  document.createElement('tr')
       tr.innerHTML = `
       <tr>
        <td>${dog.name}</td>
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td><button id="hi" data-id= ${dog.id}>Edit</button></td>
        </tr> 
       `
       return tr
    }

    function showDogs(){
        getDogs().then(dogs => {
            dogs.forEach(function(dog){
                const tr = addDog(dog)
                tableBody.append(tr)         
            })
        })
    }
    


    form.addEventListener("submit", createADog)

    function createADog(e){
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const breed = form.breed.value
        const sex = form.sex.value
        const newDog = {name, breed, sex}      
        
        console.log(newDog)
        fetch(base,{
            method :"POST",
            headers:{"accept":"application/json",
                    "content-type":"application/json"
                    },
            body: JSON.stringify(newDog)
        })

    }
    // const btns = tableBody.querySelectorAll("#hi")
    // console.log(btns)
    // btns.forEach(function(btn){
    //     btn.addEventListener("click",function(event){
    //         getSingleDog(id).then(dog=>{
    //             const btn = e.target
    //             const id = btn.dataset.id
    //             const name = dog.name
    //             const breed = dog.breed
    //             const sex = dog.sex 
    //             const newDog = {name , breed, sex}
    //         updateAdog(id,newDog)
    //     })
    // })

      
    function updateAdog(id, newDog){ 
        fetch("${base}"/"${id}",{
            method :"PATCH",
            headers:{"accept":"application/json",
                    "content-type":"application/json"
                    },
            body: JSON.stringify(id, newDog)
        })
    }
    
})
