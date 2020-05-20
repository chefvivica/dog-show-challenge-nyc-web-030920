// √get dogs and render on the table
//√<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>

// add el to edit btn, be able to grab the form's value and PATCH the info to database
//http://localhost:3000/dogs/:id (name,breed, sex)

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
        <td><button class="edit">Edit</button></td> 
      `
      tBody.append(tr)
    })
  }

  document.addEventListener('submit', e=>{
    e.preventDefault()
      const form = document.querySelector('#dog-form')
      const name = form.name.value 
      const breed = form.breed.value
      const sex = form.sex.value
      const newDog = {name, breed, sex}
     
    
    
  })

  getDogs()

})