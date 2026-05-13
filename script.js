const meals = [

{
    name: "Pasta al pomodoro",
    ingredients: ["pasta", "pomodoro"],
    quantities: { pasta: 80, pomodoro: 150 }
},

{
    name: "Pasta e ceci",
    ingredients: ["pasta", "ceci"],
    quantities: { pasta: 80, ceci: 100 }
},

{
    name: "Pasta zucchine",
    ingredients: ["pasta", "zucchine"],
    quantities: { pasta: 80, zucchine: 150 }
},

{
    name: "Riso zucchine",
    ingredients: ["riso", "zucchine"],
    quantities: { riso: 80, zucchine: 150 }
},

{
    name: "Riso tonno",
    ingredients: ["riso", "tonno"],
    quantities: { riso: 80, tonno: 80 }
},

{
    name: "Frittata di zucchine",
    ingredients: ["uova", "zucchine"],
    quantities: { uova: 2, zucchine: 150 }
},

{
    name: "Uova e patate",
    ingredients: ["uova", "patate"],
    quantities: { uova: 2, patate: 250 }
},

{
    name: "Tonno e patate",
    ingredients: ["tonno", "patate"],
    quantities: { tonno: 80, patate: 250 }
},

{
    name: "Insalata di ceci",
    ingredients: ["ceci", "pomodoro"],
    quantities: { ceci: 120, pomodoro: 150 }
},

{
    name: "Ceci e patate",
    ingredients: ["ceci", "patate"],
    quantities: { ceci: 120, patate: 250 }
},

{
    name: "Zucchine e patate",
    ingredients: ["zucchine", "patate"],
    quantities: { zucchine: 150, patate: 250 }
},

{
    name: "Pasta tonno e pomodoro",
    ingredients: ["pasta", "tonno", "pomodoro"],
    quantities: { pasta: 80, tonno: 80, pomodoro: 150 }
},

{
    name: "Riso ceci e zucchine",
    ingredients: ["riso", "ceci", "zucchine"],
    quantities: { riso: 80, ceci: 100, zucchine: 150 }
},

{
    name: "Patate e zucchine al forno",
    ingredients: ["patate", "zucchine"],
    quantities: { patate: 250, zucchine: 150 }
},

{
    name: "Pasta mozzarella e pomodoro",
    ingredients: ["pasta", "mozzarella", "pomodoro"],
    quantities: { pasta: 80, mozzarella: 80, pomodoro: 150 }
},

{
    name: "Riso piselli e carote",
    ingredients: ["riso", "piselli", "carote"],
    quantities: { riso: 80, piselli: 100, carote: 100 }
},

{
    name: "Lenticchie e patate",
    ingredients: ["lenticchie", "patate"],
    quantities: { lenticchie: 120, patate: 250 }
},

{
    name: "Salmone e zucchine",
    ingredients: ["salmone", "zucchine"],
    quantities: { salmone: 150, zucchine: 150 }
},

{
    name: "Spinaci e uova",
    ingredients: ["spinaci", "uova"],
    quantities: { spinaci: 150, uova: 2 }
},

{
    name: "Pasta spinaci e mozzarella",
    ingredients: ["pasta", "spinaci", "mozzarella"],
    quantities: { pasta: 80, spinaci: 150, mozzarella: 80 }
},

{
    name: "Riso lenticchie e carote",
    ingredients: ["riso", "lenticchie", "carote"],
    quantities: { riso: 80, lenticchie: 100, carote: 100 }
},

{
    name: "Cous cous con ceci e zucchine",
    ingredients: ["cous cous", "ceci", "zucchine"],
    quantities: { "cous cous": 80, ceci: 100, zucchine: 150 }
},

{
    name: "Farro con tonno e pomodoro",
    ingredients: ["farro", "tonno", "pomodoro"],
    quantities: { farro: 80, tonno: 80, pomodoro: 150 }
},

{
    name: "Bulgur con lenticchie e carote",
    ingredients: ["bulgur", "lenticchie", "carote"],
    quantities: { bulgur: 80, lenticchie: 100, carote: 100 }
},

{
    name: "Grano saraceno con zucchine",
    ingredients: ["grano saraceno", "zucchine"],
    quantities: { "grano saraceno": 80, zucchine: 150 }
},

{
    name: "Grano con ceci e pomodoro",
    ingredients: ["grano", "ceci", "pomodoro"],
    quantities: { grano: 80, ceci: 100, pomodoro: 150 }
}

]

function generateMeals() {

    const checkedFoods = document.querySelectorAll("input:checked")
    const selectedFoods = []
    const people = Number(document.getElementById("peopleNumber").value)

    checkedFoods.forEach(food => {
        selectedFoods.push(food.value)
    })

    const compatibleMeals = meals.filter(meal => {
        return meal.ingredients.every(ingredient =>
            selectedFoods.includes(ingredient)
        )
    })

    const mealList = document.getElementById("mealList")
    const shoppingList = document.getElementById("shoppingList")

    mealList.innerHTML = ""
    shoppingList.innerHTML = ""

    const lunchCarbs = ["pasta", "riso", "cous cous", "farro", "grano saraceno", "grano", "bulgur"]

    const lunchMeals = compatibleMeals.filter(meal =>
        meal.ingredients.some(ingredient => lunchCarbs.includes(ingredient))
    )

    const dinnerMeals = compatibleMeals.filter(meal =>
        !meal.ingredients.some(ingredient => lunchCarbs.includes(ingredient))
    )

    if (lunchMeals.length < 7 || dinnerMeals.length < 7) {
        mealList.innerHTML = "<li>Non ci sono abbastanza piatti per creare un menù completo. Seleziona più alimenti.</li>"
        return
    }

    const shuffledLunches = lunchMeals.sort(() => Math.random() - 0.5)
    const shuffledDinners = dinnerMeals.sort(() => Math.random() - 0.5)

    const weeklyLunches = shuffledLunches.slice(0, 7)
    const weeklyDinners = shuffledDinners.slice(0, 7)

    const weeklyMeals = [...weeklyLunches, ...weeklyDinners]

    const totalIngredients = {}

    weeklyMeals.forEach(meal => {

        for (let ingredient in meal.quantities) {

            const quantity = meal.quantities[ingredient] * people

            if (totalIngredients[ingredient]) {
                totalIngredients[ingredient] += quantity
            } else {
                totalIngredients[ingredient] = quantity
            }

        }

    })

    for (let ingredient in totalIngredients) {

        const li = document.createElement("li")

        if (ingredient === "uova") {
            li.textContent = `${ingredient}: ${totalIngredients[ingredient]} pezzi`
        } else {
            li.textContent = `${ingredient}: ${totalIngredients[ingredient]} g`
        }

        shoppingList.appendChild(li)
    }

    const days = [
        "Lunedì",
        "Martedì",
        "Mercoledì",
        "Giovedì",
        "Venerdì",
        "Sabato",
        "Domenica"
    ]

    days.forEach((day, index) => {

        const lunch = weeklyLunches[index]
        const dinner = weeklyDinners[index]

        const li = document.createElement("li")

        li.classList.add("day-card")

        li.innerHTML = `
            <h3>${day}</h3>
            <p><strong>Pranzo:</strong> ${lunch.name}</p>
            <p><strong>Cena:</strong> ${dinner.name}</p>
            <p><strong>Persone:</strong> ${people}</p>
        `

        mealList.appendChild(li)

    })

}