document.addEventListener('DOMContentLoaded', () => {
    const base = "http://localhost:3000/dogs"
    const tableBody = document.getElementById("table-body")
    const form = document.getElementById("dog-form")
    
    showDogs()

    function getDogs(){
        return fetch(base)
        .then(r => r.json())
    }

    function addDog(dog){
       const tr = document.createElement('tr')
       tr.dataset.id = dog.id
       tr.innerHTML = `
       <tr>
        <td>${dog.name}</td>
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td><button class="edit"}>Edit</button></td>
        </tr> 
       `
       return tr
    }

    function showDogs(){
        getDogs().then(dogs => {
            dogs.forEach(function(dog){
                const tr = addDog(dog)
                tableBody.append(tr)         
                    
                tableBody.addEventListener('click', function(event){
                    if(event.target.className === 'edit'){
                        const tr = event.target.parentNode.parentNode
                        const cells = tr.getElementsByTagName("td")
                        console.log(cells)
                        const name = cells[0].textContent
                        const breed = cells[1].textContent
                        const sex = cells[2].textContent
                        
                        form.name.value = name
                        form.breed.value = breed
                        form.sex.value = sex
                        form.dataset.id = tr.dataset.id
                        
                        document.addEventListener("submit", function(e){
                            
                            e.preventDefault()
                    
                            const form = e.target
                            const id = form.dataset.id
                            const name = form.name.value
                            const breed = form.breed.value
                            const sex = form.sex.value
                         
                    
                            fetch(`${base}/${id}`,{
                                method :"PATCH",
                                headers:{"accept":"application/json",
                                        "content-type":"application/json"
                                        },
                                body: JSON.stringify({name, breed, sex})
                            
                            })

                        })
                    }
                })
            })
        })
    }
    
})
