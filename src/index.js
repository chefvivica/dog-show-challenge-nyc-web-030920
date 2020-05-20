// √get dogs and render on the table
//√<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>

// √add el to edit btn, be able to grab the form's value and PATCH the info to database
//√http://localhost:3000/dogs/:id (name,breed, sex)

//re send get fetch and change the dom without refresh ( clear out the innerHTML)

document.addEventListener("DOMContentLoaded",()=>{
  const base = ' http://localhost:3000/dogs'
  const tBody = document.getElementById('table-body')


  const getDogs = () =>{
    fetch(base)
    .then(r=>r.json())
    .then(renderDogs)
  }


  const renderDogs = dogs =>{
    dogs.forEach(dog=>{
      const tr = document.createElement('tr')
      tr.innerHTML = `
      <td>${dog.name}</td>
      <td>${dog.breed}</td>
        <td>${dog.sex}</td> 
        <td><button class="edit" data-id=${dog.id}>Edit</button></td> 
      `
      tBody.append(tr)
      const btn = document.querySelector('.edit')
      btn.addEventListener("click",showDogInfo)
    })
  }


  const form = document.querySelector('#dog-form')
  const showDogInfo =(e)=>{
    const tr = e.target.parentElement.parentElement
    const name = tr.children[0].innerText
    const breed = tr.children[1].innerText
    const sex =  tr.children[2].innerText

    form.name.value = name
    form.breed.value = breed
    form.sex.value = sex

    const id = e.target.dataset.id 

    newDogInfo(id)
  }

  const newDogInfo = (id) =>{
    document.addEventListener('submit', e=>{
      e.preventDefault()
    
      const name = form.name.value 
      const breed = form.breed.value
      const sex= form.sex.value
      const newDog = {name, breed, sex}
      
      fetch(`http://localhost:3000/dogs/${id}`,{
        method: "PATCH",
        headers:{"accept":"application/json",
                "content-type":"application/json"
                },
        body:JSON.stringify(newDog)
      })
    
    })
    
  }

  getDogs()

})