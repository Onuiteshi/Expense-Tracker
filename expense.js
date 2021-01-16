// get elements from DOM
const balance = document.getElementById('balance')
const moneyPlus = document.getElementById('money-plus')
const moneyMinus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form  = document.getElementById('form')
const text = document.getElementById('text')
const amnt = document.getElementById('amount')
const btn = document.getElementById('btn')


const localStorageTransaction = JSON.parse(localStorage.getItem
('transactions'))

let transactions = localStorage.getItem('transactions') !== null ?
localStorageTransaction : []


// Add transaction from form 
const addTransactionForm = (e)=>{
    e.preventDefault()

    if (text.value.trim() === '' || amnt.value.trim()=== ''){
        alert('Please enter text and amount')
    }else{
        const transaction = {
            id: generateId(),
            text:text.value,
            amount: +amnt.value
        }

        // push transaction to main transaction list
        transactions.push(transaction)
        addTransaction(transaction)

        updateValue()

        updateLocalStorage()

        text.value=''
        amnt.value=''
    
    }
}

// Function to generate ID
const generateId = ()=>{
    return Math.floor(Math.random()*100000)
}

// Function to show transactions
const addTransaction = (transaction)=>{
    // get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li')

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

    // Add item
    item.innerHTML=`
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" 
        onclick="removeTransaction(${transaction.id})" >X</button>
    `

    list.appendChild(item)

}

// Function to update the balance,income and expense
const updateValue = ()=>{
    const amounts = transactions.map(transaction => transaction.amount)
    
    // get the total balance
    const total = amounts.reduce((acc,item)=>(acc += item),0)
    .toFixed(2)

    // get the total income
    const income = amounts.filter(item => item > 0)
                          .reduce((acc,item)=>(acc += item),0)
                          .toFixed(2)

    // get the total expense
    const expense = amounts.filter(item => item < 0)
                           .reduce((acc,item)=>(acc += item),0)*-1
                           .toFixed(2)

    // show balance,income,expense
    balance.innerText= `#${total}`
    moneyPlus.innerText=`#${income}`
    moneyMinus.innerText=`#${expense}`


    
}

// Function to remove a transaction by ID
const removeTransaction = (id)=>{
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage()
    init()
}

// Function to update local storage
const updateLocalStorage = ()=>{
    localStorage.setItem('transactions',JSON.stringify(transactions))
}


// init app
const init = ()=>{
    list.innerHTML = ''
    transactions.forEach(addTransaction)
    updateValue()
}

init()


form.addEventListener('submit',addTransactionForm)



